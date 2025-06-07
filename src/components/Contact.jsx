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
        <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-8 md:h-[15rem] lg:h-[15rem] h-[25rem] p-4">
          <div className="bg-white w-full h-[100%] rounded border-b-cyan-500 border-4 grid">
            <div className="grid justify-center items-center content-center pt-2">
              <MdMail size={30} />
            </div>
            <p className="tracking-widest uppercase font-bold text-black ">
              Mail
            </p>
            <hr className="border-cyan-400 border-2 w-12 mx-auto" />
            <Link href={mail}>
              <p className="text tracking-widest hover:text-cyan-700">
                kingrittiksoni@gmail.com
              </p>
            </Link>
          </div>
          <div className="bg-white w-full h-[100%] rounded border-b-cyan-500 border-4 grid">
            <div className="grid justify-center items-center content-center pt-2">
              <BsPeopleFill size={30} />
            </div>
            <p className="tracking-widest uppercase font-bold text-black ">
              Socials
            </p>
            <hr className="border-cyan-400 border-2 w-12 mx-auto" />
            <div className="flex justify-evenly">
              <Link href={youtube} className="hover:text-cyan-700" target="#">
                <BsYoutube size={25} />
              </Link>
              <Link href={discord} className="hover:text-cyan-700" target="#">
                <BsDiscord size={25} />
              </Link>
              <Link href={medium} className="hover:text-cyan-700" target="#">
                <FaMediumM size={25} />
              </Link>
              <Link href={linkedIn} className="hover:text-cyan-700" target="#">
                <FaLinkedinIn size={25} />
              </Link>
              <Link href={github} className="hover:text-cyan-700" target="#">
                <BsGithub size={25} />
              </Link>
              <Link
                href={googlePlay}
                className="hover:text-cyan-700"
                target="#"
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
