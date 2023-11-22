import { Server } from "socket.io";
import { initReporting } from "./reporting.js";

const PORT = process.env.PORT || 3000;

const io = new Server(PORT);

initReporting(io);

let isGCExposed = false;

try {
  gc();
  isGCExposed = true;
} catch (e) {
  console.warn("GC cannot be manually triggered");
}

io.engine.on("connection", (rawSocket) => {
  rawSocket.request = null;
});

io.on("connection", (socket) => {
  socket.on("ping", (cb) => {
    cb("pong");
  });

  if (isGCExposed) {
    socket.on("disconnect", () => {
      const lastToDisconnect = io.sockets.sockets.size === 0;
      if (lastToDisconnect) {
        gc();
      }
    });
  }
});
