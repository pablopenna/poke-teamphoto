import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';

import './App.css';
import { fetchAllPokes, fetchPokesInGen } from './api';
import { Canvas, CanvasDimensionsSelector } from './components/canvas';
import { HBox, SpriteFetcher, VBox } from './components';
import { Dimensions } from './types';

function App() {
  const canvasRef = useRef<fabric.Canvas | null>(null); // Create a ref for the canvas
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 400,
    height: 300,
  });

  useEffect(() => {
    fetchAllPokes().then((data) => console.log(data));
    fetchPokesInGen(1).then((data) => console.log(data));
    fetchPokesInGen(2).then((data) => console.log(data));
    fetchPokesInGen(3).then((data) => console.log(data));
  }, []);

  return (
    <div className="App App-content">
      <HBox className="gapped align-center">
        <h1 className='App-title'>
          PokéTeam Photo
        </h1>
      </HBox>
      <VBox className="gapped align-center">
        <Canvas canvasRef={canvasRef} dimensions={dimensions} />
        <CanvasDimensionsSelector dimensions={dimensions} setDimensions={setDimensions} />
        <SpriteFetcher canvasRef={canvasRef} />
      </VBox>

    </div>
  );
}

export default App;
