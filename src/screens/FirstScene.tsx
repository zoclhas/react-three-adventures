import { CameraControls, Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React from "react";
import {
  BufferGeometry,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
} from "three";

export function FirstScene() {
  const myMesh = React.useRef<Mesh<
    BufferGeometry<NormalBufferAttributes>,
    Material | Material[],
    Object3DEventMap
  > | null>(null);

  useFrame(({ clock }) => {
    if (myMesh.current) {
      myMesh.current.rotation.x = clock.getElapsedTime();
      myMesh.current.rotation.y = clock.getElapsedTime();
      myMesh.current.rotation.z = clock.getElapsedTime();
    }
  });

  return (
    <>
      <mesh ref={myMesh}>
        {/* <boxGeometry /> */}
        {/* <meshBasicMaterial transparent={true} opacity={0.5} color="blue" /> */}
        <Line
          points={[
            [-10, 0, 0],
            [0, 10, 0],
            [10, 0, 0],
            [0, 0, 10],
            [0, 10, 0],
            [0, 0, 10],
            [-10, 0, 0],
            [10, 0, 0],
          ]}
          color="red"
        />
      </mesh>
      <CameraControls minDistance={10} distance={20} maxDistance={40} />
    </>
  );
}
