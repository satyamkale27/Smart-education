"use client";
import React from "react";
import Homeimage from "@/public/homepage1.png";
import Homeeimage from "@/public/hackathon_2_new-removebg-preview.png";
import Image from "next/image";
import { useTheme } from "next-themes";

const homepage = () => {
  const { theme } = useTheme();
  return (
    <div className=" flex justify-center w-full items-center">
      <div className={`${theme == "dark" ? "w-[90%]" : "w-[100%]"} `}>
        <div className="w-full">
          <Image src={Homeimage} alt="home" className="w-auto h-3/4" />
        </div>
        <div className="w-full">
          <Image src={Homeeimage} alt="home" className="w-auto mt-auto" />
        </div>
      </div>
    </div>
  );
};

export default homepage;
