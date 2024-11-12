import React from 'react';
import { createRoot } from 'react-dom/client';
import logService from './services/logService';
import { logLevels, LogLevel } from '../common/logLevels';
import { JemError } from '../common/JemError';

const App = () => {
  const logMessage = (level: LogLevel, message: string) => {
    logService.log(level, message);
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
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);