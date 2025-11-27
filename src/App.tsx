import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';

import logo from './logo.svg';
import './App.css';
import { fetchAllPokes, fetchPokesInGen } from './api';
import { Canvas, CanvasDimensionsSelector } from './components/canvas';
import { SpriteFetcher, VBox } from './components';
import { Dimensions } from './types';

function App() {

  const canvasRef = useRef<fabric.Canvas | null>(null); // Create a ref for the canvas
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 400,
    height: 300,
  });

  useEffect(() => {
    fetchAllPokes().then(data => console.log(data));;
    fetchPokesInGen(1).then(data => console.log(data));
    fetchPokesInGen(2).then(data => console.log(data));;
    fetchPokesInGen(3).then(data => console.log(data));;
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <VBox className='gapped'>
          <Canvas canvasRef={canvasRef} dimensions={dimensions}/>
          <CanvasDimensionsSelector dimensions={dimensions} setDimensions={setDimensions}/>  
          <SpriteFetcher canvasRef={canvasRef}/>
        </VBox>
      </header>
    </div>
  );
}

export default App;
