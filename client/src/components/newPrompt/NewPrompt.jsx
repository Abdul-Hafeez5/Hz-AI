import { useEffect, useRef, useState } from "react";
import "./newPrompt.css";
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
import model from "../../lib/gemini";
import Markdown from "react-markdown";

const NewPrompt = () => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState("");
  const [image, setImage] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });
  const lastRef = useRef(null);

  useEffect(() => {
    lastRef.current.scrollIntoView({ behaviour: "smooth" });
  }, [question, answers, image.dbData]);

  const runAI = async (text) => {
    setQuestion(text);
    const result = await model.generateContent(
      Object.entries(image.aiData).length ? [image.aiData, text] : [text]
    );
    const response = await result.response;
    setAnswers(response.text());
    setImage({ isLoading: false, error: "", dbData: {}, aiData: {} });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const querry = e.target.querryText.value;
    if (!querry) return;
    runAI(querry);
  };

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
      <form className="newForm" onSubmit={handleSubmit}>
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
