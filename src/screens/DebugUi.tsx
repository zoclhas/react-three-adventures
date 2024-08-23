import React from "react";
import { CameraControls } from "@react-three/drei";
import { a, useSpring } from "@react-spring/three";
import { useTweaks, makeButton, makeSeparator } from "use-tweaks";

const Cube: React.FC = () => {
  const [rotationY, setRotationY] = React.useState(0);

  const {
    // @ts-expect-error Idk
    x,
    // @ts-expect-error Idk
    y,
    // @ts-expect-error Idk
    z,
    // @ts-expect-error Idk
    wireframe,
    // @ts-expect-error Idk
    visibility,
    // @ts-expect-error Idk
    color: c,
  } = useTweaks({
    x: {
      value: 0,
      min: -3,
      max: 3,
    },
    y: {
      value: 0,
      min: -3,
      max: 3,
    },
    z: {
      value: 0,
      min: -3,
      max: 3,
    },
    color: "#1f9f8f",
    wireframe: true,
    visibility: true,
    ...makeSeparator(),
    ...makeButton("Spin", () => setRotationY((y) => y + Math.PI * 2)),
  });

  const { rotation } = useSpring({
    to: {
      rotation: rotationY,
    },
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <a.mesh position-x={x} position-y={y} position={z} rotation-y={rotation}>
      <boxGeometry args={[1, 1, 1]} />
      <a.meshBasicMaterial
        wireframe={wireframe}
        visible={visibility}
        attach="material"
        color={c}
      />
    </a.mesh>
  );
};

export function DebugUi() {
  return (
    <>
      <color attach="background" args={[0, 0, 0]} />
      <CameraControls minDistance={1} distance={5} maxDistance={10} />
      <Cube />
    </>
  );
}
