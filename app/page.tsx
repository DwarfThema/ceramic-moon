"use client";

import { Environment, Html, KeyboardControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import MainScene from "./src/mainScene";
import { Suspense } from "react";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { ACESFilmicToneMapping, sRGBEncoding } from "three";
import LoadingScreen from "./src/loadingScreen";
import { isMobile } from "react-device-detect";

export default function Home() {
  return (
    <main className="h-screen w-screen absolute">
      {isMobile ? null : (
        <div className="h-full w-full select-none touch-none text-center flex justify-center items-center absolute text-white z-20">
          <div>•</div>
        </div>
      )}

      <LoadingScreen />
      {isMobile ? (
        <Canvas
          shadows
          className="z-10 h-screen w-screen"
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
          <EffectComposer>
            <Vignette eskil={false} offset={0.05} darkness={0.7} />
            <Bloom
              luminanceThreshold={0.5}
              luminanceSmoothing={3}
              intensity={2}
            />
          </EffectComposer>
        </Canvas>
      ) : (
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
          <Canvas
            shadows
            className="z-10 h-screen w-screen"
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
            <EffectComposer>
              <Vignette eskil={false} offset={0.05} darkness={0.7} />
              <Bloom
                luminanceThreshold={0.5}
                luminanceSmoothing={3}
                intensity={2}
              />
            </EffectComposer>
          </Canvas>
        </KeyboardControls>
      )}
    </main>
  );
}
