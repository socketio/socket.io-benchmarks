import { memoryUsage } from "process";

const printStats = (io) => {
  const { rss, heapUsed, heapTotal } = memoryUsage();

  const values = [
    new Date().toISOString(),
    io.sockets.sockets.size,
    rss, // in bytes
    heapUsed, // in bytes
    heapTotal, // in bytes
  ];

  console.log(values.join(";"));
};

export function initReporting(io) {
  setInterval(() => {
    printStats(io);
  }, 2000);
}
