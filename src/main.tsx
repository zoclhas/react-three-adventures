import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { Stats } from "@react-three/drei";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CanvasWrapper } from "./components/canvas.tsx";
import { FirstScene } from "./screens/FirstScene.tsx";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <App />,
  },
  {
    path: "/first-scene",
    element: (
      <div className="h-screen">
        <CanvasWrapper>
          <FirstScene />
          <Stats />
        </CanvasWrapper>
      </div>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
