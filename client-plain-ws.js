import WebSocket from "ws";
import { hrtime } from "node:process";

const URL = process.env.URL || "ws://localhost:3000";
const MAX_CLIENTS = 10000;
const PING_INTERVAL = 1000;

let clientCount = 0;

const latency = {
  sum: 0,
  count: 0,
};

const createClient = () => {
  const ws = new WebSocket(URL);

  setInterval(() => {
    const start = hrtime.bigint();
    socket.emit("ping", () => {
      const duration = (hrtime.bigint() - start) / 2n; // in nanoseconds
      latency.sum += Number(duration) / 1000;
      latency.count++;
    });
  }, PING_INTERVAL);

  ws.on("error", () => {});

  ws.on("close", (reason) => {
    console.log(`disconnect due to ${reason}`);
  });

  if (++clientCount < MAX_CLIENTS) {
    ws.on("open", () => createClient());
  }
};

createClient();

const printReport = () => {
  const meanLatency = Math.floor(latency.sum / latency.count);
  latency.sum = latency.count = 0;

  const values = [new Date().toISOString(), clientCount, meanLatency];

  console.log(values.join(";"));
};

setInterval(printReport, 2000);
