"use client";
import axios from "axios";
import React, { useState } from "react";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { API } from "../../config";
import { useAuthContext } from "../components/AuthWrapper";
import { IoMdAdd } from "react-icons/io";
import toast from "react-hot-toast";

const Signup = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
    fullname: "",
    dp: "",
    role: "",
  });
  const router = useRouter();
  const { setAuth } = useAuthContext();

  const sendData = async (e) => {
    e.preventDefault();
    if (!login.email || !login.dp || !login.fullname || !login.password) {
      toast.error("Please Enter All Details");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("email", login.email);
      formData.append("image", login.dp);
      formData.append("fullname", login.fullname);
      formData.append("password", login.password);
      formData.append("role", login.role);

      const res = await axios.post(`${API}/createuser`, formData);
      console.log(res.data);
      if (res.data.success) {
        toast.success("Account Created!");
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
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8  border-2 rounded-xl text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <div className="flex justify-center items-center mb-6">
            <label
              htmlFor="image"
              className="w-[80px] h-[80px] overflow-hidden border flex justify-center items-center rounded-full"
            >
              {login.dp ? (
                <div className="w-[80px] h-[80px]">
                  <img
                    src={URL.createObjectURL(login.dp)}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex justify-center items-center">
                  <IoMdAdd />
                </div>
              )}
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              className="hidden"
              onChange={(e) => setLogin({ ...login, dp: e.target.files[0] })}
            />
          </div>
          <input
            type="text"
            value={login.fullname}
            onChange={(e) => setLogin({ ...login, fullname: e.target.value })}
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="fullname"
            placeholder="Full Name"
          />

          <input
            type="text"
            value={login.email}
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
          />

          <input
            type="password"
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
          />

          <div className="flex my-2 items-center gap-3">
            <div className="flex items-center gap-1">
              <input
                onChange={() => setLogin({ ...login, role: "teacher" })}
                type="radio"
                name="category"
                id="teacher"
              />
              <label htmlFor="teacher">Teacher</label>
            </div>
            <div className="flex items-center gap-1">
              <input
                onChange={() => setLogin({ ...login, role: "student" })}
                type="radio"
                name="category"
                id="student"
              />
              <label htmlFor="student">Student</label>
            </div>
          </div>

          <button
            onClick={sendData}
            type="submit"
            className="w-full text-center py-3 rounded bg-green text-white bg-green-600 focus:outline-none my-1"
          >
            Create Account
          </button>
          <div className="text-grey-dark text-center mt-6">
            Already have an account?
            <Link
              className="no-underline border-b border-blue text-blue"
              href="/login"
            >
              Log in
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
