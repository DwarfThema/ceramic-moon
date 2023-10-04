import { Gltf } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as RAPIER from "@dimforge/rapier3d-compat";
import {
  CuboidCollider,
  RapierRigidBody,
  RigidBody,
  useRapier,
} from "@react-three/rapier";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Vector3 } from "three";

interface RabbitInfo {
  position: [number, number, number];
  model: string;
  key: number;
  rotationY: number; // Add rotationY to the RabbitInfo interface
}

export default function Rabbits({ ...props }) {
  const [rabbits, setRabbits] = useState<RabbitInfo[]>([]);

  const rabbitModels = ["/models/rabbit_bk.gltf", "/models/rabbit_wt.gltf"];
  const [generateTime, setGenerateTime] = useState(2000);

  useEffect(() => {
    const interval = setInterval(() => {
      const x = Math.random() * 20 - 10;
      const y = 10;
      const z = Math.random() * 20 - 10;
      const model = rabbitModels[rabbits.length % 2];
      const rotationY = Math.random() * 360;

      setRabbits((prev) => [
        ...prev,
        { position: [x, y, z], model, key: rabbits.length, rotationY },
      ]);

      if (generateTime >= 250) {
        setGenerateTime((prev) => prev - 50);
      }
    }, generateTime);

    return () => clearInterval(interval);
  }, [rabbits]);

  return (
    <>
      {rabbits.map((rabbit) => (
        <Rabbit
          key={rabbit.key}
          position={rabbit.position}
          model={rabbit.model}
          rotationY={rabbit.rotationY}
        />
      ))}
    </>
  );
}

interface RabbitProps {
  position: [number, number, number];
  model: string;
  rotationY: number;
}

function Rabbit({ position, model, rotationY }: RabbitProps) {
  const rabbitRigidRef = useRef<RapierRigidBody | null>(null);

  return (
    <RigidBody
      ref={rabbitRigidRef}
      position={position}
      colliders="cuboid"
      mass={10}
    >
      <Gltf
        src={model}
        position={[0, 0, 0]}
        rotation={[0, rotationY, 0]}
        scale={0.1}
        receiveShadow
        castShadow
      />
    </RigidBody>
  );
}
