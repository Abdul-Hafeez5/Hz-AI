import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const ChatList = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [activeChatId, setActiveChatId] = useState(null);

  const queryClient = useQueryClient();

  const { isPending,  error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  const handleDelete = async (chatId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/chats/${chatId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        queryClient.invalidateQueries(["userChats"]);
      } else {
        console.log("Failed to delete chat");
      }
    } catch (error) {
      console.error("Error Message", error);
    } finally {
      setToggleMenu(false);
    }
  };

  const handleToggleMenu = (chatId) => {
    setToggleMenu((prev)=>!prev);
    setActiveChatId(chatId);
  };
  return (
    <div className="flex  flex-col h-full ">
      <span className=" font-semibold text-[10px] mb-3">DASHBOARD</span>
      <Link to="/dashboard">Create a new Chat </Link>
      <Link to="/" className="my-2">
        Explore Hz AI{" "}
      </Link>
      <Link to="/">Contact Us </Link>
      <hr className="border-none h-1 bg-primary-extra-light opacity-10 rounded-md my-5" />
      <span className=" font-semibold text-[10px] mb-3">RECENT CHATS</span>
      <div className="flex flex-col  overflow-auto">
        {isPending
          ? "Loading..."
          : error
          ? "something went wrong"
          : data?.reverse()?.map((chat) => (
              <div key={chat._id} className=" relative">
                <Link
                  to={`/dashboard/chats/${chat._id}`}
                  // key={chat._id}
                  className="p-3 rounded-xl flex justify-between items-center hover:bg-primary-dark"
                >
                  <span>{chat.title} </span>
                  <button
                    onClick={() => handleToggleMenu(chat._id)}
                    className="ml-auto"
                  >
                    &#8230;
                  </button>
                </Link>
                {toggleMenu && activeChatId === chat._id && (
                  <div className="absolute right-10 top-0 mt-2 w-48 bg-[#1e1b29] rounded-md shadow-lg z-10">
                    <ul className="py-1">
                      <li className="px-4 py-2 hover:bg-[#3b3754] cursor-pointer">
                        Rename
                      </li>
                      <li className="px-4 py-2 hover:bg-[#3b3754] cursor-pointer">
                        Share
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-[#3b3754] cursor-pointer"
                        onClick={() => handleDelete(chat._id)}
                      >
                        Delete
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ))}
      </div>
      <hr className="border-none h-1 bg-primary-extra-light opacity-10 rounded-md my-5" />
      <div className=" mt-auto flex items-center gap-3 text-[12px]">
        <img src="/logo.png" alt="" className="w-6 h-6" />
        <div className=" flex flex-col ">
          <span className="font-semibold">Upgrade to Hz AI Pro</span>
          <span className="text-primary-extra-light">
            Get unlimited access to all features
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
