import baseColor from "./assets/Metal048C_1K-JPG_Color.jpg";
import baseColor2 from "./assets/gold_block.png";

import React, { Suspense, useState } from "react";
import * as THREE from "three";
import { CameraControls } from "@react-three/drei";
import { a, useSpring } from "@react-spring/three";
import { useTweaks, makeButton } from "use-tweaks";
import { useLoader } from "@react-three/fiber";

export function Textures() {
  const texture = useLoader(THREE.TextureLoader, baseColor);

  const mcTexture = useLoader(THREE.TextureLoader, baseColor2);
  mcTexture.generateMipmaps = false;
  mcTexture.minFilter = THREE.NearestFilter;
  mcTexture.magFilter = THREE.NearestFilter;

  return (
    <>
      <Cube
        texture={texture}
        boxPosition={[-1, 0, 0]}
        spinLabel="Spin Cube 1"
      />
      <Cube
        texture={mcTexture}
        boxPosition={[1, 0, 0]}
        rotate="y"
        spinLabel="Spin Cube 2"
      />
      <CameraControls minDistance={1} distance={5} maxDistance={10} />
    </>
  );
}

const Cube = ({
  texture,
  boxPosition,
  rotate = "x",
  spinLabel = "Spin",
}: {
  texture: THREE.Texture;
  boxPosition?: [number, number, number];
  rotate?: "x" | "y";
  spinLabel?: string;
}) => {
  const [rotationX, setRotationX] = useState(0);

  useTweaks({
    ...makeButton(spinLabel, () => setRotationX((x) => x + Math.PI * 2)),
  });

  const { rotation } = useSpring({
    to: {
      rotation: rotationX,
    },
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <a.mesh
      rotation-x={rotate === "x" && rotation}
      rotation-y={rotate === "y" && rotation}
      position={boxPosition}
    >
      <boxGeometry />
      <a.meshBasicMaterial attach="material" map={texture} />{" "}
    </a.mesh>
  );
};
