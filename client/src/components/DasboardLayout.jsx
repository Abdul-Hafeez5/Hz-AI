import { Outlet, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import SideBarList from "./SidebarList";

const DasboardLayout = () => {
  const { userId, isLoaded } = useAuth();

  const navigate = useNavigate();
  const queryClient = new QueryClient();

  useEffect(() => {
    if (isLoaded && !userId) navigate("/sign-in");
  }, [isLoaded, userId, navigate]);

  if (!isLoaded) return "Loading...";

  return (
    <QueryClientProvider client={queryClient}>
      <div className=" flex md:gap-12 pt-5 h-full ">
        <div className=" md:flex-1  ">
          <SideBarList />
        </div>
        <div className=" flex-4 bg-primary-extra-dark">
          <Outlet />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default DasboardLayout;
