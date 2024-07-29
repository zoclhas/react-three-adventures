import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FirstScene } from "./screens/FirstScene.tsx";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <App />,
  },
  {
    path: "/first-scene",
    element: <FirstScene />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
