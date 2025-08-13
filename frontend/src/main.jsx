import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Skills from "./pages/Skills.jsx";
import Blog from "./pages/Blog.jsx";
import Post from "./pages/Post.jsx";
import NotFound from "./pages/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "skills", element: <Skills /> },
      { path: "blog", element: <Blog /> },
      { path: "blog/:slug", element: <Post /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
