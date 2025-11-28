import React from 'react';
import * as fabric from 'fabric';
import { VBox } from '../../common/layout';
import { BringForwards } from './BringForward';
import { BringBackwards } from './BringBackward';

interface CanvasToolbarProps {
  canvasRef: React.RefObject<fabric.Canvas | null>;
}

export const CanvasToolbar: React.FC<CanvasToolbarProps> = ({
  canvasRef,
}) => {
   return (
    <VBox className="slightly-gapped">
      <BringForwards canvasRef={canvasRef}/>
      <BringBackwards canvasRef={canvasRef}/>
    </VBox>
  );
};
