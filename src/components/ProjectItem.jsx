import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ProjectItem = ({
  title,
  description,
  image,
  sourceCode,
  projectLink,
  alt,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      className="relative flex items-center justify-center h-auto w-full shadow-xl shadow-cyan-700 rounded-xl p-4 group cursor-pointer"
      onClick={() => setShowDetails(!showDetails)}
    >
      <Image
        src={image}
        alt={alt}
        className={`rounded-xl transition-opacity duration-300 ${
          showDetails ? "opacity-20" : "opacity-100"
        }`}
      />

      <div
        className={`absolute top-[50%] mx-auto max-w-[80%] translate-y-[-50%] text-center transition-opacity duration-300 ${
          showDetails ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <h3 className="text-2xl tracking-wider">{title}</h3>
        <p
          className={`pb-4 font-bold pt-2 ${
            description.length > 200 ? "max-sm:text-[0.65rem]" : ""
          }`}
        >
          {description}
        </p>
        <div className="max-w-48 mx-auto">
          {projectLink && (
            <Link href={projectLink} target="_blank" rel="noopener noreferrer">
              <p className="max-w-fit mx-auto my-2 uppercase p-1 px-4 rounded bg-white text-gray-900 font-bold text-sm lg:text-lg">
                Access it
              </p>
            </Link>
          )}
          {sourceCode && (
            <Link href={sourceCode} target="_blank" rel="noopener noreferrer">
              <p className="max-w-fit mx-auto my-1 uppercase p-1 px-4 rounded bg-white text-gray-900 font-bold text-sm lg:text-lg">
                Source code
              </p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
