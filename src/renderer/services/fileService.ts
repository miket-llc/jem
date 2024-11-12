// src/renderer/services/fileService.ts
import { IFileService } from '../../common/IFileService';
import '../electron'; // Import the electron declaration

const fileService: IFileService = {
  readFile: async (filePath: string) => {
    try {
      return await window.electron.readFile(filePath);
    } catch (error) {
      console.error(`Failed to read file via IPC: ${(error as Error).message}`);
      return { success: false, error: (error as Error).message };
    }
  },
  writeFile: async (filePath: string, data: string) => {
    try {
      return await window.electron.writeFile(filePath, data);
    } catch (error) {
      console.error(`Failed to write file via IPC: ${(error as Error).message}`);
      return { success: false, error: (error as Error).message };
    }
  }
};

export default fileService;