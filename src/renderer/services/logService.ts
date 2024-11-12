import { LogLevel } from '../../common/logLevels';
import { ILogService } from '../../common/ILogService';

declare global {
  interface Window {
    electron: {
      log: (level: LogLevel, message: string) => void;
    };
  }
}

const logService: ILogService = {
  log: (level: LogLevel, message: string) => {
    // Log to the console
    if (level === 'error') {
      console.error(message);
    } else {
      console.log(message);
    }

    // Send log message via IPC
    try {
      window.electron.log(level, message);
    } catch (error) {
      console.error(`Failed to send log message via IPC: ${(error as Error).message}`);
    }
  },
  info: (message: string) => {
    logService.log('info', message);
  },
  warn: (message: string) => {
    logService.log('warn', message);
  },
  error: (message: string) => {
    logService.log('error', message);
  }
};

export default logService;