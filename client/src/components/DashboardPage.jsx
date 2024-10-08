import { useNavigate } from "react-router-dom";
import { useMutation, QueryClient } from "@tanstack/react-query";
import {SERVER_URL} from "../utils/constants"

const DashboardPage = () => {
  const queryClient = new QueryClient();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (text) => {
      return fetch(`${SERVER_URL}/api/chats`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }).then((res) => res.json());
    },
    onSuccess: (id) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      navigate(`/dashboard/chats/${id}`);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;

    if (!text) return;

    mutation.mutate(text);
  };

  return (
    <div className=" h-full flex flex-col items-center">
      <div className=" flex-1 flex items-center justify-center flex-col w-1/2 gap-12">
        <div className=" flex items-center gap-5 opacity-20">
          <img src="/logo.png" alt="logo" className="w-16 h-16" />
          <h1 className="text-6xl bg-gradient-to-r from-blue-custom to-pink-custom bg-clip-text  ">
            Hz AI
          </h1>
        </div>
        <div className=" w-full block  md:flex flex-wrap items-center justify-between md:gap-x-4  ">
          <div className="option ">
            <img src="/chat.png" alt="chat" className="option-img" />
            <span>Create a New Chat</span>
          </div>
          <div className="option">
            <img src="/image.png" alt="chat" className="option-img" />
            <span>Analyze Images</span>
          </div>
          <div className="option">
            <img src="/code.png" alt="chat" className="option-img" />
            <span>Help me with my code</span>
          </div>
        </div>
      </div>
      <div className=" mt-auto w-1/2 bg-primary-dark rounded-xl">
        <form
          onSubmit={handleSubmit}
          className="w-full h-full flex items-center justify-between gap-5 mb-2"
        >
          <input
            type="text"
            name="text"
            placeholder="Ask me anything..."
            className=" flex-1 lg:p-5 p-3 bg-transparent border-none outline-none text-primary-light"
          />
          <button className="bg-primary-light lg:rounded-[50%] rounded-xl border-none cursor-pointer p-1 mr-2 flex items-center justify-center lg:mr-5   ">
            <img src="/arrow.png" alt="submit" className="lg:w-4 lg:h-4 w-3 h-3" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashboardPage;
