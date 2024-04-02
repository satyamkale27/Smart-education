"use client";
import Navbar from "@/app/components/Navbar";
import { API, url } from "@/config";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../components/AuthWrapper";
import Loading from "../components/Loading";

interface Course {
  _id: string;
  title: string;
  desc: string;
  price: number;
  media: {
    content: string;
  };
}

const Page: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const { data } = useAuthContext();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (data?.id) {
      axios
        .get(`${API}/getcourses/${data?.id}`)
        .then((res) => {
          setCourses(res.data.courses);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [data?.id]);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Navbar />
      <div className="flex justify-center w-full items-center">
        {courses && courses.length > 0 && (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-10 mt-4 lg:w-[90%]">
            {courses.map((d, i) => (
              <div key={i} className="max-w-[350px] mx-auto">
                <div className="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
                  <a href="#">
                    <img
                      className="rounded-t-lg min-h-[250px] p-4"
                      src={url + d?.media.content}
                      alt="product image"
                    />
                  </a>
                  <div className="px-5 pb-5">
                    <a href="#">
                      <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white"></h3>
                    </a>
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
        )}

        {courses.length <= 0 && (
          <>
            <div className="w-full h-[500px] flex flex-col justify-center items-center">
              <div className="text-3xl font-semibold">No Course Found</div>
              <div className="mt-7 p-2 px-5 bg-blue-600 text-white rounded-lg">
                <Link href={"/create-course"}>Create Course !</Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Page;
