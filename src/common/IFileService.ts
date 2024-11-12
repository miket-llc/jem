export interface IFileService {
    readFile(filePath: string): Promise<{ success: boolean, data?: string, error?: string }>;
    writeFile(filePath: string, data: string): Promise<{ success: boolean, error?: string }>;
  }