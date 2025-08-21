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
import RGBFlareCursor from "./components/RGBFlareCursor.jsx";
import FluidSim from "./components/FluidCursorDemo.jsx";
import FluidCursorDemo from "./components/FluidCursorDemo.jsx";

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
    <div className=" hidden lg:dark:block "><RGBFlareCursor
      size={40}
      intensity="opacity-100"
      color = "#03a0bc"
    /></div>
    <div className="hidden lg:block"><FluidCursorDemo  /></div>
    <RouterProvider router={router} />
  </React.StrictMode>
);
