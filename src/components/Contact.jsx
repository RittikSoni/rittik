import React from "react";
import Link from "next/link";
import { FaRegPaperPlane } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { BsGithub, BsGooglePlay, BsPeopleFill } from "react-icons/bs";
import { MdMail } from "react-icons/md";
import { github, googlePlay, linkedIn, mail } from "@/data/socialLinks";

const Contact = () => {
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
              <Link href={linkedIn} className="hover:text-cyan-700">
                <FaLinkedinIn size={25} />
              </Link>
              <Link href={github} className="hover:text-cyan-700">
                <BsGithub size={25} />
              </Link>
              <Link href={googlePlay} className="hover:text-cyan-700">
                <BsGooglePlay size={25} />
              </Link>
            </div>
          </div>
        </div>
        <div className="text-gray-500 mt-12">© 2023 Rittik Soni</div>
      </div>
    </div>
  );
};

export default Contact;
