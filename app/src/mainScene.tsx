import { Physics } from "@react-three/rapier";
import { Ground } from "./ground";
import { Player } from "./player";

export default function MainScene() {
  console.log(-Math.PI / 2);

  return (
    <>
      <pointLight position={[0, 25, -5]} intensity={2000} />
      <Physics gravity={[0, -10, 0]}>
        <Ground>
          <mesh
            position={[0, 0, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <planeGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"red"} />
          </mesh>
        </Ground>
        <Player pos={{ x: 0, y: 1.5, z: 0 }} rot={{ x: 0, y: 0, z: 0 }} />
      </Physics>
    </>
  );
}
