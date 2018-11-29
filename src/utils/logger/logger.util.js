const winston = require('winston');

const options = {
  console: {
    level: 'info',
    handleExceptions: true,
    json: false,
    colorize: true,
    prettyPrint: true
  }
};

const transports = [
  new winston.transports.Console(options.console)
];

// instantiate a new Winston Logger with the settings defined above
const logger = winston.loggers.add(process.env.NODE_ENV, {
  transports
});

module.exports = {
  logger
};
