// src/main/preload.ts
import { contextBridge, ipcRenderer } from 'electron';
import { LogLevel } from '../common/logLevels';

contextBridge.exposeInMainWorld('electron', {
  log: (level: LogLevel, message: string) => ipcRenderer.send('log-message', level, message),
  readFile: (filePath: string) => ipcRenderer.invoke('read-file', filePath),
  writeFile: (filePath: string, data: string) => ipcRenderer.invoke('write-file', filePath, data)
});