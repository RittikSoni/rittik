import React from "react";
import Image from "next/image";

const Skill = ({ skillName, imgSrc, imgAlt }) => {
  return (
    <div className="p-6 shadow-xl shadow-cyan-300 rounded-xl hover:scale-105 ease-in duration-300">
      <div className="grid grid-cols-2 gap-4 justify-center items-center">
        <div className="m-auto">
          <Image src={imgSrc} height="50" width="50" alt={imgAlt} />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h3>{skillName}</h3>
        </div>
      </div>
    </div>
  );
};

export default Skill;
