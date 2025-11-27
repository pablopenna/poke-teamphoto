import React, { useEffect, useRef } from 'react';
import * as fabric from 'fabric';
import { FabricText } from 'fabric';

import './Canvas.css';

interface CanvasProps {
    canvasRef: React.RefObject<fabric.Canvas | null>;
}

export const Canvas: React.FC<CanvasProps> = ({ canvasRef }) => {
    const canvasEl = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        console.log("creating canvas");
        const options = {};
        const canvas = new fabric.Canvas(canvasEl.current || undefined);
        canvasRef.current = canvas; // Expose the canvas instance via the ref

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
        const text = new FabricText( 'Sample Text', {
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

    return (<canvas width="1000" height="400" ref={canvasEl} className="Canvas"/>);
}