"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../components/AuthWrapper";
import Chats from "../components/Chats";
import { API, url } from "../../config";
import { formatTime } from "../components/useful";
import Loading from "../components/Loading";

interface UserData {
  id: string;
  dp: string;
}

interface User {
  _id: string;
  fullname: string;
  dp: string;
  message?: {
    _id: string;
    message: string;
    createdAt: Date;
  };
}

const page = () => {
  const { data } = useAuthContext();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [receiverId, setReceiverId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);

  const f = () => {
    axios
      .get(`${API}/v1/getUsers/${data.id}`)
      .then((res) => {
        console.log(res.data.users);
        setUsers(res.data.users);
        setName(res.data.users[0].fullname);
        setImage(url + res.data.users[0].dp);
        setReceiverId(res.data.users[0]._id);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (data?.id) {
      f();
    }
  }, [data]);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className="w-full h-full">
        <div
          className="w-full h-32"
          style={{ backgroundColor: "#449388" }}
        ></div>

        <div
          className="px-3 overflow-auto no-scrollbar h-[100vh] mx-0 w-[100vw] "
          style={{ marginTop: "-128px" }}
        >
          <div className="pt-6 h-full">
            <div className="flex border relative sm:flex-row flex-col border-grey rounded shadow-lg h-full">
              <div
                className={`lg:w-[31%] top-0 ease-in-out transition duration-500 ${
                  show ? "pn:max-sm:absolute -left-[1000px]" : "left-0"
                }   w-full  sm:w-[400px] md:w-[500px] lg:min-w-[400px] border flex flex-col`}
              >
                <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
                  <div>
                    <img className="w-10 h-10 rounded-full" src={data?.dp} />
                  </div>

                  <div className="flex">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path
                          fill="#727A7E"
                          d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z"
                        ></path>
                      </svg>
                    </div>
                    <div className="ml-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path
                          opacity=".55"
                          fill="#263238"
                          d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"
                        ></path>
                      </svg>
                    </div>
                    <div className="ml-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path
                          fill="#263238"
                          fill-opacity=".6"
                          d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="py-2 px-2 bg-grey-lightest">
                  <input
                    type="text"
                    className="w-full px-2 py-2 text-sm"
                    placeholder="Search or start new chat"
                  />
                </div>

                <div className="bg-grey-lighter flex-1 overflow-auto">
                  {users.map((d) => (
                    <div
                      onClick={() => {
                        setShow(true);
                        setReceiverId(d?._id), setImage(url + d?.dp);
                        setName(d?.fullname);
                      }}
                      className="px-3 flex items-center bg-grey-light cursor-pointer"
                    >
                      <div>
                        <img
                          className="h-12 w-12 rounded-full"
                          src={url + d?.dp}
                        />
                      </div>
                      <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                        <div className="flex items-bottom justify-between">
                          <p className="text-grey-darkest">{d?.fullname}</p>
                          <p className="text-xs text-grey-darkest">
                            {d?.message?.createdAt &&
                              formatTime(d?.message?.createdAt)}
                          </p>
                        </div>
                        <p className="text-grey-dark mt-1 text-sm">
                          {d?.message?._id
                            ? d?.message?.message
                              ? d?.message?.message
                              : "File"
                            : d?.message?.message + ` ${d?.fullname}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {show && (
                <div
                  className={`sm:hidden ${
                    show ? "block" : "pn:max-sm:hidden"
                  } w-full h-full`}
                >
                  <Chats
                    id={data?.id}
                    receiverId={receiverId}
                    show={show}
                    setShow={setShow}
                    name={name}
                    f={f}
                    image={image}
                  />
                </div>
              )}
              <div className="pn:max-sm:hidden w-full h-full">
                <Chats
                  id={data?.id}
                  receiverId={receiverId}
                  show={show}
                  setShow={setShow}
                  name={name}
                  f={f}
                  image={image}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
