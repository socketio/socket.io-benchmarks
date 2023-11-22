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

io.engine.on("connection", (rawSocket) => {
  rawSocket.request = null;
});

io.on("connection", (socket) => {
  socket.on("ping", (cb) => {
    cb("pong");
  });
});
