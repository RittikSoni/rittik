import { researchData } from "@/data/researchData";
import React from "react";
import ResearchItem from "./ResearchItem";
const ResearchPublications = () => {
  return (
    <div id="r&d" className="w-full">
      <div className="text-cyan-900 max-w-[1240px] mx-auto py-16 pz-2">
        <p className="text-xl tracking-widest uppercase pb-8 pl-2">
          Research & Publications
        </p>
        <p className="text-gray-500 text-sm tracking-widest pb-8 pl-2">
          Below are some of the Research & Publications I&apos;ve worked on :).
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {researchData.map((e) => {
            return (
              <ResearchItem
                key={e.id}
                title={e.title}
                description={e.description}
                image={e.image}
                accessLink={e.accessLink}
                alt={e.title}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResearchPublications;
