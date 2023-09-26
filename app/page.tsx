"use client";

import {
  Effects,
  Environment,
  KeyboardControls,
  Stats,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import MainScene from "./src/mainScene";
import { Suspense } from "react";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { ACESFilmicToneMapping, sRGBEncoding } from "three";

export default function Home() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-between">
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "w", "W"] },
          { name: "backward", keys: ["ArrowDown", "s", "S"] },
          { name: "left", keys: ["ArrowLeft", "a", "A"] },
          { name: "right", keys: ["ArrowRight", "d", "D"] },
          { name: "jump", keys: ["Space"] },
          { name: "sit", keys: ["v"] },
        ]}
      >
        <Stats />
        <Canvas
          shadows
          camera={{ fov: 40 }}
          onCreated={({ gl }) => {
            gl.toneMapping = ACESFilmicToneMapping;
            gl.toneMappingExposure = 0.9;
          }}
        >
          <Suspense fallback={null}>
            <Environment files={"/textures/hdr.hdr"} background blur={0.4} />
            <fog attach="fog" args={["#202030", 10, 5000]} />
            <MainScene />
            <EffectComposer>
              <Vignette eskil={false} offset={0.05} darkness={0.7} />
              <Bloom
                luminanceThreshold={0.5}
                luminanceSmoothing={3}
                intensity={2}
              />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </KeyboardControls>
    </main>
  );
}
