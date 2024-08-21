import { a, animated, useSpring } from "@react-spring/three";
import { CameraControls, MeshDistortMaterial, Text } from "@react-three/drei";
import { useState } from "react";

const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial);

export function Animation() {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => setClicked((s) => !s);

  const { color } = useSpring({
    color: clicked ? "#569AFF" : "#ff6d6d",
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <a.pointLight intensity={50} position={[0, 6, 0]} />

      <mesh onClick={handleClick}>
        <sphereGeometry args={[1.5, 64, 32]} />
        <AnimatedMeshDistortMaterial speed={5} distort={0.5} color={color} />
      </mesh>

      <Text color="white" scale={[0.1, 0.1, 0.1]} position={[0, -1, 1.5]}>
        Click to change color
      </Text>
      <CameraControls minDistance={1} distance={5} maxDistance={10} />
    </>
  );
}
