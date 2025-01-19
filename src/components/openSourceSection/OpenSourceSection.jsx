import React from "react";
import OpenSourceItem from "./OpenSourceItem";
import { openSourceData } from "@/data/openSourceData";
import Link from "next/link";

const OpenSourceContributions = () => {
  return (
    <div id="open-source" className="w-full">
      <div className="text-cyan-900 max-w-[1240px] mx-auto py-16 pz-2">
        <p className="text-xl tracking-widest uppercase pb-8 pl-2">
          Built for Developers & Open-Source Contributions
        </p>
        <p className="text-gray-500 text-sm tracking-widest pb-8 pl-2">
          Explore tools, libraries, and open-source projects crafted to empower
          the developer community :)
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {openSourceData.map((e) => {
            return <OpenSourceItem key={e.id} OpenSourceItem={e} />;
          })}
        </div>
        <div className="my-10 mx-2">
          <Link
            href={"https://github.com/RittikSoni"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="shadow-lg shadow-cyan-400 mx-auto my-2 lg:my-2 md:my-2 uppercase p-1 px-4 text-center rounded-xl bg-cyan-600 text-white font-bold text-sm lg:text-lg md:text-lg cursor-pointer">
              More
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OpenSourceContributions;
