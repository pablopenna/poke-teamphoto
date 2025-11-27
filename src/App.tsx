import React, { useRef } from 'react';
import * as fabric from 'fabric';

import logo from './logo.svg';
import './App.css';
import { Canvas, SpriteFetcher } from './components';

function App() {

  const canvasRef = useRef<fabric.Canvas | null>(null); // Create a ref for the canvas

  return (
    <div className="App">
      <header className="App-header">
          <Canvas canvasRef={canvasRef} aspectRatio={16/9}/>
          <SpriteFetcher canvasRef={canvasRef}/>
      </header>
    </div>
  );
}

export default App;
