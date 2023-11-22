import { memoryUsage } from "node:process";

let isGCExposed = false;

try {
  gc();
  isGCExposed = true;
} catch (e) {
  console.warn("Manual GC is not available");
}

const printStats = (io) => {
  if (isGCExposed) {
    gc();
  }

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
