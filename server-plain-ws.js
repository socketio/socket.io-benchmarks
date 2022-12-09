import { WebSocketServer } from "ws";
import { memoryUsage } from "process";

const PORT = process.env.PORT || 3000;

const wss = new WebSocketServer({
  port: PORT
});

wss.on("connection", (ws) => {
  ws.on("message", () => {
    ws.send("pong");
  });

  ws.on("close", () => {
    const lastToDisconnect = wss.clients.size === 0;
    if (lastToDisconnect) {
      gc();
    }
  });
});

const printStats = () => {
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
