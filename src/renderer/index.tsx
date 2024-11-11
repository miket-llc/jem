import React from 'react';
import { createRoot } from 'react-dom/client';
import ipcService from './services/ipcService';
import { logLevels, LogLevel } from '../common/logLevels';

const App = () => {
  const logMessage = (level: LogLevel, message: string) => {
    ipcService.log(level, message);
  };

  return (
    <div>
      <h1>jem</h1>
      <button onClick={() => {
        document.body.style.backgroundColor = 'red';
        logMessage(logLevels.info, 'Background color changed to red');
      }}>
        Turn page red
      </button>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);