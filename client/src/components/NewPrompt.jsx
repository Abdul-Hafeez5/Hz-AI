import { useEffect, useRef, useState } from "react";
import Upload from "./Upload";
import { IKImage } from "imagekitio-react";
import model from "../utils/gemini";
import Markdown from "react-markdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const NewPrompt = ({ data }) => {
  const [question, setQuestion] = useState(""); // Stores the user's question
  const [answer, setAnswer] = useState(""); // Stores the AI's response
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

  // Initialize the chat model with existing history
  const chat = model.startChat({
    history: data?.history?.map(({ role, parts }) => ({
      role,
      parts: [{ text: parts[0].text }],
    })),
    generationConfig: {},
  });

  const endRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [data, question, answer, img.dbData]);

  const queryClient = useQueryClient();

  // Handle the form submission and mutation for updating the chat in the backend
  const mutation = useMutation({
    mutationFn: () => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question.length ? question : undefined, // Send question if it's not empty
          answer, // Send the answer from AI
          img: img.dbData?.filePath || undefined, // Send the image path if it exists
        }),
      }).then((res) => res.json());
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: ["chat", data._id] })
        .then(() => {
          formRef.current.reset(); // Clear the form after successful mutation
          setQuestion(""); // Clear the question state
          setAnswer(""); // Clear the answer state
          setImg({
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

  // Function to send a new message to the AI and handle the response
  const add = async (text, isInitial) => {
    if (!isInitial) setQuestion(text); // Set the question only if it's not an initial load

    try {
      const result = await chat.sendMessageStream(
        Object.entries(img.aiData).length ? [img.aiData, text] : [text]
      );
      let accumulatedText = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        accumulatedText += chunkText;
        setAnswer(accumulatedText); // Set the accumulated text as the answer
      }

      mutation.mutate(); // Save the chat in the backend
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = e.target.text.value;
    if (!text) return;

    add(text, false); // Send the message to the AI
  };

  // IN PRODUCTION WE DON'T NEED IT
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      if (data?.history?.length === 1) {
        add(data.history[0].parts[0].text, true); // Handle the initial chat load
      }
    }
    hasRun.current = true;
  }, []);

  return (
    <>
      {/* ADD NEW CHAT */}
      {img.isLoading && <div className="">Loading...</div>}
      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          width="380"
          transformation={[{ width: 380 }]}
        />
      )}
      {question && <div className="message user">{question}</div>}
      {/* Display the question */}
      {answer && (
        <div className="message">
          <Markdown>{answer}</Markdown> {/* Display the AI's response */}
        </div>
      )}
      <div className="pb-24" ref={endRef}></div>
      <form
        className=" w-1/2 absolute bottom-0 bg-primary-dark rounded-3xl flex items-center px-5 gap-5 "
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <Upload setImg={setImg} />
        <input
          id="file"
          type="file"
          multiple={false}
          hidden
          className="flex-1 p-5 border-none outline-none bg-transparent text-primary-light"
        />
        <input
          type="text"
          name="text"
          placeholder="Ask anything..."
          className="flex-1 p-5 border-none outline-none bg-transparent text-primary-light"
        />
        <button className="rounded-[50%] bg-primary-light border-none p-3 flex items-center justify-center cursor-pointer ">
          <img src="/arrow.png" alt="" className="w-4 h-4" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
