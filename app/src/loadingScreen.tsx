import { Html, useProgress } from "@react-three/drei";

export default function LoadingScreen() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="absolute top-1/2 left-1/2">{progress} % loaded</div>
    </Html>
  );
}
