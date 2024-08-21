import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CanvasWrapper } from "./components/canvas.tsx";

import { Home } from "./screens/Home.tsx";
import { FirstScene } from "./screens/FirstScene.tsx";
import { CubesScreen } from "./screens/Cubes.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/first-scene",
    element: (
      <div className="h-screen">
        <CanvasWrapper>
          <FirstScene />
        </CanvasWrapper>
      </div>
    ),
  },
  {
    path: "/cubes",
    element: (
      <div className="h-screen">
        <CanvasWrapper>
          <CubesScreen />
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
