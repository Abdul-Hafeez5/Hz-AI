import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { SERVER_URL } from "../utils/constants";

const SidebarList = () => {
  const [activeChatId, setActiveChatId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const { isPending, error, data } = useQuery({
    queryKey: ["chat"],
    queryFn: () =>
      fetch(`${SERVER_URL}/api/userchats`, {
        credentials: "include",
      }).then((res) => res.json()),
    onSuccess: (data) => {
      console.log("Fetched data", data);
    },
  });

  const handleDelete = async (chatId) => {
    const isCurertChat = location.pathname.includes(chatId);

    try {
      const response = await fetch(`${SERVER_URL}/api/chats/${chatId}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        await queryClient.invalidateQueries(["chat"]);
        // const updateChats = await queryClient.fetchQuery(["chat "]);
        await queryClient.fetchQuery(["chat"]);
        if (isCurertChat) {
          navigate("/dashboard");
        }
      } else {
        const errorData = await response.json();
        console.log(
          "Failed to delete chat",
          errorData.message || response.statusText
        );
      }
    } catch (error) {
      console.error("Error While deleting chat", error);
    } finally {
      setActiveChatId(null);
    }
  };

  const handleToggleMenu = (chatId) => {
    setActiveChatId((prev) => (prev === chatId ? null : chatId));
  };
  return (
    <>
      <IoIosMenu
        className="md:hidden w-6 h-6"
        // onClick={() => setIsMenuOpen(!isMenuOpen)}
      />
      {/* {console.log("menu open and close")} */}
      {isMenuOpen && (
        <div className="hidden md:flex  flex-col h-full  ">
          <span className=" font-semibold text-[10px] mb-3">DASHBOARD</span>
          <Link to="/dashboard">Create a new Chat </Link>
          <Link to="/" className="my-2">
            Explore Hz AI
          </Link>
          <Link to="/">Contact Us </Link>
          <hr className="border-none h-1 bg-primary-extra-light opacity-10 rounded-md my-5" />
          <span className=" font-semibold text-[10px] mb-3">RECENT CHATS</span>
          <div className="flex flex-col  overflow-auto">
            {isPending && "Loading..."} {error && "something went wrong"}
            {data?.length === 0 && "no chat available"}
            {/* {console.log("Rendering chatList with data: ", data)} */}
            {data
              ?.sort((a, b) => {
                const dateComparison =
                  new Date(b.createdAt) - new Date(a.createdAt);
                if (dateComparison !== 0) {
                  return dateComparison;
                }
                return b._id.localeCompare(a._id);
              })
              ?.map((chat) => (
                <div key={chat._id} className=" relative">
                  <Link
                    to={`/dashboard/chats/${chat._id}`}
                    // key={chat._id}
                    className="p-2 rounded-xl flex justify-between items-center hover:bg-primary-dark"
                  >
                    <span>{chat.title} </span>
                    {/* <button
                      onClick={() => handleToggleMenu(chat._id)}
                      className="ml-auto"
                    >
                      &#8230;
                    </button> */}
                  </Link>
                  {/* {activeChatId === chat._id && (
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
                  )} */}
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
      )}

    </>
  );
};

export default SidebarList;
