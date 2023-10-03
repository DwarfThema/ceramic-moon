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
    }, 250);

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
  const SPEED = 2 as number;

  const rabbitRef = useRef(null);
  const rabbitRigidRef = useRef<RapierRigidBody | null>(null);
  const rapier = useRapier();

  const [jumping, setJumping] = useState(true);
  const frontVector = new Vector3();
  const direction = new Vector3();
  const sideVector = new Vector3();

  useFrame(() => {
    console.log(rabbitRef.current);

    const velocity = rabbitRigidRef?.current?.linvel();
    const Rigidposition =
      rabbitRigidRef?.current?.translation() as THREE.Vector3; /* 

    frontVector.set(0, 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED);
    rabbitRigidRef?.current?.setLinvel(
      {
        x: direction.x,
        y: velocity?.y as number,
        z: direction.z,
      },
      true
    ); */

    const world = rapier?.world;
    const newRay = new RAPIER.Ray(Rigidposition, { x: 0, y: -1, z: 0 });
    const ray = world?.castRay(newRay, 1.599, false);
    const grounded = ray && ray.collider && Math.abs(ray.toi) <= 1.7;

    /* if (grounded === null && jumping) {
      console.log("ininini");

      rabbitRigidRef?.current?.setLinvel({ x: 2, y: 5, z: 0 }, true);
      setJumping(false);
      setTimeout(() => setJumping(true), 5000);
    } */
  });

  return (
    <RigidBody
      ref={rabbitRigidRef}
      position={position}
      colliders="cuboid"
      mass={3}
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
