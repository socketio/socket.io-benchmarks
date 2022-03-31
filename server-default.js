import { Server } from "socket.io";
import { initReporting } from "./reporting.js";

const PORT = process.env.PORT || 3000;

const io = new Server(PORT);

initReporting(io);

io.on("connection", (socket) => {
  socket.on("ping", (cb) => {
    cb("pong");
  });

  socket.on("disconnect", () => {
    const lastToDisconnect = io.sockets.sockets.size === 0;
    if (lastToDisconnect) {
      gc();
    }
  });
});
