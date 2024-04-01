"use client";
import AddLesson from "@/app/components/AddLesson";
import { useAuthContext } from "@/app/components/AuthWrapper";
import { API, url } from "@/config";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

interface VideoObj {
  title: string;
  desc: string;
  photoName: string;
  videosequenceno: number;
}

const page = ({ params }) => {
  const { data } = useAuthContext();
  const [courseInformation, setCourseInformation] = useState([]);
  const [edit, setEdit] = useState(false);

  const [course, setCourse] = useState({
    name: "",
    totalLesson: "",
    desc: "",
    image: "",
    userid: "",
  });

  const f = () => {
    axios
      .get(`${API}/fetchCoursesbyId/${params.id}`)
      .then((res) => {
        console.log(res.data.courses);
        setCourseInformation(res.data.courses.medias);
        setCourse({
          name: res.data.courses.title,
          desc: res.data.courses.desc,
          totalLesson: res.data.courses.medias.length,
          image: url + res.data.courses.media.content,
          userid: res.data.courses.createdBy,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteVideos = async (cid, mid) => {
    try {
      console.log("hello");
    } catch (error) {
      console.log(error);
    }
  };
  //   const deleteVideos = async (cid, mid) => {
  //     try {
  //       const res = await axios.delete(
  //         `${API}/deleteContentFromCourse/${cid}/${mid}`
  //       );
  //       if (res.data.success) {
  //         f();
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  useEffect(() => {
    if (params.id) {
      f();
    }
  }, [params.id]);

  return (
    <>
      {edit && (
        <div className="fixed inset-0 w-screen h-screen z-50 flex justify-center items-center bg-black/60">
          <div className="flex flex-col ">
            <AddLesson setEdit={setEdit} id={params.id} f={f} />
          </div>
        </div>
      )}
      <div className="h-screen bg-gray-300 dark:bg-transparent">
        <h1 className="pt-7 mb-7 text-4xl font-semibold text-center">
          {course?.name}
        </h1>
        <div>{course?.desc}</div>
        <div>{course?.totalLesson}</div>

        <div>
          <img src={course?.image} alt="" />
        </div>
        {data.id == course.userid && (
          <div onClick={() => setEdit(true)}>
            <div>Add Lessons</div>
          </div>
        )}
        <div className="center flex justify-center gap-4 flex-col items-center">
          {courseInformation?.map((Information, i) => (
            <Videos
              videoobj={Information}
              userid={data?.id}
              courseId={params.id}
              courseCreatorId={course.userid}
              i={i}
              key={Information.title}
            />
          ))}
        </div>
      </div>
    </>
  );

  function Videos({
    videoobj,
    i,
    userid,
    courseCreatorId,
    courseId,
  }: {
    videoobj: VideoObj;
  }) {
    return (
      <>
        <Link
          href={`/courses/${params.id}/${videoobj?._id}`}
          className="w-3/4 p-2 border-2 border-solid border-black rounded-md dark:border-white "
        >
          <div className="flex items-center gap-4">
            <div className="flex justify-center items-center overflow-hidden h-[120px] max-w-[140px] rounded-xl">
              {videoobj?.media.type.startsWith("image") ? (
                <img src={url + videoobj?.media.content} alt="" />
              ) : (
                <video src={url + videoobj?.media.content} alt="" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span>{i + 1}</span>
                <h1>{videoobj.title}</h1>
              </div>
              <p>
                {videoobj.desc.length > 150
                  ? `${videoobj.desc.slice(0, 150)}...`
                  : videoobj.desc}
              </p>
            </div>
          </div>
        </Link>
        <div>
          {userid == courseCreatorId && (
            <div onClick={() => deleteVideos(courseId, videoobj?._id)}>
              <MdDelete />
            </div>
          )}
        </div>
      </>
    );
  }
};

export default page;
