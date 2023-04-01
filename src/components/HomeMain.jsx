import Image from "next/image";
import React from "react";

const HomeMain = () => {
  return (
    <>
      <Image
        src="/assets/Rittik_bg.jpg"
        fill
        className="-z-10 backdrop-blur-md h-screen"
        alt="rs"
      />
      <div id="home" className="w-full h-screen text-center">
        <div className="max-w-[1240px] w-full h-full mx-auto p-2 justify-center flex items-center">
          <div>
            <div className="flex justify-center items-center py-4">
              <Image
                src="/assets/rittik.jpg"
                height="190"
                width="190"
                alt="rittik soni"
                className="rounded-full shadow-lg shadow-gray-500"
              />
            </div>
            <h1 className=" text-white py-4 max-sm:text-[85px] text-[104px] uppercase tracking-[0.8rem] leading-[6.25rem]">
              Rittik Soni
            </h1>
            <p className="uppercase text-sm tracking-widest text-gray-50 py-2">
              software engineer | lifelong learner
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeMain;
