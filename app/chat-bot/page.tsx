"use client";
import { API, url } from "@/config";
import axios from "axios";
import { useState } from "react";

const page = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const getResponse = async () => {
    // const response = await fetch(`${API}/prompt/${text}`);
    // const data = await response.json();
    // console.log("data", data);
    // const res = await axios.get(`${url}prompt/${text}`);
    const res = await axios.get(`http://localhost:8000/prompt/${text}`);
    console.log(res.data);
    setMessages([
      ...messages,
      {
        author: res.data.messages[0].content,
        bot: res.data.candidates[0].content,
      },
    ]);
  };

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="chat-bot w-full">
        <div className="chat-header">
          <div className="info-container">
            <h3>Chat with</h3>
            <h2 className="z-50 text-lg font-semibold">PaLM 2 Bot</h2>
          </div>

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="rgb(6, 120, 84)"
              fillOpacity="1"
              d="M0,224L60,218.7C120,213,240,203,360,186.7C480,171,600,149,720,154.7C840,160,960,192,1080,186.7C1200,181,1320,139,1380,117.3L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            ></path>
          </svg>
        </div>
        <div className="feed no-scrollbar">
          {messages?.map((message, _index) => (
            <div key={_index}>
              <div className="question bubble">{message.author}</div>
              <div className="response bubble1 ">{message.bot}</div>
            </div>
          ))}
        </div>
        <textarea
          className="textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="button" onClick={getResponse}>
          ⇨
        </button>
      </div>
    </div>
  );
};

export default page;
