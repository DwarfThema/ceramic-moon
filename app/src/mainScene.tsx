import { Physics } from "@react-three/rapier";
import { Ground } from "./ground";
import { Player } from "./player";
import { useRef } from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import Ocean from "./ocean";
import Stars from "./star";

export default function MainScene() {
  console.log(-Math.PI / 2);

  return (
    <>
      <pointLight position={[0, 25, -5]} intensity={2000} />
      <Physics gravity={[0, -10, 0]}>
        <Ground>
          <mesh position={[0, 1, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={10}>
            <planeGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"white"} />
          </mesh>
        </Ground>
        <Ocean />
        <Player pos={{ x: 0, y: 2.5, z: 0 }} rot={{ x: 0, y: 0, z: 0 }} />
      </Physics>
    </>
  );
}
