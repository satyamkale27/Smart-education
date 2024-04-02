"use client";
import Link from "next/link";
import React, { useState } from "react";
import { ThemeToggle } from "../../components/ThemeToogle";
import { useAuthContext } from "../components/AuthWrapper";
import Cookies from "js-cookie";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { RiMenu3Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const { data } = useAuthContext();
  const router = useRouter();
  const [toggle, setToggle] = useState(false);

  const logout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    router.push("/login");
    router.refresh();
    toast.success("Log out Successfully!");
  };

  const toggleoff = () => {
    setToggle(false);
  };

  return (
    <>
      {toggle && (
        <div
          className={`fixed top-0 duration-1000 transition ease-in-out w-screen h-screen z-20 bg-[#0D0D0D] ${
            toggle ? "left-0" : "-left-[1000px]"
          }`}
        >
          <div
            className=" w-full flex justify-center p-3 items-center sm:hidden h-[80vh]"
            id="navbar-default"
          >
            <ul className="font-medium light:text-white w-full flex flex-col gap-4 p-4  mt-4 rounded-lg bg-gray-50dark:border-gray-700">
              <li className="pb-2 mb-2 flex justify-between border-b border-white items-center">
                <div className="flex items-center text-white gap-2">
                  <div>
                    <img
                      src={data?.dp}
                      className="w-[50px] h-[50px] rounded-2xl"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div>{data?.fullname}</div>
                  </div>
                </div>
                <div
                  onClick={() => logout()}
                  className="text-xl py-3 flex items-center gap-2 text-red-600"
                >
                  <FiLogOut className="text-4xl" />
                </div>
              </li>
              <li className="py-2">
                {data?.role == "teacher" ? (
                  <Link
                    onClick={toggleoff}
                    href="/create-course"
                    className="block  pl-3 light:text-white text-white  rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 "
                    aria-current="page"
                  >
                    Create Course
                  </Link>
                ) : (
                  <Link
                    href="/courses"
                    className="block  pl-3 light:text-white text-white  rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 "
                    aria-current="page"
                  >
                    View Courses
                  </Link>
                )}
              </li>
              <li className="py-2">
                {data?.role == "teacher" ? (
                  <Link
                    onClick={toggleoff}
                    href="/my-courses/"
                    className="block  pl-3 light:text-white text-white  rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 "
                  >
                    My Courses
                  </Link>
                ) : (
                  <Link
                    href="/chat-bot"
                    className="block  pl-3 light:text-white text-white  rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 "
                  >
                    Chatbot
                  </Link>
                )}
              </li>
              <li className="py-2">
                <Link
                  href="/forum"
                  className="block  pl-3 light:text-white text-white  rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 "
                >
                  forum
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
      <nav className=" bg-white dark:bg-gray-950 h-full py-2 border-b border-zinc-300">
        <div className="flex justify-between items-center mx-auto py-4 gap-4 px-4 sm:px-8">
          <div>
            <div className="items-center gap-2 flex">
              <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white">
                Smart Education
              </p>
            </div>
          </div>
          <div className="flex pn:max-sm:hidden items-center gap-7">
            {data?.role == "teacher" ? (
              <Link href="/create-course">Create Course</Link>
            ) : (
              <Link href="/courses">View Courses</Link>
            )}

            {data?.role == "teacher" ? (
              <Link href="/my-courses/">My Courses</Link>
            ) : (
              <Link href="/chat-bot">Chatbot</Link>
            )}

            <Link href="/forum">forum</Link>
          </div>
          <div className="flex justify-center items-center gap-4">
            <ThemeToggle />

            <img
              src={data?.dp}
              className="rounded-full pn:max-sm:hidden w-[50px] h-[50px] object-fill"
            />
            <div className="sm:hidden z-50 text-3xl">
              {toggle ? (
                <IoMdClose onClick={() => setToggle(!toggle)} />
              ) : (
                <RiMenu3Fill onClick={() => setToggle(!toggle)} />
              )}
            </div>
            <div
              className="text-2xl pn:max-sm:hidden hover:text-red-800"
              onClick={logout}
            >
              <FiLogOut />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
