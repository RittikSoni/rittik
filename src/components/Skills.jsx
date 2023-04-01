import React from "react";
import Image from "next/image";
import Skill from "./Skill";
import { listOfSkills } from "@/data/skillsData";
const Skills = () => {
  return (
    <div id="skills" className=" text-cyan-900 w-full p-2 lg:h-screen">
      <div className="max-w-[1240px] mx-auto flex flex-col justify-center h-full">
        <p className="text-xl tracking-widest uppercase">Skills</p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
          {listOfSkills.map((e) => (
            <Skill
              key={e.id}
              imgSrc={e.imgPath}
              imgAlt={e.skillName}
              skillName={e.skillName}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
