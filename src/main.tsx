import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CanvasWrapper } from "./components/canvas.tsx";

import { Animation } from "./screens/Animation.tsx";
import { CubesScreen } from "./screens/Cubes.tsx";
import { DebugUi } from "./screens/DebugUi.tsx";
import { FirstScene } from "./screens/FirstScene.tsx";
import { Home } from "./screens/Home.tsx";
import { Materials } from "./screens/Materials/index.tsx";
import { Textures } from "./screens/Texture/index.tsx";
import { Lights } from "./screens/Lights.tsx";
import { Shadows } from "./screens/Shadows.tsx";

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
        <CanvasWrapper shadows>
          <CubesScreen />
        </CanvasWrapper>
      </div>
    ),
  },
  {
    path: "/animation",
    element: (
      <div className="h-screen">
        <CanvasWrapper gl={{ alpha: false }}>
          <Animation />
        </CanvasWrapper>
      </div>
    ),
  },
  {
    path: "/debug-ui",
    element: (
      <div className="h-screen">
        <CanvasWrapper
          camera={{
            fov: 90,
          }}
          gl={{
            alpha: true,
          }}
        >
          <DebugUi />
        </CanvasWrapper>
      </div>
    ),
  },
  {
    path: "/textures",
    element: (
      <div className="h-screen">
        <CanvasWrapper>
          <Textures />
        </CanvasWrapper>
      </div>
    ),
  },
  {
    path: "/materials",
    element: (
      <div className="h-screen">
        <CanvasWrapper gl={{ alpha: false }}>
          <Materials />
        </CanvasWrapper>
      </div>
    ),
  },
  {
    path: "/lights",
    element: (
      <div className="h-screen">
        <CanvasWrapper>
          <Lights />
        </CanvasWrapper>
      </div>
    ),
  },
  {
    path: "/shadows",
    element: (
      <div className="h-screen">
        <CanvasWrapper shadows>
          <Shadows />
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
