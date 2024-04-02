"use client";
import { API, url } from "@/config";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = ({ params }) => {
  const [data, setData] = useState();
  const [course, setCourse] = useState();

  useEffect(() => {
    if (params.id) {
      axios
        .get(`${API}/fetchVideos/${params.cid}`)
        .then((res) => {
          console.log(res.data);
          setData(res.data.media);
          setCourse(res.data.courses);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [params.cid]);

  console.log(data);

  return (
    <div>
      <div>{course?.name}</div>
      <div>
        <img src={url + course?.image} />
        {course?.name}
      </div>
      <div>{course?.desc}</div>

      <div>
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="flex  justify-center items-center overflow-hidden w-[1200px] h-full rounded-xl">
            {data?.isExternalLink ? (
              <div className="flex justify-center items-center w-full min-w-[750px] rounded-xl">
                <iframe
                  src={data?.ytlink}
                  alt=""
                  className="w-full min-h-[450px]"
                ></iframe>
                <a href={data?.ytlink}>Link</a>
                {console.log(data?.ytlink)}
              </div>
            ) : (
              <div className="flex justify-center w-full min-w-[550px] items-center rounded-xl">
                {data?.media.type.startsWith("image") ? (
                  <img src={url + data?.media.content} alt="" />
                ) : (
                  <video src={url + data?.media.content} alt="" />
                )}
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1>{data?.title}</h1>
            </div>
            <p>
              {data?.desc.length > 150
                ? `${data?.desc.slice(0, 150)}...`
                : data?.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
