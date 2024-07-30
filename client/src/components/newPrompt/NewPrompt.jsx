import { useEffect, useRef, useState } from "react";
import "./newPrompt.css";
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
const NewPrompt = () => {
  const [image, setImage] = useState({
    isLoading: false,
    error: "",
    dbData: {},
  });
  const lastRef = useRef(null);

  useEffect(() => {
    lastRef.current.scrollIntoView({ behaviour: "smooth" });
  }, []);

  return (
    <>
      {image.isLoading && <div>Loading...</div>}
      {image.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={image.dbData?.filePath}
          width="380"
          transformation={[{width:380}]}
        />
      )}
      <div className="endChat" ref={lastRef}></div>
      <form className="newForm">
        <Upload setImg={setImage} />
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
