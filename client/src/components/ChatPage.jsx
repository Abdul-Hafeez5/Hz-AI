import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import Markdown from "react-markdown";
import { IKImage } from "imagekitio-react";
import NewPrompt from "./NewPrompt";

const ChatPage = () => {
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();

  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  return (
    <div className=" h-full flex items-center flex-col relative">
      <div className=" flex-1 overflow-auto w-full flex justify-center">
        <div className=" w-1/2 flex flex-col gap-5">
          {isPending
            ? "Loading..."
            : error
            ? "something went wrong"
            : data?.history?.map((message) => (
                <div key={message._id}>
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
                      ? "bg-primary-dark rounded-3xl max-w-[80%] self-end"
                      : "p-5"
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
