import { Stats } from "@react-three/drei";
import { Canvas, Props } from "@react-three/fiber";
import React from "react";

// @ts-expect-error Just some ts
export const CanvasWrapper: React.ForwardRefExoticComponent<
  Props & React.RefAttributes<HTMLCanvasElement>
> = (props) => (
  <Canvas {...props}>
    {props.children}
    <Stats />
  </Canvas>
);
