import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import Markdown from "react-markdown";
import { IKImage } from "imagekitio-react";
import NewPrompt from "./NewPrompt";

const ChatPage = () => {
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();

  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });
  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <p>{error.message || "Chat not found. It might have been deleted."}</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-4 px-4 py-2 bg-primary-dark rounded-lg"
        >
          Go back to Dashboard
        </button>
      </div>
    );
  }
  return (
    <div className=" h-full flex items-center flex-col relative">
      <div className=" flex-1 overflow-auto w-full flex justify-center">
        <div className=" w-1/2 flex flex-col gap-5">
          {isPending
            ? "Loading..."
            : error
            ? "something went wrong"
            : data?.history?.map((message) => (
                <div key={message._id} className="flex flex-col">
                  {message.img && (
                    <IKImage
                      urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                      path={message.img}
                      height="300"
                      width="400"
                      transformation={[{ height: 200, width: 300 }]}
                      loading="lazy"
                      lqip={{ active: true, quality: 20 }}
                    />
                  )}
                  <div
                    className={
                      message.role === "user"
                        ? "bg-primary-dark px-5 py-3 rounded-2xl max-w-[50%] self-end"
                        : "py-5"
                    }
                  >
                    <Markdown>{message.parts[0].text}</Markdown>
                  </div>
                </div>
              ))}
          {data && <NewPrompt data={data} />}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
