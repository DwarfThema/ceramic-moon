import { Physics } from "@react-three/rapier";
import { Ground } from "./ground";
import { Player } from "./player";
import Ocean from "./ocean";
import { useControls } from "leva";
import {
  BakeShadows,
  Cloud,
  Gltf,
  OrbitControls,
  SoftShadows,
  Stars,
} from "@react-three/drei";
import Ceramics from "./ceramics";
import { useEffect, useMemo, useRef } from "react";
import { PointLight, PointLightShadow, Vector2 } from "three";
import { vector2 } from "maath";

export default function MainScene() {
  return (
    <>
      <BakeShadows />
      <SoftShadows size={10} focus={0} samples={20} />
      <directionalLight
        castShadow
        position={[2.5, 8, 5]}
        intensity={1.5}
        shadow-mapSize={1024}
        shadow-bias={-0.001}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-10, 10, -10, 10, 0.1, 50]}
        />
      </directionalLight>
      <Physics gravity={[0, -10, 0]}>
        <Player pos={{ x: 0, y: 2.5, z: 0 }} rot={{ x: 0, y: 0, z: 0 }} />
        <Ground>
          <mesh
            position={[0, 1, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={10}
            receiveShadow
          >
            <planeGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"white"} />
          </mesh>
        </Ground>
      </Physics>
      <Ocean />
      <Gltf src="/models/moon.gltf" position={[0, 60, -870]} scale={110} />
      <Stars
        radius={100} // Radius of the inner sphere (default=100)
        depth={50} // Depth of area where stars should fit (default=50)
        count={5000} // Amount of stars (default=5000)
        factor={6} // Size factor (default=4)
        saturation={1} // Saturation 0-1 (default=0)
        fade // Faded dots (default=false)
      />
      <Ceramics />
    </>
  );
}
