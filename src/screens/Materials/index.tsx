import { color } from "three/webgpu";
import baseColor from "./assets/Metal048C_1K-JPG_Color.jpg";
import height from "./assets/Metal048C_1K-JPG_Displacement.jpg";
import metal from "./assets/Metal048C_1K-JPG_Metalness.jpg";
import normal from "./assets/Metal048C_1K-JPG_NormalGL.jpg";
import rough from "./assets/Metal048C_1K-JPG_Roughness.jpg";

import nx from "./assets/env/nx.jpg";
import ny from "./assets/env/ny.jpg";
import nz from "./assets/env/nz.jpg";
import px from "./assets/env/px.jpg";
import py from "./assets/env/py.jpg";
import pz from "./assets/env/pz.jpg";

import { a } from "@react-spring/three";
import { CameraControls, Environment, useCubeTexture } from "@react-three/drei";
import { MeshProps, useFrame, useLoader } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import { makeFolder, useTweaks } from "use-tweaks";

export function Materials() {
  return (
    <>
      <GoldMatSphere />
      <Environment files={[nx, ny, nz, px, py, pz]} background />
      <CameraControls minDistance={1} distance={5} maxDistance={10} />
    </>
  );
}

export const GoldMatSphere = ({ enableEnv }: { enableEnv?: boolean }) => {
  const material = useLoader(THREE.TextureLoader, [
    baseColor,
    normal,
    rough,
    height,
    metal,
  ]);
  material.map((m) => ({
    ...m,
    repeat: {
      ...m.repeat,
      x: 1,
      y: 1,
    },
  }));
  const [colorMap, normalMap, roughnessMap, displacementMap, metalnessMap] =
    material;
  const envMap = useCubeTexture([nx, ny, nz, px, py, pz], { path: "" });

  const {
    // @ts-expect-error I dont know
    ambientIntensity,
    // @ts-expect-error I dont know
    pointIntensity,
    // @ts-expect-error I dont know
    metalness,
    // @ts-expect-error I dont know
    radius,
    // @ts-expect-error I dont know
    widthSegments,
    // @ts-expect-error I dont know
    heightSegments,
  } = useTweaks({
    ...makeFolder("Material", {
      ambientIntensity: {
        value: 0.8,
        min: 0,
        max: 1,
      },
      pointIntensity: {
        value: 50,
        min: 0,
        max: 100,
      },
      metalness: {
        value: 1,
        min: 0,
        max: 1,
      },
    }),
    ...makeFolder("Sphere", {
      radius: {
        value: 1,
        min: 1,
        max: 5,
      },
      widthSegments: {
        value: 128,
        min: 3,
        max: 512,
      },
      heightSegments: {
        value: 128,
        min: 2,
        max: 512,
      },
    }),
  });

  return (
    <SharedMesh>
      <ambientLight intensity={ambientIntensity} />
      <a.pointLight intensity={pointIntensity} position={[6, 6, -3]} />

      <sphereGeometry args={[radius, widthSegments, heightSegments]} />
      <meshStandardMaterial
        map={colorMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        displacementMap={displacementMap}
        metalnessMap={metalnessMap}
        displacementScale={0}
        metalness={metalness}
        envMap={enableEnv ? envMap : undefined}
      />
    </SharedMesh>
  );
};

const SharedMesh: React.FC<MeshProps> = (props) => {
  const ref = React.useRef<THREE.Mesh<
    THREE.BufferGeometry<THREE.NormalBufferAttributes>,
    THREE.Material | THREE.Material[],
    THREE.Object3DEventMap
  > | null>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += 0.15 * delta;
    }
  });
  return (
    <mesh ref={ref} {...props}>
      {props.children}
    </mesh>
  );
};
