import { useProgress } from "@react-three/drei";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const { progress, loaded } = useProgress();
  const [loading, setLoading] = useState(false);
  const [transitionEnd, setTransitionEnd] = useState(false);

  useEffect(() => {
    console.log(loaded);
    if (loaded >= 28) {
      setLoading(true);
      setTimeout(() => {
        setTransitionEnd(true);
      }, 5500);
    }
  }, [progress, loaded]);

  return (
    <div
      className={clsstail(
        "transition-opacity ease-in-out duration-[5000ms] absolute bg-[#252525] w-screen h-screen flex flex-col justify-center items-center text-[#DDDDDD] ",
        loading ? "opacity-0" : "opacity-100",
        transitionEnd ? "z-0 hidden" : "z-20"
      )}
    >
      <div className="xl:pt-36 pt-[50%]">LOADING</div>
      <div className="font-extrabold mb-5">
        {Math.floor((loaded / 28) * 100)}%
      </div>
      <div className="xl:w-[23%] w-[43%] h-[50%]  bg-no-repeat bg-contain bg-[url('/Logo.svg')]" />
    </div>
  );
}

function clsstail(...classnames: string[]) {
  return classnames.join(" ");
}
// [1,2,3] = join("/") => "1/2/3"
