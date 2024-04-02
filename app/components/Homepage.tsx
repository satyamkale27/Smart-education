"use client";
import React from "react";
import Homeimage from "@/public/homepage1.png";
import Homeeimage from "@/public/hackathon_2_new-removebg-preview.png";
import Chatbotimage from "@/public/chatbot.jpeg";
import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "./AuthWrapper";

const Homepage = () => {
  const { data } = useAuthContext();
  return (
    <div>
      <div className="border-white relative z-0 border-t">
        <Image src={Homeimage} alt="home" className="w-full h-90" />
        {data?.role === "teacher" ? (
          <Link
            href="/create-course"
            className="p-3 absolute top-1/2 rounded-xl  px-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500"
          >
            Create course
          </Link>
        ) : (
          <Link
            href="/courses"
            className="p-3 absolute top-1/2 rounded-xl px-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500"
          >
            View course
          </Link>
        )}
      </div>

      <div className="border-white relative z-0 border-t-2">
        <Image src={Homeeimage} alt="home" className="w-full h-90 " />
        <Link
          href="/forum"
          className="p-3 absolute top-1/2 rounded-xl px-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500"
        >
          Forum
        </Link>
      </div>
      <div className="border-white border-t-2">
        <Image src={Chatbotimage} alt="home" className="w-full h-90 " />
      </div>
    </div>
  );
};

export default Homepage;
