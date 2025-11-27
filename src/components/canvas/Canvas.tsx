import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import { FabricText } from 'fabric';

import './Canvas.css';
import { Dimensions } from '../../types';

interface CanvasProps {
  canvasRef: React.RefObject<fabric.Canvas | null>;
  dimensions: Dimensions;
}

const MARGIN_PX = 20;
const DEFAULT_ASPECT_RATIO = 16 / 9;

export const Canvas: React.FC<CanvasProps> = ({ canvasRef, dimensions }) => {
  const canvasEl = useRef<HTMLCanvasElement>(null);

  // Init Canvas
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
      strokeWidth: 2,
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

  // handle resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.setDimensions(dimensions);
    canvas.calcOffset();

    // HACK: the DOM properties are updated but the style keeps the old size, preventing from resizing
    const elementsToFix = [
      Array.from(document.getElementsByClassName('canvas-container')),
      Array.from(document.getElementsByClassName('PokeCanvas')),
    ]
      .flat()
      .filter((e) => e != null);
    elementsToFix.forEach((e) => resizeHack(e as HTMLElement, dimensions));
  }, [dimensions]);

  // Manually update size in the style property of the element
  const resizeHack = (element: HTMLElement, dimensions: Dimensions) => {
    element.style.width = dimensions.width + 'px';
    element.style.height = dimensions.height + 'px';
  };

  return (
    <canvas
      ref={canvasEl}
      width={dimensions.width}
      height={dimensions.height}
      className="Canvas PokeCanvas"
    />
  );
};
