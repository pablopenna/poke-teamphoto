import React, { useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import { Canvas } from './components';

function App() {

  return (
    <div className="App">
      <header className="App-header">
          <Canvas initialText="awenao"/>
      </header>
    </div>
  );
}

export default App;
