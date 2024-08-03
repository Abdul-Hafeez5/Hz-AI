import { useNavigate } from "react-router-dom";
import "./dashboardPage.css";
import { useMutation, QueryClient } from "@tanstack/react-query";

const DashboardPage = () => {
  const queryClient = new QueryClient();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (text) => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
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
    <div className="dashboardPage h-full flex flex-col items-center">
      <div className="texts flex-1 flex items-center justify-center flex-col w-1/2 gap-12">
        <div className="logo flex items-center gap-5 opacity-20">
          <img src="/logo.png" alt="logo" className="w-16 h-16" />
          <h1 className="text-6xl text-transparent bg-gradient-to-r  ">
            Hz AI
          </h1>
        </div>
        <div className="options w-full flex items-center justify-between gap-12">
          <div className="option ">
            <img src="/chat.png" alt="chat" className="option-img" />
            <span>Create a New Chat</span>
          </div>
          <div className="option">
            <img src="/image.png" alt="chat"  className="option-img"/>
            <span>Analyze Images</span>
          </div>
          <div className="option">
            <img src="/code.png" alt="chat" className="option-img"/>
            <span>Help me with my code</span>
          </div>
        </div>
      </div>
      <div className="formContainer mt-auto w-1/2 bg-primary-dark">
        <form onSubmit={handleSubmit}>
          <input type="text" name="text" placeholder="Ask me anything..." />
          <button>
            <img src="/arrow.png" alt="submit" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashboardPage;
