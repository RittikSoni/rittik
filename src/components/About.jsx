import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <div
      id="about"
      className="w-full md:min-h-screen p-2 flex items-center py-16 bg-linear-to-b from-black to-gray-800"
    >
      <div className="max-w-[1240px] m-auto md:grid grid-cols-3 gap-8 px-4">
        <div className="col-span-2">
          <p className="text-xl tracking-widest uppercase text-white font-extrabold">About</p>
          <h2 className="py-4 text-white">
            Hey there! I&apos;m Rittik, a software engineer with a passion for
            exploring new technologies and creating innovative projects.
          </h2>
          <div className="text-gray-400" style={{ lineHeight: 1.8 }}>
            <p className="py-2">
              During my college time, I wasn&apos;t just coding – I was building.
              One of my ambitious projects was a complex e-commerce platform
              designed to handle over a million users, with real-time features
              like order review, advanced search, and filtering – similar in scale
              to Amazon. This experience ignited my passion for crafting efficient
              and user-friendly software that truly empowers users.
            </p>
            <p className="py-2">
              In addition to my love of coding, I have many other interests that
              keep me busy. I love playing physical games like soccer, badminton,
              etc whenever I have the chance. I&apos;m also an avid traveler and
              have been fortunate enough to visit many incredible places around
              the world. These experiences have taught me the value of
              open-mindedness and adaptability, which are qualities that I apply
              to my work as a software developer.
            </p>
            <p className="py-2">
              Over the course of my career, I&apos;ve worked with a wide range of
              technologies, including Python, Node.js, React.js, Flutter, and
              Google Cloud, etc. I&apos;ve developed everything from mobile apps
              to web-based solutions, and I&apos;m always looking for new
              challenges that push me out of my comfort zone.
            </p>
            <p className="py-2">
              As a lifelong learner, I&apos;m committed to staying up-to-date with
              the latest trends and advancements in the tech industry. I&apos;m
              always exploring new technologies and taking online courses to
              expand my skillset. I believe that the best way to stay competitive
              in this field is to be curious and hungry for knowledge.
            </p>
          </div>
        </div>
        
        <div className="m-auto shadow-xl shadow-gray-500 rounded-xl flex items-center justify-center p-4 hover:scale-105 ease-in duration-300 w-full h-auto">
          <Image
            src="/assets/rs_bg.jpg"
            height="600"
            width="400"
            alt="rs rittik soni"
            className="rounded-xl"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
