import { usePlane, useSphere, Physics } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useState } from "react";
import { makeButton, useTweaks } from "use-tweaks";

export function PhysicsScence() {
  const [sphereCount, set] = useState(0);

  useTweaks({
    ...makeButton("Reset", () => set(0)),
    ...makeButton("Create Sphere", () => set((count) => count + 1)),
  });

  return (
    <>
      <color attach="background" args={["pink"]} />

      <Physics
        defaultContactMaterial={{
          friction: 0.1,
          restitution: 0.7,
        }}
        allowSleep
        gravity={[0, -30, 0]}
        broadphase={"SAP"}
      >
        <ambientLight args={["#ffffff", 0.7]} />
        <directionalLight
          castShadow
          shadow-mapSize-x={1024}
          shadow-mapSize-y={1024}
          shadow-camera-far={15}
          shadow-camera-left={-7}
          shadow-camera-top={7}
          shadow-camera-right={7}
          shadow-camera-bottom={-7}
          position={[5, 5, 5]}
          args={["#ffffff", 0.2]}
        />
        <Suspense fallback={null}>
          <Shapes count={sphereCount} />
        </Suspense>
        <OrbitControls />
      </Physics>
    </>
  );
}

const Plane = () => {
  const [ref] = usePlane(() => ({
    mass: 0,
    rotation: [-Math.PI * 0.5, 0, 0],
  }));

  return (
    // @ts-expect-error meh
    <mesh receiveShadow ref={ref} position={[0, 2, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#fff" metalness={0.3} roughness={0.4} />
    </mesh>
  );
};

const Sphere = () => {
  const [ref] = useSphere(() => ({
    mass: 1,
    position: [(Math.random() - 0.5) * 3, 5, (Math.random() - 0.5) * 3],
  }));

  return (
    // @ts-expect-error meh
    <mesh ref={ref} castShadow>
      <sphereGeometry args={[0.5, 20, 20]} />
      <meshStandardMaterial metalness={0.3} roughness={0.4} color="blue" />
    </mesh>
  );
};

const Shapes: React.FC<{ count: number }> = ({ count }) => {
  return (
    <>
      <Plane />
      <Suspense fallback={null}>
        {new Array(count).fill(null).map((_, idx) => (
          <Sphere key={`0${idx}`} />
        ))}
      </Suspense>
    </>
  );
};
