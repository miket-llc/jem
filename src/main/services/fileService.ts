import { ipcMain } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import { IFileService } from '../../common/IFileService';

const fileService: IFileService = {
  readFile: (filePath: string) => {
    return fs.promises.readFile(filePath, 'utf-8')
      .then(data => ({ success: true, data }))
      .catch(error => ({ success: false, error: error.message }));
  },
  writeFile: (filePath: string, data: string) => {
    return fs.promises.writeFile(filePath, data, 'utf-8')
      .then(() => ({ success: true }))
      .catch(error => ({ success: false, error: error.message }));
  }
};

// IPC handlers
ipcMain.handle('read-file', async (event, filePath) => {
  return await fileService.readFile(filePath);
});

ipcMain.handle('write-file', async (event, filePath, data) => {
  return await fileService.writeFile(filePath, data);
});

export default fileService;