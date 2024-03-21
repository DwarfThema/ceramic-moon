import { useProgress } from "@react-three/drei";
import Image from "next/image";
import { useEffect, useState } from "react";
import Suppoerter from "../../public/textures/Supporter.png";
import Logo from "../../public/Logo.svg";
import Link from "next/link";
import { isMobile } from "react-device-detect";

export default function LoadingScreen() {
  const { progress, loaded } = useProgress();
  const [loading, setLoading] = useState(false);
  const [transitionEnd, setTransitionEnd] = useState(false);

  const [explain, setExplain] = useState(false);
  const [explainEnd, setExplainEnd] = useState(false);

  useEffect(() => {
    if (loaded >= 28) {
      setLoading(true);
      setTimeout(() => {
        setTransitionEnd(true);
        setExplain(true);
      }, 5500);
    }
  }, [progress, loaded]);

  useEffect(() => {
    if (explain) {
      setTimeout(() => {
        setExplain(false);
      }, 2500);
      setTimeout(() => {
        setExplainEnd(true);
      }, 5000);
    }
  }, [explain]);
  return (
    <>
      <div
        className={clsstail(
          "touch-none select-none transition-opacity ease-in-out duration-[5000ms] absolute bg-[#252525] w-screen h-screen flex flex-col justify-center items-center text-[#DDDDDD] ",
          loading ? "opacity-0" : "opacity-100",
          transitionEnd ? "z-0 hidden" : "z-30"
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

      {isMobile ? (
        <div
          className={clsstail(
            "touch-none select-none transition-opacity ease-in-out duration-[2000ms] absolute w-screen h-screen flex flex-col justify-center items-center text-[#ffffff] ",
            explain ? "opacity-100" : "opacity-0",
            explainEnd ? "z-0 hidden" : "z-30"
          )}
        >
          스크린을 터치해 화면을돌려 향유하세요 <br />
          Touch the screen and turn it around
        </div>
      ) : (
        <div
          className={clsstail(
            "touch-none select-none transition-opacity ease-in-out duration-[2000ms] absolute w-screen h-screen flex flex-col justify-center items-center text-[#ffffff] ",
            explain ? "opacity-100" : "opacity-0",
            explainEnd ? "z-0 hidden" : "z-30"
          )}
        >
          WASD키와 마우스를 이용해 향유하세요 <br />
          Use WASD key and mouse to enjoy
        </div>
      )}
    </>
  );
}

function clsstail(...classnames: string[]) {
  return classnames.join(" ");
}
// [1,2,3] = join("/") => "1/2/3"
