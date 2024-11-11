import React from 'react';
import ReactDOM from 'react-dom';

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

ReactDOM.render(<App />, document.getElementById('root')); 