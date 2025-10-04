import React from "react";
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
  return (
    <div className="relative flex items-center justify-center h-auto w-full shadow-xl shadow-cyan-700 rounded-xl p-4 group hover:bg-linear-to-b from-cyan-300 to-cyan-700">
      <Image
        src={image}
        alt={alt}
        className="rounded-xl group-hover:opacity-20"
      />

      <div className="hidden group-hover:block absolute top-[50%] mx-auto max-w-[80%] translate-y-[-50%]">
        <h3 className="text-2xl tracking-wider text-center">{title}</h3>
        <p
          className={
            description.length > "200"
              ? "pb-4 font-bold pt-2 text-center ${description.length} max-sm:text-[0.65rem]"
              : "pb-4 font-bold pt-2 text-center ${description.length}"
          }
        >
          {description}
        </p>
        <div className="max-w-48 mx-auto">
          {projectLink != null ? (
            <Link href={projectLink} target="_blank" rel="noopener noreferrer">
              <p className="max-w-fit mx-auto my-2 lg:my-2 md:my-2 uppercase p-1 px-4 text-center rounded bg-white text-gray-900 font-bold text-sm lg:text-lg md:text-lg cursor-pointer">
                Access it
              </p>
            </Link>
          ) : null}
          {sourceCode ? (
            <Link href={sourceCode} target="_blank" rel="noopener noreferrer">
              <p className="max-w-fit mx-auto my-1 lg:my-2 md:my-2 uppercase p-1 px-4 text-center rounded bg-white text-gray-900 font-bold text-sm lg:text-lg md:text-lg cursor-pointer">
                Source code
              </p>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
