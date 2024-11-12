import { createLogger, format, transports } from 'winston';
import * as path from 'path';
import { ILogService } from '../../common/ILogService';
import { LogLevel } from '../../common/logLevels';
import { JemError } from '../../common/JemError';

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: path.join(__dirname, '../../../logs/error.log'), level: 'error' }),
    new transports.File({ filename: path.join(__dirname, '../../../logs/combined.log') })
  ]
});

const logService: ILogService = {
  log: (level: LogLevel, message: string) => {
    logger.log({ level, message });
  },
  info: (message: string) => {
    logger.info(message);
  },
  warn: (message: string) => {
    logger.warn(message);
  },
  error: (message: string) => {
    logger.error(message);
  }
};

export default logService;