import { LogLevel } from '../../common/logLevels';

declare global {
  interface Window {
    electron: {
      log: (level: LogLevel, message: string) => void;
    };
  }
}

const ipcService = {
  log: (level: LogLevel, message: string) => {
    window.electron.log(level, message);
  }
};

export default ipcService;