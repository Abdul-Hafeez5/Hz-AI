import { useEffect, useRef } from "react";
import "./newPrompt.css";
import Upload from "../upload/Upload";
const NewPrompt = () => {
    const lastRef = useRef(null);

    useEffect(() => {
      lastRef.current.scrollIntoView({ behaviour: "smooth" });
    }, []);
  
  return (
    <>
    <div className="endChat" ref={lastRef}></div>
      <form className="newForm">
       <Upload/>
        <input type="file" multiple={false} id="file" hidden />
        <input type="text" placeholder="Ask anything..." />
        <button>
          <img src="/arrow.png" alt="" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
