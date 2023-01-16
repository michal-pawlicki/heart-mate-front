import { createContext, useContext } from "react";
import { io } from "socket.io-client";

export const socket = io("ws://192.168.1.55");

export const SocketContext = createContext(socket);

export const useSocket = () => {
  return useContext(SocketContext);
};
