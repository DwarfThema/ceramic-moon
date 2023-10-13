import { useProgress } from "@react-three/drei";
import Image from "next/image";
import { useEffect, useState } from "react";
import Suppoerter from "../../public/textures/Supporter.png";
import Logo from "../../public/Logo.svg";
import Link from "next/link";

export default function LoadingScreen() {
  const { progress, loaded } = useProgress();
  const [loading, setLoading] = useState(false);
  const [transitionEnd, setTransitionEnd] = useState(false);

  useEffect(() => {
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
      <div className="xl:pt-36 pt-[20%]">LOADING</div>
      <div className="font-extrabold mb-5">
        {Math.floor((loaded / 28) * 100)}%
      </div>
      <Image src={Logo} alt="logo" className="md:w-[23%] w-[43%]" />
      <Link
        href="https://www.vivlepark.com"
        className="md:w-[30%] mt-5 w-[80%]"
        target="_blank"
      >
        <Image src={Suppoerter} alt="support" />
      </Link>
    </div>
  );
}

function clsstail(...classnames: string[]) {
  return classnames.join(" ");
}
// [1,2,3] = join("/") => "1/2/3"
