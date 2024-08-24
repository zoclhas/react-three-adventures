import { CameraControls } from "@react-three/drei";
import { MeshProps, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  BufferGeometry,
  DirectionalLight,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
  RectAreaLight,
  SpotLight,
  SpotLightHelper,
  Vector3,
} from "three";

export function Lights() {
  return (
    <>
      <color attach="background" args={[0, 0, 0]} />

      <Light />
      <Objects />

      <CameraControls minDistance={1} distance={5} maxDistance={10} />
    </>
  );
}

const Light = () => {
  const { scene } = useThree();

  const directionalLightRef = useRef<DirectionalLight>(null);

  const ral = useRef<RectAreaLight>(null);
  useLayoutEffect(() => {
    if (ral.current) {
      ral.current.lookAt(new Vector3());
    }
  });

  const sl = useRef<SpotLight>(null);
  useLayoutEffect(() => {
    if (sl.current) {
      sl.current.target.position.x = -0.75;
      scene.add(sl.current.target);
    }
  });

  useEffect(() => {
    let req: number;

    if (sl.current) {
      const spotLightHelper = new SpotLightHelper(sl.current);
      scene.add(spotLightHelper);

      req = requestAnimationFrame(() => spotLightHelper.update());
    }

    return () => cancelAnimationFrame(req);
  }, [sl, scene]);

  return (
    <>
      <ambientLight args={[0xffffff, 0.5]} />
      <directionalLight
        ref={directionalLightRef}
        args={[0x00ffcc, 0.3]}
        position={[1, 0.25, 0]}
      />
      {directionalLightRef.current && (
        <directionalLightHelper args={[directionalLightRef.current, 0.2]} />
      )}
      <hemisphereLight args={[0xff0000, 0x0000ff, 0.3]} />
      <pointLight args={[0xff9000, 0.8, 10, 2]} position={[1, -0.5, 1]} />
      <pointLight args={[0xff9000, 0.8, 10, 2]} position={[-1.5, 0, -0.5]} />
      <rectAreaLight
        ref={ral}
        args={[0x4e00ff, 2, 1, 1]}
        position={[-1.5, 0, 1.5]}
      />
      <spotLight
        ref={sl}
        args={[0x78ff00, 0.5, 6, Math.PI * 0.1, 0.25, 1]}
        position={[0, 2, 3]}
      />{" "}
    </>
  );
};

const MeshWithRotation: React.FC<MeshProps> = (props) => {
  const { material } = props;
  const ref = useRef<Mesh<
    BufferGeometry<NormalBufferAttributes>,
    Material | Material[],
    Object3DEventMap
  > | null>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += 0.1 * delta;
      ref.current.rotation.x += 0.15 * delta;
    }
  });
  return <mesh {...props} ref={ref} material={material} />;
};

const Objects = () => {
  const [material, set] = useState();

  return (
    <>
      <mesh>
        {/* @ts-expect-error I'm just lazy */}
        <meshStandardMaterial ref={set} roughness={0.3} />
        {material && (
          <group>
            <MeshWithRotation material={material} position={[-1.5, 0, 0]}>
              <octahedronGeometry args={[0.5]} />
            </MeshWithRotation>
            <MeshWithRotation material={material}>
              <boxGeometry args={[0.75, 0.75, 0.75]} />
            </MeshWithRotation>
            <MeshWithRotation material={material} position={[1.5, 0, 0]}>
              <torusGeometry args={[0.3, 0.2, 32, 64]} />
            </MeshWithRotation>
            <mesh
              material={material}
              position={[0, -0.65, 0]}
              rotation={[-Math.PI * 0.5, 0, 0]}
            >
              <planeGeometry args={[5, 5]} />
            </mesh>
          </group>
        )}
      </mesh>
    </>
  );
};
