import { useTexture } from "@react-three/drei";
import { extend, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { PlaneGeometry, RepeatWrapping, TextureLoader, Vector3 } from "three";
import { Water } from "three-stdlib";

extend({ Water });
declare global {
  namespace JSX {
    interface IntrinsicElements {
      water: any;
    }
  }
}

export default function Ocean() {
  const ref = useRef<Water>(null);
  const gl = useThree((state) => state.gl) as any;
  const waterNormals = useTexture("/textures/waternormals.jpeg");
  waterNormals.wrapS = waterNormals.wrapT = RepeatWrapping;
  const geom = useMemo(() => new PlaneGeometry(10000, 10000), []);
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: false,
      format: gl.encoding,
    }),
    [waterNormals]
  );
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.material.uniforms.time.value += delta;
    }
  });
  return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />;
}
