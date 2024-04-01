import Link from "next/link";
import React from "react";
import { ThemeToggle } from "./ThemeToogle";
type props = {};
const Navbar = (props: props) => {
  return (
    <nav className=" bg-white dark:bg-gray-950 h-full py-2 border-b border-zinc-300">
      <div className="flex items-center justify-center py-4 gap-2 px-8 mx-auto sm:justify-between max-w-7xl">
        <Link href="/gallery" className="items-center gap-2 flex">
          <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white">
            Smart Education
          </p>
        </Link>
        <div className="flex gap-6 items-center">
          <Link href="/create-course">Create course</Link>
          <Link href="/chatbot">Chatbot</Link>
          <Link href="/forum">forum</Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
