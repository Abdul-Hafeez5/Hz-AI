import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import HomePage from "./components/HomePage.jsx";
import DashboardPage from "./components/DashboardPage.jsx";
import DashboardLayout from "./components/DasboardLayout.jsx";
import ChatPage from "./components/ChatPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayOut from "./components/RootLayOut.jsx";
import SignInPage from "./components/SignInPage.jsx";
import SignUpPage from "./components/SignUpPage.jsx";

const appRouter = createBrowserRouter([
  {
    element: <RootLayOut />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/sign-in/*", element: <SignInPage /> },
      { path: "/sign-up/*", element: <SignUpPage /> },
      {
        element: <DashboardLayout />, 
        children: [
          { path: "/dashboard", element: <DashboardPage /> },
          { path: "/dashboard/chats/:id", element: <ChatPage /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={appRouter} />
  </React.StrictMode>
);
