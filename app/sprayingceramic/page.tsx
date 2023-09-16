"use client";

import { Canvas, extend, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { Mesh } from "three";
import Ocean from "../src/ocean";
import { Environment, OrbitControls, Sky } from "@react-three/drei";

export default function SprayingCeramic() {
  return (
    <main style={{ height: "100vh", width: "100%" }} className="bg-black">
      <Canvas>
        <Environment
          files={"/textures/hdr.hdr"}
          background
          ground={{
            height: -100,
            radius: 10,
            scale: 0,
          }}
        />

        <Suspense fallback={null}>
          <Ocean />
          <Box />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </main>
  );
}

function Box() {
  const ref = useRef<Mesh>(null);
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.position.y = 10 + Math.sin(state.clock.elapsedTime) * 20;
      ref.current.rotation.x =
        ref.current.rotation.y =
        ref.current.rotation.z +=
          delta;
    }
  });
  return (
    <mesh ref={ref} scale={20}>
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  );
}
