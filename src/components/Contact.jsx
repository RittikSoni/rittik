import React from "react";
import Link from "next/link";
import { FaRegPaperPlane } from "react-icons/fa";
import { FaLinkedinIn, FaMediumM } from "react-icons/fa";
import {
  BsGithub,
  BsGooglePlay,
  BsPeopleFill,
  BsYoutube,
  BsDiscord,
} from "react-icons/bs";
import { MdMail } from "react-icons/md";
import {
  discord,
  github,
  googlePlay,
  linkedIn,
  mail,
  medium,
  youtube,
} from "@/data/socialLinks";

const Contact = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div id="contact" className="w-full text-center bg-black">
      <div className="text-cyan-500 max-w-[1240px] mx-auto py-16 pz-2 ">
        <div className="grid justify-center items-center content-center">
          <FaRegPaperPlane size={40} />
        </div>
        <p className="text-3xl tracking-widest pb-12 pt-4">Connect with me!</p>
        <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-8 md:h-60 lg:h-60 h-100 p-4">
          <div className="bg-white w-full h-full rounded border-b-cyan-500 border-4 grid">
            <div className="grid justify-center items-center content-center pt-2">
              <MdMail size={30} />
            </div>
            <p className="tracking-widest uppercase font-bold text-black ">
              Mail
            </p>
            <hr className="border-cyan-400 border-2 w-12 mx-auto" />
            <Link href={mail}
              rel="noopener noreferrer"
              title="Rittik Soni Mail"
              aria-label="Rittik Soni Mail"
            >
              <p className="text tracking-widest hover:text-cyan-700">
                kingrittiksoni@gmail.com
              </p>
            </Link>
          </div>
          <div className="bg-white w-full h-full rounded border-b-cyan-500 border-4 grid">
            <div className="grid justify-center items-center content-center pt-2">
              <BsPeopleFill size={30} />
            </div>
            <p className="tracking-widest uppercase font-bold text-black ">
              Socials
            </p>
            <hr className="border-cyan-400 border-2 w-12 mx-auto" />
            <div className="flex justify-evenly">
              <Link href={youtube} className="hover:text-cyan-700" target="#"
                rel="noopener noreferrer"
                title="King Rittik YouTube Channel"
                aria-label="King Rittik YouTube Channel"
              > 
                <BsYoutube size={25} />
              </Link>
              <Link href={discord} className="hover:text-cyan-700" target="#"
                rel="noopener noreferrer"
                title="King Rittik Discord Server"
                aria-label="King Rittik Discord Server"
              >
                <BsDiscord size={25} />
              </Link>
              <Link href={medium} className="hover:text-cyan-700" target="#"
                rel="noopener noreferrer"
                title="King Rittik Medium"
                aria-label="King Rittik Medium"
              >
                <FaMediumM size={25} />
              </Link>
              <Link href={linkedIn} className="hover:text-cyan-700" target="#"
                rel="noopener noreferrer"
                title="King Rittik LinkedIn"
                aria-label="King Rittik LinkedIn"
              >
                <FaLinkedinIn size={25} />
              </Link>
              <Link href={github} className="hover:text-cyan-700" target="#"
                rel="noopener noreferrer"
                title="King Rittik GitHub"
                aria-label="King Rittik GitHub"
              >
                <BsGithub size={25} />
              </Link>
              <Link
                href={googlePlay}
                className="hover:text-cyan-700"
                target="#"
                rel="noopener noreferrer"
                title="King Rittik Google Play"
                aria-label="King Rittik Google Play"
              >
                <BsGooglePlay size={25} />
              </Link>
            </div>
          </div>
        </div>
        <div className="text-gray-500 mt-12">© {year} Rittik Soni</div>
      </div>
    </div>
  );
};

export default Contact;
