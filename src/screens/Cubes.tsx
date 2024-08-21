import { CameraControls, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useState } from "react";
import {
  BufferGeometry,
  Color,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
} from "three";

const Cube: React.FC<{
  color: Color | number | string;
  posX: number;
  rotate: boolean;
}> = ({ posX, color, rotate = true }) => {
  const myMesh = React.useRef<Mesh<
    BufferGeometry<NormalBufferAttributes>,
    Material | Material[],
    Object3DEventMap
  > | null>(null);

  useFrame(({ clock }) => {
    if (rotate && myMesh.current) {
      myMesh.current.rotation.x = clock.getElapsedTime() + posX;
      myMesh.current.rotation.y = clock.getElapsedTime() + posX;
      myMesh.current.rotation.z = clock.getElapsedTime() + posX;
    }
  });
  return (
    <mesh ref={myMesh} position-x={posX}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={color} opacity={0.5} transparent={true} />
    </mesh>
  );
};
export function CubesScreen() {
  const [rotate, setRotate] = useState(true);

  return (
    <>
      <group rotation={[0, 1, 0]}>
        <Cube posX={-1.5} color={0xff0000} rotate={rotate} />
        <Cube posX={0} color={0x00ff00} rotate={rotate} />
        <Cube posX={1.5} color={0x0000ff} rotate={rotate} />
      </group>
      <Text color="black" scale={[0.1, 0.1, 0.1]} position={[0, -1, 1]}>
        Move around to disable rotation
      </Text>
      <CameraControls
        minDistance={1}
        distance={5}
        maxDistance={10}
        onStart={() => setRotate(false)}
        onEnd={() => setRotate(true)}
      />
    </>
  );
}
