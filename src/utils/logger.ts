import winston from 'winston';
import { config } from '../config';

const logger: winston.Logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: config.logs.path }),
  ],
});

if (config.env === 'development') {
  logger.add(new winston.transports.Console({
    format: winston.format.prettyPrint(),
  }));
}

export const Logger = logger;
