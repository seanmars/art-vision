import winston, { format, transports } from "winston";

const { combine, timestamp, printf } = format;

const loggingFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}] ${message}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    loggingFormat
  ),
  transports: [new transports.Console()]
});

export default logger;