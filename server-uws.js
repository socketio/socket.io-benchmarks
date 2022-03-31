import { Server } from "socket.io";
import { initReporting } from "./reporting.js";
import uws from "uWebSockets.js";

const PORT = process.env.PORT || 3000;

const app = new uws.App();
const io = new Server();

io.attachApp(app);

app.listen(PORT, (token) => {
  if (!token) {
    console.error("requested port is already in use");
    process.exit(1);
  }
});

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
