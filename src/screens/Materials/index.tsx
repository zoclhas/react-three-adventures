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

import {
  CameraControls,
  Environment,
  useCubeTexture,
  useTexture,
} from "@react-three/drei";
import { MeshProps, useFrame, useLoader } from "@react-three/fiber";
import React, { useState } from "react";
import * as THREE from "three";
import { a, useSpring } from "@react-spring/three";
import { makeButton, useTweaks } from "use-tweaks";

export function Materials() {
  const [colorMap, normalMap, roughnessMap, displacementMap, metalnessMap] =
    useLoader(THREE.TextureLoader, [baseColor, normal, rough, height, metal]);
  const envMap = useCubeTexture([nx, ny, nz, px, py, pz], { path: "" });

  // @ts-expect-error I dont know
  const { ambientIntensity, pointIntensity, metalness } = useTweaks({
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
  });

  return (
    <>
      <mesh>
        <ambientLight intensity={ambientIntensity} />
        <a.pointLight intensity={pointIntensity} position={[6, 6, -3]} />
        <boxGeometry />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
          displacementMap={displacementMap}
          metalnessMap={metalnessMap}
          displacementScale={0}
          metalness={metalness}
          envMap={envMap}
        />
      </mesh>
      <CameraControls minDistance={1} distance={5} maxDistance={10} />
      <Environment map={envMap} background />
    </>
  );
}

const SharedMesh: React.FC<MeshProps> = (props) => {
  const ref = React.useRef<THREE.Mesh<
    THREE.BufferGeometry<THREE.NormalBufferAttributes>,
    THREE.Material | THREE.Material[],
    THREE.Object3DEventMap
  > | null>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += 0.1 * delta;
      ref.current.rotation.x += 0.15 * delta;
    }
  });
  return (
    <mesh ref={ref} {...props}>
      {props.children}
    </mesh>
  );
};
