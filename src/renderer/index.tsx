import React from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
  return (
    <div>
      <h1>Hello, Electron with React!</h1>
      <button onClick={() => document.body.style.backgroundColor = 'red'}>
        Turn page red
      </button>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);