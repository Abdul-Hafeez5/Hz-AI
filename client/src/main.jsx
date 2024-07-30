import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import HomePage from "./routes/homePage/HomePage.jsx";
import DashboardPage from "./routes/dashboardPage/DashboardPage.jsx";
import DashboardLayout from "./layouts/dashboardLayout/DasboardLayout.jsx";
import ChatPage from "./routes/chatPage/ChatPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayOut from "./layouts/rootLayout/RootLayOut.jsx";
import SignInPage from "./routes/signInPage/SignInPage.jsx";
import SignUpPage from "./routes/signUpPage/SignUpPage.jsx";

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
