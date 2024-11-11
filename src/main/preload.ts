import { contextBridge, ipcRenderer } from 'electron';
import { LogLevel } from '../common/logLevels';

contextBridge.exposeInMainWorld('electron', {
  log: (level: LogLevel, message: string) => ipcRenderer.send('log-message', level, message)
});