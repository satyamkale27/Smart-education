import { API } from "@/config";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";

interface AddLessonProps {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  f: () => void;
}

interface CourseState {
  title: string;
  desc: string;
  media: string | Blob;
  link: string;
}

const AddLesson: React.FC<AddLessonProps> = ({ setEdit, id, f }) => {
  const [course, setCourse] = useState<CourseState>({
    title: "",
    desc: "",
    media: "",
    link: "",
  });

  const [link, setLink] = useState(false);

  const sendLesson = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!course.title || !course.desc || (!course.link && !course.media)) {
      toast.error(
        "Please Enter Title and Description, and provide either a Yt Link or Media!"
      );
      return;
    }
    try {
      const formData = new FormData();
      formData.append("title", course.title);
      formData.append("desc", course.desc);
      formData.append("image", course.media);
      formData.append("ytlink", course.link);
      const res = await axios.post(`${API}/addcontenttoCourse/${id}`, formData);
      if (res.data.success) {
        toast.success("Lesson Created!");
        setEdit(false);
        f();
      } else {
        toast.error(res.data.message || "Something Went Wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form
        onSubmit={sendLesson}
        className=" pp:w-[500px] border rounded-xl p-5 dark:bg-gray-800 bg-white"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl pb-3 font-semibold">Upload Lessons</h2>
          <div
            onClick={() => setEdit(false)}
            className="text-2xl font-semibold"
          >
            <RxCross2 />
          </div>
        </div>

        <div>
          <div className="flex flex-col mb-3">
            <label className="text-sm font-semibold" htmlFor="name">
              Title
            </label>
            <input
              type="text"
              id="name"
              value={course.title}
              onChange={(e) => setCourse({ ...course, title: e.target.value })}
              className="px-3 py-2 outline-none border-2 dark:bg-gray-700 rounded-lg "
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col mb-3">
            <label className="text-sm font-semibold" htmlFor="message">
              Desc
            </label>
            <textarea
              rows={4}
              value={course.desc}
              onChange={(e) => setCourse({ ...course, desc: e.target.value })}
              id="message"
              className="px-3 py-2 outline-none border-2 dark:bg-gray-700 rounded-lg "
            ></textarea>
          </div>

          {link ? (
            <div className="flex flex-col mb-3">
              <label className="text-sm font-semibold" htmlFor="linkt">
                Yt Link
              </label>
              <input
                type="text"
                id="linkt"
                value={course.link}
                onChange={(e) => setCourse({ ...course, link: e.target.value })}
                className="px-3 py-2 outline-none border-2 dark:bg-gray-700 rounded-lg "
                autoComplete="off"
              />
            </div>
          ) : (
            <div className="flex flex-col w-full">
              <div className="text-sm font-semibold">Image/Video Lessons</div>
              {course.media ? (
                typeof course.media === "string" ? (
                  <img
                    src={course.media}
                    className="max-w-[200px] rounded-xl"
                    alt="Media"
                  />
                ) : (
                  <img
                    src={URL.createObjectURL(course.media)}
                    className="max-w-[200px] rounded-xl"
                    alt="Media"
                  />
                )
              ) : (
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-40 mb-3 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    name="image"
                    onChange={(e) => {
                      const file = e.target.files && e.target.files[0];
                      if (file) {
                        setCourse({ ...course, media: file });
                      }
                    }}
                    type="file"
                    className="hidden"
                  />
                </label>
              )}
            </div>
          )}

          <div className="flex items-center gap-2 text-sm font-semibold">
            <div className="flex items-center gap-1">
              <input
                checked={!link}
                onChange={() => {
                  setLink(!link);
                  setCourse({ ...course, link: "" });
                }}
                type="radio"
                name="lesson"
                id="you"
              />
              <label htmlFor="you">Upload from Gallery</label>
            </div>

            <div className="flex items-center gap-1">
              <input
                onChange={() => {
                  setLink(!link);
                  setCourse({ ...course, media: "" });
                }}
                checked={link}
                type="radio"
                name="lesson"
                id="you"
              />
              <label htmlFor="you">Use youtube link instead</label>
            </div>
          </div>
          {link && (
            <div className="text-sm mt-2 font-semibold">
              {" "}
              Note: Upload youtube embedded link of that video
            </div>
          )}
        </div>
        <div className="w-full pt-3">
          <button
            type="submit"
            className="w-full  px-4 py-2 transition duration-50  focus:outline-none font-semibold text-white bg-blue-600 hover:text-white text-xl cursor-pointer"
          >
            Send
          </button>
        </div>
      </form>
    </>
  );
};

export default AddLesson;
