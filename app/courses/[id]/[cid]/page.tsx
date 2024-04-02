"use client";
import Loading from "@/app/components/Loading";
import { API, url } from "@/config";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = ({ params }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState();

  useEffect(() => {
    if (params.id) {
      axios
        .get(`${API}/fetchVideos/${params.cid}`)
        .then((res) => {
          console.log(res.data);
          setData(res.data.media);
          setCourse(res.data.courses);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [params.cid]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex justify-center items-center dark:bg-gray-800 bg-gray-100 w-full">
        <div className=" dark:bg-gray-800 px-4 max-w-[1200px] flex flex-col gap-8 lg:px-8 sm:px-6 py-8">
          <div className="flex flex-col  items-center gap-4">
            <div className="flex justify-center items-center sm:overflow-hidden w-full h-full rounded-xl">
              {data?.isExternalLink ? (
                <div className="flex justify-center items-center w-full  sm:min-w-[750px] rounded-xl">
                  <iframe
                    src={data?.ytlink}
                    alt=""
                    className="w-full min-h-[350px] sm:min-h-[450px]"
                  ></iframe>
                  <a
                    href={data?.ytlink}
                    className="text-blue-500 hover:underline"
                  >
                    {/* Watch on YouTube */}
                  </a>
                </div>
              ) : (
                <div className="flex justify-center w-full sm:min-w-[550px]  items-center rounded-xl">
                  {data?.media.type.startsWith("image") ? (
                    <img
                      src={url + data?.media.content}
                      alt=""
                      className="w-full"
                    />
                  ) : (
                    <video
                      controls
                      src={url + data?.media.content}
                      alt=""
                      className="w-full"
                    />
                  )}
                </div>
              )}
            </div>
            <div className="">
              <h1 className="text-2xl font-bold">{data?.title}</h1>
              <p className="mt-2">{data?.desc}</p>
            </div>
          </div>
          <div className="max-w-6xl mx-auto ">
            <div className="text-2xl font-bold mb-4">Courses Details :</div>
            <div className="flex flex-col md:flex-row -mx-4">
              <div className="md:flex-1 sm:order-2 px-4">
                <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                  <img
                    className="w-full h-full object-fill"
                    src={url + course?.image}
                    alt="data Image"
                  />
                </div>
              </div>
              <div className="md:flex-1 sm:order-1 px-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  {course?.name}
                </h2>
                <p className="text-gray-600 dark:text-white text-sm mb-4">
                  {course?.desc}
                </p>
                <div className="flex mb-4">
                  <div className="mr-4">
                    <span className="font-bold text-gray-700 dark:text-gray-300">
                      Price:
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      &#x20B9; {course?.price}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Course Content:
                  </span>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                    {course?.content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
