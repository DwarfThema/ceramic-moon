import { useProgress } from "@react-three/drei";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const { progress } = useProgress();
  const [loading, setLoading] = useState(false);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (progress >= 100) {
      setLoading(true);
    }
  }, [progress]);

  return (
    <div
      className={clsstail(
        "transition-opacity ease-in-out duration-[5000ms] absolute bg-[#252525] w-screen h-screen flex flex-col justify-center items-center z-20 text-[#DDDDDD] ",
        loading ? "opacity-0" : "opacity-100"
      )}
    >
      <div className="xl:pt-36 pt-64">LOADING</div>
      <div className="font-extrabold mb-5">{Math.floor(progress)}%</div>
      <div className="xl:w-[23%] w-[55%] h-[50%]  bg-no-repeat bg-contain bg-[url('/Logo.svg')]" />
    </div>
  );
}

function clsstail(...classnames: string[]) {
  return classnames.join(" ");
}
// [1,2,3] = join("/") => "1/2/3"
