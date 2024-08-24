import {
  AccumulativeShadows,
  Environment,
  OrbitControls,
  RandomizedLight,
  useGLTF,
} from "@react-three/drei";
import { ComponentProps, useLayoutEffect } from "react";
import * as THREE from "three";
import { FlakesTexture } from "three/examples/jsm/Addons.js";

export function Shadows() {
  return (
    <>
      <color attach="background" args={["#bf2c6e"]} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} castShadow />;
      <directionalLight
        position={[-5, 5, 5]}
        intensity={0.5}
        color="green"
        castShadow
      />
      <mesh rotation-y={Math.PI / 4} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="blue" />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position-y={-0.5} receiveShadow>
        <planeGeometry args={[5, 5]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <OrbitControls autoRotate={true} />
    </>
  );
}

export function Shadows2() {
  return (
    <>
      <color attach="background" args={["#bf2c6e"]} />

      <group>
        <Suzi rotation={[-0.63, 0, 0]} scale={2} position={[1, -1.175, 0]} />

        <AccumulativeShadows position={[0, -0.5, 0]}>
          <RandomizedLight
            amount={16}
            radius={9}
            ambient={0.6}
            bias={0.001}
            position={[5, 5, -10]}
          />
        </AccumulativeShadows>
      </group>

      <OrbitControls autoRotate={true} />
      <Environment preset="forest" />
    </>
  );
}

const Suzi = (props: ComponentProps<"group">) => {
  const { scene, materials } = useGLTF("/suzi.gltf");
  useLayoutEffect(() => {
    scene.traverse(
      (obj) =>
        // eslint-disable-next-line
        (obj as any).isMesh && (obj.receiveShadow = obj.castShadow = true),
    );
    const material = materials.default as THREE.MeshStandardMaterial;
    material.color.set("pink");
    material.roughness = 0;
    material.normalMap = new THREE.CanvasTexture(
      new FlakesTexture(),
      THREE.UVMapping,
      THREE.RepeatWrapping,
      THREE.RepeatWrapping,
    );
    material.normalMap.flipY = false;
    material.normalMap.repeat.set(40, 40);
    material.normalScale.set(0.05, 0.05);
  });
  return <primitive object={scene} {...props} />;
};
