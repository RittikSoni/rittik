import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ResearchItem = ({ title, description, image, accessLink, alt }) => {
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
        } group-hover:opacity-20`}
      />

      <div
        className={`absolute top-[50%] mx-auto max-w-[80%] translate-y-[-50%] text-center transition-opacity duration-300
        ${showDetails ? "opacity-100" : "opacity-0 pointer-events-none"}
        group-hover:opacity-100 group-hover:pointer-events-auto`}
      >
        <h3 className="text-2xl tracking-wider">{title}</h3>
        <p
          className={`pb-4 font-bold pt-2 ${
            description.length > 200 ? "max-sm:text-[0.65rem]" : ""
          }`}
        >
          {description}
        </p>

        {accessLink && (
          <Link href={accessLink} target="_blank" rel="noopener noreferrer">
            <p className="max-w-fit mx-auto my-2 uppercase p-1 px-4 rounded bg-white text-gray-900 font-bold text-sm lg:text-lg cursor-pointer">
              Access it
            </p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ResearchItem;
