import React from "react";
import Homeimage from "@/public/homepage1.png";
import Homeeimage from "@/public/hackathon_2_new-removebg-preview.png";
import Image from "next/image";

const homepage = () => {
  return (
    <div>
      <div>
        <Image src={Homeimage} alt="home" className="w-auto h-3/4" />
      </div>
      <div>
        <Image src={Homeeimage} alt="home" className="w-auto mt-auto" />
      </div>
    </div>
  );
};

export default homepage;
