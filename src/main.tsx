import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Canvas } from "@react-three/fiber";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FirstScene } from "./screens/FirstScene.tsx";
import { Stats } from "@react-three/drei";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <App />,
  },
  {
    path: "/first-scene",
    element: (
      <div className="h-screen">
        <Canvas>
          <FirstScene />
          <Stats />
        </Canvas>
      </div>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
