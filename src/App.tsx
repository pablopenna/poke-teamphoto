import React, { useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import * as fabric from 'fabric'; // Fabric.js
import { FabricText } from 'fabric';

function App() {
  const canvasEl = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const options = {};
    const canvas = new fabric.Canvas(canvasEl.current || undefined, options);
    
    // Create a rectangle and add it to the canvas
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      width: 200,
      height: 100,
      fill: 'red',
      stroke: 'blue',
      strokeWidth: 2
    });

    // Create text and add it to the canvas
    const text = new FabricText('Hello Fabric!', {
      left: 150,
      top: 250,
      fontSize: 20,
      fill: 'white',
    });

    canvas.add(rect, text);

    // Make the fabric.Canvas instance available to your app      
    return () => {
      canvas.dispose(); // Cleanup
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ width: '100%', height: '500px' }}>
          <canvas width="1000" height="400" ref={canvasEl} />
        </div>
        <span>Hello?</span>
      </header>
    </div>
  );
}

export default App;
