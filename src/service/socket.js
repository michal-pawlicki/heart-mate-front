import { createContext, useContext } from "react";
import { io } from "socket.io-client";

export const socket = io("http://localhost:3001");

export const SocketContext = createContext(socket);

export const useSocket = () => {
  return useContext(SocketContext);
};
