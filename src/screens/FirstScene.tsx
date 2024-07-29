import { Canvas } from "@react-three/fiber";

export function FirstScene() {
  return (
    <div id="canvas-container" className="h-screen">
      <Canvas>
        <mesh>
          <octahedronGeometry args={[1, 4]} />
          <meshBasicMaterial transparent={true} opacity={0.5} color="blue" />
        </mesh>
      </Canvas>
    </div>
  );
}
