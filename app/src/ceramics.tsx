import { Float, Gltf, Instance, useGLTF } from "@react-three/drei";
import { useFrame, useGraph } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect, useMemo, useRef, useState } from "react";
import { Group, Material, Mesh } from "three";

export default function Ceramics() {
  const { scene } = useGLTF("/models/cermaics.glb");
  const ceramicScene = useMemo(() => scene, [scene]);
  const { nodes } = useGraph(ceramicScene);
  const ceramicMesh = nodes.Scene as Group;
  const ceramicMeshs: Mesh[] = [];
  ceramicMesh.traverse((obj) => {
    if (obj instanceof Mesh) {
      ceramicMeshs.push(obj);
    }
  });

  const positionsA = useMemo(() => {
    return [...Array(60)]
      .map(() => ({
        position: [
          0 - Math.random() * 10,
          10 - Math.random() * 10,
          0 - Math.random() * 10,
        ],
      }))
      .filter(
        (pos) =>
          (pos.position[0] < 0 || pos.position[0] > 5) &&
          (pos.position[1] < 0 || pos.position[1] > 5) &&
          (pos.position[2] < 0 || pos.position[2] > 5)
      );
  }, []);

  const { posx, posy, posz, scale } = useControls({
    posx: { value: 31.5, step: 0.1 },
    posy: { value: 56, step: 1 },
    posz: { value: -9, step: 1 },
    scale: { value: 59, step: 1 },
  });

  const positionsB = useMemo(() => {
    return [...Array(60)]
      .map(() => ({
        position: [
          posx - Math.random() * scale,
          posy - Math.random() * scale,
          posz - Math.random() * scale,
        ],
      }))
      .filter(
        (pos) =>
          (pos.position[0] < 0 || pos.position[0] > 5) &&
          (pos.position[1] < 0 || pos.position[1] > 5) &&
          (pos.position[2] < 0 || pos.position[2] > 5)
      );
  }, []);

  /*   const positionsB = [...Array(60)]
    .map(() => ({
      position: [
        posx - Math.random() * scale,
        posy - Math.random() * scale,
        posz - Math.random() * scale,
      ],
    }))
    .filter(
      (pos) =>
        (pos.position[0] < 0 || pos.position[0] > 15) &&
        (pos.position[1] < 0 || pos.position[1] > 15) &&
        (pos.position[2] < 0 || pos.position[2] > 15)
    ); */

  useEffect(() => {
    //console.log(positionsA), [];
  });

  return (
    <group>
      {ceramicMeshs.map((mesh, index) => {
        if (mesh.name.includes("flying")) {
          return (
            <Ceramic
              key={index}
              mesh={mesh}
              material={mesh.material as Material}
              positionA={positionsA?.[index]}
              positionB={positionsB?.[index]}
            />
          );
        } else {
          return (
            <mesh
              key={index}
              geometry={mesh.geometry}
              material={mesh.material}
              position={mesh.position}
              scale={1}
              receiveShadow
              castShadow
            />
          );
        }
      })}
    </group>
  );
}

function Ceramic({
  mesh,
  positionA,
  positionB,
  material,
  ...props
}: {
  mesh: Mesh;
  material: Material;

  positionA?: { position: number[] };
  positionB?: { position: number[] };
}) {
  const ref = useRef<Mesh>(null);
  const [isClicked, setClicked] = useState(false);

  const random = positionB?.position[1] as number;

  useFrame((state) => {
    const t = state.clock.getElapsedTime() + random * 1;
    if (ref.current) {
      ref.current.rotation.set(
        Math.cos(t / 8) / 2,
        Math.sin(t / 8) / 2,
        Math.cos(t / 3) / 2
      );
    }
  });

  return (
    <Float speed={0.3} floatIntensity={0.2} floatingRange={[1, 5]}>
      <mesh
        ref={ref}
        onClick={() => {
          setClicked(true);
          console.log("good");
        }}
        geometry={mesh.geometry}
        position={[
          positionB?.position[0] as number,
          positionB?.position[1] as number,
          positionB?.position[2] as number,
        ]}
        scale={12}
        {...props}
      />
    </Float>
  );
}
