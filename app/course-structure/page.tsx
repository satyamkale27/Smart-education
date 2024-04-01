import React from "react";

interface VideoObj {
  title: string;
  description: string;
  photoName: string;
  videosequenceno: number;
}

const CourseStructure = () => {
  const CourseInformation: VideoObj[] = [
    {
      title: "web developer",
      description:
        "Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript.",
      photoName: "",
      videosequenceno: 1,
    },
    {
      title: "web developer",
      description:
        "Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript.",
      photoName: "",
      videosequenceno: 1,
    },
    {
      title: "web developer",
      description:
        "Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript.",
      photoName: "",
      videosequenceno: 1,
    },
    {
      title: "web developer",
      description:
        "Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript.",
      photoName: "",
      videosequenceno: 1,
    },
  ];
  return (
    <div className="h-screen bg-gray-300 dark:bg-transparent">
      <h1 className="mt-4 mb-4 text-4xl font-semibold text-center">
        Course Name
      </h1>
      <div className="center flex justify-center flex-col items-center">
        {CourseInformation.map((Information) => (
          <Videos videoobj={Information} key={Information.title} />
        ))}
      </div>
    </div>
  );

  function Videos({ videoobj }: { videoobj: VideoObj }) {
    return (
      <div className="w-3/4 h-24 border-2 border-solid border-black rounded-md mb-4 dark:border-white ">
        <div className="ml-32">
          <span>{videoobj.videosequenceno}</span>
          <h1>{videoobj.title}</h1>
          <p>{videoobj.description}</p>
        </div>
      </div>
    );
  }
};

export default CourseStructure;
