import pino from "pino";
import path from "path";

const logFilePath = path.join(__dirname, "../logs", "app.log");

const logger = pino(
  {
    level: "debug", 
  },
  pino.multistream([
    {
      stream: process.stdout, 
      level: "debug",
    },
    {
      stream: pino.destination(logFilePath), 
      level: "info",
    },
  ])
);

export { logger };
