import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMail, AiOutlineMenu } from "react-icons/ai";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { BsGooglePlay } from "react-icons/bs";
import { github, googlePlay, linkedIn, mail } from "@/data/socialLinks";

function Navbar() {
  const [nav, setNav] = useState(false);
  const [shadow, setShadow] = useState(false);
  const handleShadow = () => {
    if (window.pageYOffset >= 90) {
      setShadow(true);
    } else {
      setShadow(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleShadow, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleShadow, { passive: true });
    };
  }, []);
  function handleNav() {
    setNav(!nav);
  }
  return (
    <div
      className={
        shadow
          ? "w-full fixed h-15 shadow-xl shadow-cyan-700 z-[100] bg-black bg-opacity-25 text-white"
          : "w-full fixed h-15 z-[100]"
      }
    >
      <div className="flex justify-between items-center w-full h-full  p-2 2xl:p-16 backdrop-blur-md">
        <Link href="/#home">
          <Image
            src="/assets/rittik_logo.png"
            alt="rittik"
            width="50"
            height="20"
          />
        </Link>
        <ul className="hidden md:flex  md:mr-5 lg:mr-5">
          <Link href="/#home">
            <li className="ml-10 text-sm uppercase hover:border-b">Home</li>
          </Link>
          <Link href="/#about">
            <li className="ml-10 text-sm uppercase hover:border-b">About</li>
          </Link>
          <Link href="/#skills">
            <li className="ml-10 text-sm uppercase hover:border-b">Skills</li>
          </Link>
          <Link href="/#projects">
            <li className="ml-10 text-sm uppercase hover:border-b">Projects</li>
          </Link>
          <Link href="/#contact">
            <li className="ml-10 text-sm uppercase hover:border-b">Contact</li>
          </Link>
        </ul>
        <div onClick={handleNav} className="md:hidden pr-2">
          <AiOutlineMenu size={25} />
        </div>
      </div>
      <div
        className={
          nav ? "md:hidden fixed left-0 top-0 w-full h-screen bg-black/70" : ""
        }
      >
        <div
          className={
            nav
              ? "text-cyan-900 fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-[#ecf0f3] p-10 ease-in duration-500"
              : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
          }
        >
          <div>
            <div className="w-full flex justify-between items-center">
              <Image
                src="/assets/rittik_logo.png"
                width="100"
                height="50"
                alt="rittik soni"
                className="rounded-full shadow-lg shadow-gray-400"
              />
              <div
                onClick={handleNav}
                className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer"
              >
                <AiOutlineClose />
              </div>
            </div>
            <div className="my-4 border-b border-gray-400 ">
              <p className="w-[85%] md:w-[90%] py-4">
                Software Engineer | Lifelong learner
              </p>
            </div>
          </div>
          <div className="py-4 flex flex-col w-full">
            <ul className="uppercase">
              <Link href="/#home" onClick={() => setNav(false)}>
                <li className="py-4 text-sm">Home</li>
              </Link>
              <Link href="/#about" onClick={() => setNav(false)}>
                <li className="py-4 text-sm">About</li>
              </Link>
              <Link href="/#skills" onClick={() => setNav(false)}>
                <li className="py-4 text-sm">Skills</li>
              </Link>
              <Link href="/#projects" onClick={() => setNav(false)}>
                <li className="py-4 text-sm">Projects</li>
              </Link>
              <Link href="/#contact" onClick={() => setNav(false)}>
                <li className="py-4 text-sm">Contact</li>
              </Link>
            </ul>
            <div className="pt-10">
              <p className="uppercase tracking-widest">Let&apos;s Connect</p>
              <div className="flex items-center justify-between my-4 w-full sm:w-[80%]">
                <Link href={linkedIn} onClick={() => setNav(false)}>
                  <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300">
                    <FaLinkedinIn />
                  </div>
                </Link>
                <Link href={github} onClick={() => setNav(false)}>
                  <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300">
                    <FaGithub />
                  </div>
                </Link>
                <Link href={mail} onClick={() => setNav(false)}>
                  <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300">
                    <AiOutlineMail />
                  </div>
                </Link>
                <Link href={googlePlay} onClick={() => setNav(false)}>
                  <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300">
                    <BsGooglePlay />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
