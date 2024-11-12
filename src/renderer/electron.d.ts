// src/renderer/electron.d.ts
import { LogLevel } from '../common/logLevels';

declare global {
  interface Window {
    electron: {
      log: (level: LogLevel, message: string) => void;
      readFile: (filePath: string) => Promise<{ success: boolean, data?: string, error?: string }>;
      writeFile: (filePath: string, data: string) => Promise<{ success: boolean, error?: string }>;
    };
  }
}