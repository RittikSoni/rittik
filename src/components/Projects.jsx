import { projectData } from "@/data/projectData";
import React from "react";
import ProjectItem from "./ProjectItem";
const Projects = () => {
  return (
    <div id="projects" className="w-full">
      <div className="text-cyan-900 max-w-[1240px] mx-auto py-16 pz-2">
        <p className="text-xl tracking-widest uppercase pb-8 pl-2">Projects</p>
        <p className="text-gray-500 text-sm tracking-widest pb-8 pl-2">
          Below are some of the projects I&apos;ve worked on for fun :).
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {projectData.map((e) => {
            return (
              <ProjectItem
                key={e.id}
                title={e.title}
                description={e.description}
                image={e.image}
                sourceCode={e?.sourceCode}
                projectLink={e.projectLink}
                alt={e.title}
              />
            );
          })}
        </div>
        <p className="text-gray-500 text-sm tracking-widest pb-8 pt-8 pl-2">
          For more projects, feel free to visit my GitHub, Playstore, LinkedIn,
          or other platforms where I share my projects.
        </p>
      </div>
    </div>
  );
};

export default Projects;
