import { Physics } from "@react-three/rapier";
import { Ground } from "./ground";
import { Player } from "./player";
import Ocean from "./ocean";
import { useControls } from "leva";
import { Cloud, Gltf, OrbitControls, Stars } from "@react-three/drei";
import Ceramics from "./ceramics";

export default function MainScene() {
  return (
    <>
      <pointLight position={[0, 25, -5]} intensity={2000} />
      <Physics gravity={[0, -10, 0]}>
        <Player pos={{ x: 0, y: 2.5, z: 0 }} rot={{ x: 0, y: 0, z: 0 }} />
        <Ground>
          <mesh position={[0, 1, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={10}>
            <planeGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"white"} />
          </mesh>
        </Ground>
        <Ocean />
        <Gltf src="/models/moon.gltf" position={[0, 30, -370]} scale={50} />
        <Stars
          radius={100} // Radius of the inner sphere (default=100)
          depth={50} // Depth of area where stars should fit (default=50)
          count={5000} // Amount of stars (default=5000)
          factor={6} // Size factor (default=4)
          saturation={1} // Saturation 0-1 (default=0)
          fade // Faded dots (default=false)
        />
        <Ceramics />
      </Physics>
    </>
  );
}
