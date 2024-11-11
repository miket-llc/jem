// src/main/main.ts
import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import logger from './services/logger';
import { logLevels, LogLevel } from '../common/logLevels';

app.once('ready', () => {
    logger.info('App is ready');

    const win = new BrowserWindow({
        width: 1200,
        height: 900,
        webPreferences: {
            contextIsolation: true, // Protect against prototype pollution
            preload: path.join(__dirname, 'preload.js') // Preload script
        }
    });

    const rendererHtmlPath = path.join(`${__dirname}/../renderer/renderer.html`);
    win.loadFile(rendererHtmlPath).then(() => {
        logger.info('Renderer loaded successfully');
    }).catch(e => {
        logger.error(`Failed to load renderer: ${e.message}`);
    });
});

// Listen for log messages from the renderer process
ipcMain.on('log-message', (event, level: LogLevel, message: string) => {
    logger.log({ level, message });
});