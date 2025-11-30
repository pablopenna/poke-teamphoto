import React, { useEffect, useRef } from 'react';
import * as fabric from 'fabric';

import { Dimensions } from '../../types';
import './Canvas.css';
import charmanderPic from '../../preloaded-images/charmander.png'
import { setupClipboardPaste } from '.';

interface CanvasProps {
  canvasRef: React.RefObject<fabric.Canvas | null>;
  dimensions: Dimensions;
}

export const Canvas: React.FC<CanvasProps> = ({ canvasRef, dimensions }) => {
  const canvasEl = useRef<HTMLCanvasElement>(null);

  // Init Canvas
  useEffect(() => {
    const canvas = new fabric.Canvas(canvasEl.current || undefined);
    canvasRef.current = canvas; // Expose the canvas instance via the ref

    // const rect = new fabric.Rect({
    //   left: 100,
    //   top: 100,
    //   width: 200,
    //   height: 100,
    //   fill: 'red',
    //   stroke: 'blue',
    //   strokeWidth: 2,
    // });
    // const text = new fabric.FabricText('Sample Text', {
    //   left: 150,
    //   top: 250,
    //   fontSize: 20,
    //   fill: 'white',
    // });
    // canvas.add(rect, text);

    // Sample initial images
    // fabric.FabricImage.fromURL(trainerCardPic).then((img) => {
    //     canvas.add(img)
    // });

    fabric.FabricImage.fromURL(charmanderPic).then((img) => {
      img.imageSmoothing = false;
      img.set({
        left: canvas.width / 2 - (img.getBoundingRect().width / 2),
        top: canvas.height / 2 - (img.getBoundingRect().height / 2),
      });
      canvas.add(img);
    });

    const cleanupClipboardPasteSetup = setupClipboardPaste(canvas);

    return () => {
      cleanupClipboardPasteSetup();
      canvas.dispose();
    };
  }, [canvasRef]);

  // Handle resize
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
