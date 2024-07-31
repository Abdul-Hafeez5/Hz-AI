import { useEffect, useRef, useState } from "react";
import { useMutation, QueryClient } from "@tanstack/react-query";
import "./newPrompt.css";
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
import model from "../../lib/gemini";
import Markdown from "react-markdown";

const NewPrompt = ({ data }) => {
  const lastRef = useRef(null);
  const formRef = useRef(null);
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState("");
  const [image, setImage] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

  useEffect(() => {
    lastRef.current.scrollIntoView({ behaviour: "smooth" });
  }, [data, question, answers, image.dbData]);

  const queryClient = new QueryClient();
  const mutation = useMutation({
    mutationFn: () => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question.length ? question : undefined,
          answers,
          img: image.dbData?.filePath || undefined,
        }),
      }).then((res) => res.json());
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient
        .invalidateQueries({ queryKey: ["chat", data._id] })
        .then(() => {
          formRef.current.reset();
          setQuestion();
          setAnswers();
          setImage({
            isLoading: false,
            error: "",
            dbData: {},
            aiData: {},
          });
        });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const runAI = async (text, isInitial) => {
    if (!isInitial) setQuestion(text);
    try {
      const result = await chat.sendMessageStream(
        Object.entries(image.aiData).length ? [image.aiData, text] : [text]
      );
      let accumulatedText = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText);
        accumulatedText += chunkText;
        setAnswers(accumulatedText);
      }
      mutation.mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const querry = e.target.querryText.value;
    if (!querry) return;
    runAI(querry, false);
  };

  const chat = model.startChat({
    history: [
      data?.history?.map(({ role, parts }) => ({
        role,
        parts: [{ text: parts[0].text }],
      })),
    ],
    generationConfig: {
      // maxOutputTokens: 100,
    },
  });

  // in production we don't need it
  const doesRun = useRef(false);
  useEffect(() => {
    if (!doesRun.current) {
      if (data?.history?.length == 1) {
        runAI(data.history[0].parts[0].text, true);
      }
    }
    doesRun.current == true;
  }, []);

  return (
    <>
      {image.isLoading && <div>Loading...</div>}
      {image.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={image.dbData?.filePath}
          width="380"
          transformation={[{ width: 380 }]}
        />
      )}
      {question && <div className="message user">{question}</div>}
      {answers && (
        <div className="message ">
          <Markdown>{answers}</Markdown>
        </div>
      )}
      <div className="endChat" ref={lastRef}></div>
      <form className="newForm" onSubmit={handleSubmit} ref={formRef}>
        <Upload setImg={setImage} />
        <input type="file" multiple={false} id="file" hidden />
        <input type="text" name="querryText" placeholder="Ask anything..." />
        <button>
          <img src="/arrow.png" alt="" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
