"use client";
import Navbar from "@/app/components/Navbar";
import { API, url } from "@/config";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";

interface Course {
  _id: string;
  media: { content: string };
  desc: string;
  price: number;
}

const Page: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${API}/v1/allcourses`)
      .then((res) => {
        setCourses(res.data.courses);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Navbar />
      <div className="flex justify-center w-full items-center">
        <div className="grid grid-cols-1 px-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-4 lg:w-[90%]">
          {courses.map((d, i) => (
            <div key={i} className="max-w-[350px] mx-auto">
              <div className="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
                <div>
                  <img
                    className="rounded-t-lg w-[300px] min-h-[250px] p-4"
                    src={url + d?.media.content}
                    alt="product image"
                  />
                </div>
                <div className="px-5 pb-5">
                  <div>
                    <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white"></h3>
                  </div>
                  <div className="flex items-center mt-2.5 mb-5">
                    <div>
                      {d?.desc.length > 80
                        ? `${d?.desc.slice(0, 80)}...`
                        : d?.desc}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      &#x20B9; {d?.price}
                    </span>
                    <Link
                      href={`courses/${d?._id}`}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      View Course
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
