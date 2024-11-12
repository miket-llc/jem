import React from 'react';
import { createRoot } from 'react-dom/client';
import logService from './services/logService';
import { logLevels, LogLevel } from '../common/logLevels';

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
          logMessage(logLevels.error, `Failed to change background color: ${(error as Error).message}`);
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