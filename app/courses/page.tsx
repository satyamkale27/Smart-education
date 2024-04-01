"use client";
import { API } from "@/config";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios
      .get(`${API}/v1/allcourses`)
      .then((res) => {
        setCourses(res.data.courses);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  console.log(courses);
  return (
    <>
      <div></div>
    </>
  );
};

export default page;
