import React from 'react';
import {
    AiOutlineMenu,
    AiOutlineClose,
    AiOutlineSearch,
    AiOutlineMail,
  } from "react-icons/ai";

import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { BsPersonLinesFill } from "react-icons/bs";

function About() {
  return (
    <div className='flex flex-col items-center justify-center text-center bg-[#1e293b] p-4 ml-[200px]'>
         <div className='pb-2 text-center font-inter'>
            <h4 className='text-4xl tracking-wider font-inter'>About Me</h4>
         </div>
         <p className="pl-10 text-xl tracking-wider font-inter">
        I am a Front End web developer working on over 2 years of experience.
        I love to take challenge and egger to deliver it within schedule.My
        expertise on Reactjs, Nextjs, Firebase, TypeScript, JavaScript, Tailwind etc. I have well experienced to convert
        website from Figma, Photoshop, Adobe XD file.
      </p>

      <div className='pt-20'>
        <p className='uppercase tracking-widest text-[#5651e5]'>
            {" "}
            Let's Connect
        </p>
        <div className='flex items-center justify-between my-3 w-full sm:w-[80%] gap-6'>
            <div className='p-4 duration-400 ease-in rounded-full shadow-lg cursor-pointer shadow-gray-400 hover:scale-105'>
                <FaLinkedinIn/>
            </div>
            <div className='p-4 duration-400 ease-in rounded-full shadow-lg cursor-pointer shadow-gray-400 hover:scale-105'>
                <FaGithub />
            </div>
            <div className='p-4 duration-400 ease-in rounded-full shadow-lg cursor-pointer shadow-gray-400 hover:scale-105'>
                <AiOutlineMail />
            </div>
            <div className='p-4 duration-400 ease-in rounded-full shadow-lg cursor-pointer shadow-gray-400 hover:scale-105'>
                <BsPersonLinesFill />
            </div>
        </div>
      </div>
    </div>
  )
}

export default About