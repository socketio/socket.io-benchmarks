import { Server } from "socket.io";
import { initReporting } from "./reporting.js";

const PORT = process.env.PORT || 3000;

const io = new Server(PORT);

initReporting(io);

io.engine.on("connection", (rawSocket) => {
  rawSocket.request = null;
});

io.on("connection", (socket) => {
  socket.on("ping", (cb) => {
    cb("pong");
  });
});
