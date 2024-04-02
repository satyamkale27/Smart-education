"use client";
import React, { useState } from "react";
import { useAuthContext } from "../components/AuthWrapper";
import axios from "axios";
import { API } from "@/config";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const page = () => {
  const [course, setCourse] = useState({
    title: "",
    desc: "",
    price: "",
    image: "",
    content: "",
  });

  const router = useRouter();
  const { data } = useAuthContext();

  const createCourse = async (e) => {
    e.preventDefault();
    const { content, desc, image, price, title } = course;
    if (!content || !desc || !image || !price || !title) {
      toast.error("Enter All Details!");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("desc", desc);
      formData.append("price", Number(price));
      formData.append("content", content);
      formData.append("image", image);
      formData.append("createdBy", data.id);
      const res = await axios.post(`${API}/createCourse`, formData);
      console.log(res.data);
      if (res.data.success) {
        toast.success("Course Created!");
        router.push(`/my-courses/${data?.id}`);
      } else {
        toast.error(res.data.message || "Something Went Wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center w-screen sm:h-screen">
        <div>
          {" "}
          <h2 className="text-2xl text-center mb-6 max-w-[500px] mt-12 sm:mt-0 pb-3 font-semibold">
            Start sharing your expertise today – create your course and make a
            difference
          </h2>
        </div>
        <div className="sm:w-[80%] w-[95%] border rounded-xl h-auto">
          <form onSubmit={createCourse} className="w-full flex flex-col p-6">
            <div className="w-full flex sm:flex-row flex-col gap-3">
              <div className="flex flex-col w-full">
                <div className="flex flex-col mb-3 w-full">
                  <label htmlFor="name">Title</label>
                  <input
                    type="text"
                    value={course.title}
                    onChange={(e) =>
                      setCourse({ ...course, title: e.target.value })
                    }
                    className="px-3 py-2 border-2 dark:border-white/40 dark:bg-transparent rounded-lg outline-none border-[#f1f1f1]"
                    autocomplete="off"
                  />
                </div>

                <div className="flex flex-col mb-3 w-full">
                  <label htmlFor="message">Description</label>
                  <textarea
                    value={course.desc}
                    onChange={(e) =>
                      setCourse({ ...course, desc: e.target.value })
                    }
                    id="message"
                    className="px-3 py-2 h-32 border-2 outline-none  dark:border-white/40 dark:bg-transparent rounded-lg border-[#f1f1f1]"
                  ></textarea>
                </div>

                <div className="flex flex-col mb-3 w-full">
                  <label htmlFor="name">Price</label>
                  <input
                    type="text"
                    value={course.price}
                    onChange={(e) =>
                      setCourse({ ...course, price: e.target.value })
                    }
                    className="px-3 py-2 border-2 outline-none dark:border-white/40 dark:bg-transparent rounded-lg border-[#f1f1f1]"
                    autocomplete="off"
                  />
                </div>
              </div>

              <div className="flex flex-col w-full">
                <div className="flex flex-col mb-3 w-full">
                  <label htmlFor="email">Content</label>
                  <input
                    type="text"
                    value={course.content}
                    onChange={(e) =>
                      setCourse({ ...course, content: e.target.value })
                    }
                    className="px-3 py-2 border-2 outline-none  dark:border-white/40 dark:bg-transparent rounded-lg border-[#f1f1f1]"
                    autocomplete="off"
                  />
                </div>

                <div className="flex flex-col w-full">
                  <div>Course Thumbnail</div>
                  {course.image ? (
                    <img
                      src={URL.createObjectURL(course.image)}
                      className="max-w-[200px] rounded-xl"
                    />
                  ) : (
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-56 mb-3 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        name="image"
                        onChange={(e) =>
                          setCourse({ ...course, image: e.target.files[0] })
                        }
                        type="file"
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
            <div className=" flex justify-end items-center pt-3">
              <button
                type="submit"
                className=" text-white bg-blue-500 border rounded-lg px-4 py-2 transition duration-50 focus:outline-none font-semibold  hover:text-white text-xl cursor-pointer"
              >
                Create Course
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default page;
