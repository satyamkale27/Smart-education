"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthWrapper";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineuser, setOnlineuser] = useState(null);

  const { data, auth } = useAuthContext();

  useEffect(() => {
    if (auth) {
      const newSocket = io("http://localhost:5000", {
        query: { userId: data.id },
        transports: ["websocket"],
      });
      setSocket(newSocket);

      newSocket.on("onlineusers", (users) => {
        setOnlineuser(users);
      });
      return () => {
        newSocket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [auth, data.id]);
  return (
    <SocketContext.Provider value={{ socket, onlineuser }}>
      {children}
    </SocketContext.Provider>
  );
};
