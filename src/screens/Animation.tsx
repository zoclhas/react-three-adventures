import { a, animated, useSpring } from "@react-spring/three";
import { CameraControls, MeshDistortMaterial, Text } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";
import React, { useState } from "react";

const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial);

export function Animation() {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => setClicked((s) => !s);

  const [pos, setPos] = useState<Vector3>([0, 0, 0]);

  const { color } = useSpring({
    color: clicked ? "#569AFF" : "#ff6d6d",
    position: clicked ? [0, 0, -10] : [0, 0, 0],
    onChange: ({ value }) => {
      const z = value.position[2];
      const progress = Math.abs(z / 10);
      if (clicked) {
        const x = -5 * Math.sin(progress * Math.PI);
        setPos([x, x * 1.05, z]);
      } else {
        const x = 5 * Math.sin(progress * Math.PI);
        setPos([x, x * 1.05, z]);
      }
    },
  });
  return (
    <>
      <ambientLight intensity={0.8} />
      <a.pointLight intensity={50} position={[0, 6, 0]} />

      <a.mesh onClick={handleClick} position={pos}>
        <sphereGeometry args={[1.5, 64, 32]} />
        <AnimatedMeshDistortMaterial
          speed={5}
          distort={0.5}
          color={color}
          wireframe
        />
      </a.mesh>

      <Text color="white" scale={[0.1, 0.1, 0.1]} position={[0, -1, 1.5]}>
        Click to change color & position
      </Text>
      <CameraControls minDistance={3} distance={5} maxDistance={10} />
    </>
  );
}
