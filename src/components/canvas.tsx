import { Canvas } from "@react-three/fiber";
import React from "react";

export const CanvasWrapper = ({ children }: { children: React.ReactNode }) => (
  <Canvas>{children}</Canvas>
);
