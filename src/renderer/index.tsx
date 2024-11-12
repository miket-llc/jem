import React from 'react';
import { createRoot } from 'react-dom/client';
import logService from './services/logService';
import fileService from './services/fileService';
import { logLevels, LogLevel } from '../common/logLevels';
import { JemError } from '../common/JemError';

const App = () => {
  const logMessage = (level: LogLevel, message: string) => {
    logService.log(level, message);
  };

  const readFile = async () => {
    const result = await fileService.readFile('/path/to/file.txt');
    if (result.success) {
      logMessage(logLevels.info, `File content: ${result.data}`);
    } else {
      logMessage(logLevels.error, `Failed to read file: ${result.error}`);
    }
  };

  const writeFile = async () => {
    const result = await fileService.writeFile('/path/to/file.txt', 'Hello, world!');
    if (result.success) {
      logMessage(logLevels.info, 'File written successfully');
    } else {
      logMessage(logLevels.error, `Failed to write file: ${result.error}`);
    }
  };

  return (
    <div>
      <h1>jem</h1>
      <button onClick={() => {
        try {
          document.body.style.backgroundColor = 'red';
          logMessage(logLevels.info, 'Background color changed to red');
        } catch (error) {
          const jemError = new JemError(`Failed to change background color: ${(error as Error).message}`, 'BACKGROUND_COLOR_ERROR');
          logMessage(logLevels.error, jemError.message);
        }
      }}>
        Turn page red
      </button>
      <button onClick={readFile}>
        Read File
      </button>
      <button onClick={writeFile}>
        Write File
      </button>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);