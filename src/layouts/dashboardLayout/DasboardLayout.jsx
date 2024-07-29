import { Outlet, useNavigate } from "react-router-dom";
import "./dasboardLayout.css";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

const DasboardLayout = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoaded && !userId) navigate("/sign-in");
  }, [isLoaded, userId, navigate]);

  if (!isLoaded) return "Loading...";
  return (
    <div className="dasboardLayout">
      <div className="menu">Menu</div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default DasboardLayout;
