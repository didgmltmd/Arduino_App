import { io } from 'socket.io-client';

export const socket = io("https://arduino-server-o6py.onrender.com", {
  transports: ['websocket'],
});
