import { useEffect, useRef, useState } from "react";
import "./newPrompt.css";
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
import model from "../../lib/gemini";
import Markdown from "react-markdown";
import { useMutation, QueryClient } from "@tanstack/react-query";

const NewPrompt = ({ data }) => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState("");
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });
  const chat = model.startChat({
    history: data?.history.map(({ role, parts }) => ({
      role,
      // parts: [{ text: parts[0].text || "" }],
      parts: [{ text: parts[0].text }],
    })),

    generationConfig: {
      // maxOutputTokens: 100,
    },
  });

  const lastRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    lastRef.current.scrollIntoView({ behaviour: "smooth" });
  }, [data, question, answers, img.dbData]);

  const queryClient = new QueryClient();

  // const mutation = useMutation({
  //   mutationFn: async () => {
  //     return await fetch(
  //       `${import.meta.env.VITE_API_URL}/api/chats/${data._id}`,
  //       {
  //         method: "PUT",
  //         credentials: "include",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           question: question.length ? question : undefined,
  //           answers,
  //           img: img.dbData?.filePath || undefined,
  //         }),
  //       }
  //     ).then((res) => res.json());
  //   },
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient
  //       .invalidateQueries({ queryKey: ["chat", data._id] })
  //       .then(() => {
  //         // formRef.current.reset();
  //         setQuestion("");
  //         setAnswers("");
  //         setImg({
  //           isLoading: false,
  //           error: "",
  //           dbData: {},
  //           aiData: {},
  //         });
  //       });
  //   },
  //   onError: (err) => {
  //     console.log("mutation error" + err);
  //   },
  // });

  const runAI = async (text, isInitial) => {
    if (!isInitial) setQuestion(text);

    try {
      const result = await chat.sendMessageStream(
        Object.entries(img.aiData).length ? [img.aiData, text] : [text]
      );
      let accumulatedText = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText);
        accumulatedText += chunkText;
        // setAnswers((prevAnswers) => prevAnswers + chunkText);
        setAnswers(accumulatedText);
      }
      // mutation.mutate();
    } catch (error) {
      console.log("AI Error" + error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const querry = e.target.querryText.value;
    if (!querry) return;

    runAI(querry, false);
  };

  // in production we don't need it
  const doesRun = useRef(false);
  useEffect(() => {
    if (!doesRun.current) {
      if (data?.history?.length === 1) {
        runAI(data.history[0].parts[0].text, true);
      }
    }
    doesRun.current = true;
  }, []);

  return (
    <div>
      {img.isLoading && <div>Loading...</div>}
      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          width="380"
          transformation={[{ width: 380 }]}
          key={img.dbData?.filePath}
        />
      )}
      {question && <div className="message user">{question}</div>}
      {answers && (
        <div className="message ">
          <Markdown>{answers}</Markdown>
        </div>
      )}
      <div className=" pb-24" ref={lastRef}></div>
      <form
        className=" w-1/2 absolute bottom-0 bg-primary-dark rounded-3xl flex items-center px-5 gap-5 "
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <Upload setImg={setImg} />
        <input
          type="file"
          multiple={false}
          id="file"
          hidden
          className="flex-1 p-5 border-none outline-none bg-transparent text-primary-light"
        />
        <input
          type="text"
          name="querryText"
          placeholder="Ask anything..."
          className="flex-1 p-5 border-none outline-none bg-transparent text-primary-light"
        />
        <button className="rounded-[50%] bg-primary-light border-none p-3 flex items-center justify-center cursor-pointer ">
          <img src="/arrow.png" alt="" className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default NewPrompt;
