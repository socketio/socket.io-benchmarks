import { WebSocketServer } from "ws";
import { memoryUsage } from "node:process";

const PORT = process.env.PORT || 3000;

const wss = new WebSocketServer({
  port: PORT
});

wss.on("connection", (ws) => {
  ws.on("message", () => {
    ws.send("pong");
  });
});

let isGCExposed = false;

try {
  gc();
  isGCExposed = true;
} catch (e) {
  console.warn("Manual GC is not available");
}

const printStats = () => {
  if (isGCExposed) {
    gc();
  }

  const { rss, heapUsed, heapTotal } = memoryUsage();

  const values = [
    new Date().toISOString(),
    wss.clients.size,
    rss, // in bytes
    heapUsed, // in bytes
    heapTotal, // in bytes
  ];

  console.log(values.join(";"));
};

setInterval(() => {
  printStats();
}, 2000);
