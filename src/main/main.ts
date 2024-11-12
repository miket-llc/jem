// src/main/main.ts
import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import logService from './services/logService';
import { logLevels, LogLevel } from '../common/logLevels';

const isDevelopment = process.env.NODE_ENV === 'development';

app.once('ready', () => {
    logService.info('App is ready');

    const win = new BrowserWindow({
        width: 1200,
        height: 900,
        webPreferences: {
            contextIsolation: true, // Protect against prototype pollution
            preload: path.join(__dirname, 'preload.js') // Preload script
        }
    });

    const rendererHtmlPath = path.join(__dirname, '../renderer/index.html');
    win.loadFile(rendererHtmlPath).then(() => {
        logService.info('Renderer loaded successfully');
    }).catch(e => {
        logService.error(`Failed to load renderer: ${e.message}`);
    });
});

// Listen for log messages from the renderer process
ipcMain.on('log-message', (event, level: LogLevel, message: string) => {
    logService.log(level, message);
});