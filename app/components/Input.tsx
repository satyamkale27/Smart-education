import React, { useState } from "react";
import { IoCloudUpload, IoSend } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
const Input = ({ sendMessages }) => {
  const [message, setMessage] = useState("");
  const [d, setD] = useState("");
  return (
    <div className="bg-grey-lighter px-4 py-4 flex items-center">
      <div>
        <input
          id="image"
          type="file"
          name="image"
          onChange={(e) => {
            setD(e.target.files[0]);
            setMessage(e.target.files[0]);
          }}
          className="hidden"
        />
        <label htmlFor="image">
          <IoCloudUpload className="text-2xl" />
        </label>
      </div>
      <div className="flex-1 mx-4 border-2 border-[#f2f2f2]">
        {!d ? (
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border outline-none rounded px-2 py-2"
            type="text"
          />
        ) : (
          <div className="flex justify-between items-center w-full">
            <div>{d?.name}</div>
            <div
              onClick={() => {
                setD("");
                setMessage("");
              }}
              className="text-xl"
            >
              <RxCross2 />
            </div>
          </div>
        )}
      </div>
      <div
        onClick={() => {
          if (!message) {
            return;
          }
          sendMessages(message);
          setMessage("");
          setD("");
        }}
      >
        <IoSend className="text-2xl" />
      </div>
    </div>
  );
};

export default Input;
