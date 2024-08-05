import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const ChatList = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  return (
    <div className="flex  flex-col h-full ">
      <span className=" font-semibold text-[10px] mb-3">DASHBOARD</span>
      <Link to="/dashboard">Create a new Chat </Link>
      <Link to="/">Explore Hz AI </Link>
      <Link to="/">Contact </Link>
      <hr className="border-none h-1 bg-primary-extra-light opacity-10 rounded-md my-5" />
      <span className=" font-semibold text-[10px] mb-3">RECENT CHATS</span>
      <div className=" flex flex-col overflow-auto">
        {isPending
          ? "Loading..."
          : error
          ? "something went wrong"
          : data?.reverse()?.map((chat) => (
              <Link
                to={`/dashboard/chats/${chat._id}`}
                key={chat._id}
                className="p-3 rounded-xl hover:bg-primary-dark"
              >
                {chat.title}
              </Link>
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
