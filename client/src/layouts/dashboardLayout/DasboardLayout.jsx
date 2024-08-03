import { Outlet, useNavigate } from "react-router-dom";
import "./dasboardLayout.css";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import ChatList from "../../components/chatList/ChatList";

const DasboardLayout = () => {
  const { userId, isLoaded } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !userId) navigate("/sign-in");
  }, [isLoaded, userId, navigate]);

  if (!isLoaded) return "Loading...";

  return (
    <div className="dashboardLayout flex gap-12 pt-5 h-full ">
      <div className="menu flex-1  ">
        <ChatList />
      </div>
      <div className="content flex-4 bg-primary-extra-dark">
        <Outlet />
      </div>
    </div>
  );
};

export default DasboardLayout;
