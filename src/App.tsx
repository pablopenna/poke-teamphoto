import React, { useEffect, useRef } from 'react';
import * as fabric from 'fabric';

import logo from './logo.svg';
import './App.css';
import { Canvas, SpriteFetcher } from './components';
import { fetchAllPokes, fetchPokesInGen } from './api';

function App() {

  const canvasRef = useRef<fabric.Canvas | null>(null); // Create a ref for the canvas

  useEffect(() => {
    fetchAllPokes().then(data => console.log(data));;
    fetchPokesInGen(1).then(data => console.log(data));
    fetchPokesInGen(2).then(data => console.log(data));;
    fetchPokesInGen(3).then(data => console.log(data));;
  }, []);

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
