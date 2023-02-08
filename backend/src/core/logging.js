const { level } = require("winston");
const winston = require("winston");
const { combine, timestamp, printf, colorize } = winston.format;

let logger;

const myLoggerFormat = printf(({ level, message, timestamp, ...rest }) => {
  return `${timestamp} ${level}: ${message} ${JSON.stringify(rest)}`;
});

const getLogger = () => {
  if (!logger) {
    throw new Error("You must initialize the logger before you use it!");
  }

  return logger;
};

const initializeLogger = ({ level, disabled, extraTransports = [] }) => {
  logger = winston.createLogger({
    level,
    levels: winston.config.npm.levels,
    format: combine(colorize(), timestamp(), myLoggerFormat),
    transports: [
      new winston.transports.Console({ silent: disabled }),
      ...extraTransports,
    ],
  });

  logger.info(`Logger initialized with log level: ${level}`);
};

module.exports = {
  getLogger,
  initializeLogger,
};
