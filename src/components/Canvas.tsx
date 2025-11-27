import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import { FabricText } from 'fabric';

import './Canvas.css';

interface CanvasProps {
    canvasRef: React.RefObject<fabric.Canvas | null>;
    aspectRatio: number; // e.g., 16/9
}

const MARGIN_PX = 20;

export const Canvas: React.FC<CanvasProps> = ({ canvasRef, aspectRatio }) => {
    const getWidth = () => {
        return window.screen.availWidth - MARGIN_PX;
    }

    const getHeight = () => {
        return getWidth() / aspectRatio;
    }

    const [dimensions, setDimensions] = useState({
        width: getWidth(),
        height: getHeight(),
    });

    const canvasEl = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current;
            if(!canvas) {
                return;
            }

            canvas.setDimensions({
                width: getWidth(),
                height: getHeight(),
            })
            canvas.calcOffset();
        };

        window.addEventListener('resize', handleResize);

        // Cleanup on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [aspectRatio]);

    // Create the fabric canvas and objects
    useEffect(() => {
        const canvas = new fabric.Canvas(canvasEl.current || undefined);
        canvasRef.current = canvas; // Expose the canvas instance via the ref

        const rect = new fabric.Rect({
            left: 100,
            top: 100,
            width: 200,
            height: 100,
            fill: 'red',
            stroke: 'blue',
            strokeWidth: 2
        });

        const text = new FabricText('Sample Text', {
            left: 150,
            top: 250,
            fontSize: 20,
            fill: 'white',
        });

        canvas.add(rect, text);

        return () => {
            canvas.dispose();
        };
    }, [canvasRef]);

    return (
        <canvas
            ref={canvasEl}
            width={dimensions.width}
            height={dimensions.height}
            className="Canvas"
        />
    );
}