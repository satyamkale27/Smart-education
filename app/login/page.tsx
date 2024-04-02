"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useAuthContext } from "../components/AuthWrapper";
import { API } from "../../config";
import toast from "react-hot-toast";
interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { setAuth } = useAuthContext();
  const [login, setLogin] = useState<LoginData>({
    email: "",
    password: "",
  });
  const router = useRouter();

  const sendData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!login.email || !login.password) {
      toast.error("Please Enter All Details");
      return;
    }
    try {
      const data = { email: login.email, password: login.password };
      const res = await axios.post(`${API}/login`, data);
      console.log(res.data);
      if (res.data.success) {
        toast.success("Login Successfull!");
        Cookies.set("access_token", res.data.access_token);
        Cookies.set("refresh_token", res.data.refresh_token);
        setAuth(true);
        router.push("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="relative mx-auto w-full max-w-md dark:bg-gray-800 dark:text-white bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-3xl font-semibold dark:text-white text-gray-900">
              Log in
            </h1>
          </div>
          <div className="mt-5">
            <form onSubmit={sendData} className="flex flex-col gap-3">
              <div className="relative mt-6">
                <input
                  type="email"
                  value={login.email}
                  onChange={(e) =>
                    setLogin({ ...login, email: e.target.value })
                  }
                  name="email"
                  id="email"
                  placeholder="Email Address"
                  className="peer mt-1 w-full border-b-2 bg-transparent border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                  autoComplete="NA"
                />
                <label
                  htmlFor="email"
                  className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                >
                  Email Address
                </label>
              </div>
              <div className="relative mt-6">
                <input
                  value={login.password}
                  onChange={(e) =>
                    setLogin({ ...login, password: e.target.value })
                  }
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="peer peer mt-1 w-full border-b-2 bg-transparent border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                />
                <label
                  htmlFor="password"
                  className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                >
                  Password
                </label>
              </div>
              <div className="my-6">
                <button
                  type="submit"
                  className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none"
                >
                  Log in
                </button>
              </div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account yet?{" "}
                <Link
                  href={"/signup"}
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
