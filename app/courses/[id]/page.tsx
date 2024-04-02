"use client";
import AddLesson from "@/app/components/AddLesson";
import { useAuthContext } from "@/app/components/AuthWrapper";
import Loading from "@/app/components/Loading";
import { API, url } from "@/config";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
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
  const [del, setDel] = useState(false);
  const [vid, setVid] = useState(false);
  const [videoId, setVideoId] = useState("");
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState({
    name: "",
    totalLesson: "",
    desc: "",
    image: "",
    userid: "",
    price: "",
    content: "",
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
          price: res.data.courses.price,
          content: res.data.courses.content,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteVideos = async (cid, mid) => {
    try {
      const res = await axios.delete(
        `${API}/deleteContentFromCourse/${cid}/${mid}`
      );
      if (res.data.success) {
        f();
        toast.success("Video Deleted!");
      } else {
        toast.error("Something went Wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCourse = async () => {
    try {
      const res = await axios.delete(`${API}/deleteCourse/${params.id}`);
      if (res.data.success) {
        setDel(false);
        toast.success("Course Deleted!");
        router.push("/");
      } else {
        toast.error("Something went Wrong!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDel(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      f();
    }
  }, [params.id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {edit && (
        <div className="fixed inset-0 w-screen h-screen z-50 flex justify-center items-center bg-black/60">
          <div className="flex flex-col ">
            <AddLesson setEdit={setEdit} id={params.id} f={f} />
          </div>
        </div>
      )}
      {vid && (
        <div className="fixed inset-0 w-screen h-screen z-50 flex justify-center items-center bg-black/60">
          <div
            className={`${
              del
                ? "h-48 w-80 bg-[#F9F9F9] px-2 dark:bg-[#273142] sm:bg-white shadow-xl rounded-3xl flex flex-col items-center justify-center duration-100"
                : "h-0 w-0 duration-100 text-[0px] hidden"
            }`}
          >
            <div className="font-semibold">Sure you want to delete Video?</div>
            <div className="text-[12px]">
              This will permanently delete the video!
            </div>
            <div className="flex gap-4 mt-4">
              <div
                onClick={() => setVid(false)}
                className="ring-1 cursor-pointer ring-black px-6 py-2 rounded-2xl "
              >
                No, cancel
              </div>
              <div
                onClick={() => deleteVideos(params.id, videoId)}
                className=" px-6 py-2 cursor-pointer rounded-2xl bg-black text-white "
              >
                Yes, Confirm
              </div>
            </div>
          </div>
        </div>
      )}
      {del && (
        <div className="fixed inset-0 w-screen h-screen z-50 flex justify-center items-center bg-black/60">
          <div
            className={`${
              del
                ? "h-48 w-80 bg-[#F9F9F9] px-2 dark:bg-[#273142] sm:bg-white shadow-xl rounded-3xl flex flex-col items-center justify-center duration-100"
                : "h-0 w-0 duration-100 text-[0px] hidden"
            }`}
          >
            <div className="font-semibold">Sure you want to delete course?</div>
            <div className="text-[12px]">
              This will delete all content from course!
            </div>
            <div className="flex gap-4 mt-4">
              <div
                onClick={() => setDel(false)}
                className="ring-1 cursor-pointer ring-black px-6 py-2 rounded-2xl "
              >
                No, cancel
              </div>
              <div
                onClick={() => deleteCourse()}
                className=" px-6 py-2 cursor-pointer rounded-2xl bg-black text-white "
              >
                Yes, Confirm
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col bg-gray-100 no-scrollbar">
        <div className="flex justify-between border-2 p-5 items-center">
          <div className="text-2xl font-semibold">Course</div>
          <div className="flex justify-center items-center gap-3">
            {data.id == course.userid && (
              <div
                className="bg-blue-600 text-white font-semibold p-2 px-4 rounded-xl"
                onClick={() => setEdit(true)}
              >
                <div>Add Lessons</div>
              </div>
            )}
            {data.id == course.userid && (
              <div
                className="bg-red-600 text-white font-semibold p-2 px-4 rounded-xl"
                onClick={() => setDel(true)}
              >
                Delete Course
              </div>
            )}
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row -mx-4">
              <div className="md:flex-1 order-2 px-4">
                <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                  <img
                    className="w-full h-full object-fill"
                    src={course?.image}
                    alt="Course Image"
                  />
                </div>
              </div>
              <div className="md:flex-1 order-1 px-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  {course?.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {course?.desc}
                </p>
                <div className="flex mb-4">
                  <div className="mr-4">
                    <span className="font-bold text-gray-700 dark:text-gray-300">
                      Price:
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      &#x20B9; {course.price}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Course Content:
                  </span>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                    {course.content}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="center flex justify-center gap-4 flex-col items-center">
            {courseInformation?.map((Information, i) => (
              <Videos
                videoobj={Information}
                userid={data?.id}
                courseId={params.id}
                setVideoId={setVideoId}
                courseCreatorId={course.userid}
                vid={vid}
                setVid={setVid}
                i={i}
                key={Information.title}
              />
            ))}
          </div>
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
    vid,
    setVid,
    setVideoId,
  }: {
    videoobj: VideoObj;
  }) {
    return (
      <>
        <div className="w-3/4 px-2 border-2 border-solid border-black rounded-md dark:border-white ">
          <div className="flex items-center gap-4">
            {videoobj.isExternalLink ? (
              <div className="flex justify-center items-center overflow-hidden h-[120px] max-w-[140px]  rounded-xl">
                <iframe src={videoobj?.ytlink} alt=""></iframe>
                {console.log(videoobj?.ytlink)}
              </div>
            ) : (
              <div className="flex justify-center items-center overflow-hidden h-[120px] max-w-[140px] rounded-xl">
                {videoobj?.media.type.startsWith("image") ? (
                  <img src={url + videoobj?.media.content} alt="" />
                ) : (
                  <video src={url + videoobj?.media.content} alt="" />
                )}
              </div>
            )}

            <div className=" ">
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
          <div className="flex justify-end px-2 pb-2 -mt-5 items-center space-x-3">
            <Link
              className="bg-blue-400 p-2 px-4 rounded-lg text-white font-semibold"
              href={`/courses/${params.id}/${videoobj?._id}`}
            >
              Watch Lesson
            </Link>
            <div className="text-xl text-red-700">
              {userid == courseCreatorId && (
                <div
                  onClick={() => {
                    setVideoId(videoobj?._id);
                    setVid(true);
                  }}
                >
                  <MdDelete />
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default page;
