import React from 'react';
import * as fabric from 'fabric';
import { VBox } from '../../common/layout';
import { ResetSize, BringForwards, FlipImage, ManageBackground, RemoveImage } from '.';

interface CanvasToolbarProps {
  canvasRef: React.RefObject<fabric.Canvas | null>;
}

export const CanvasToolbar: React.FC<CanvasToolbarProps> = ({
  canvasRef,
}) => {
   return (
    <VBox className="slightly-gapped">
      <BringForwards canvasRef={canvasRef}/>
      <ResetSize canvasRef={canvasRef}/>
      <ManageBackground canvasRef={canvasRef}/>
      <FlipImage canvasRef={canvasRef}/>
      <ResetSize canvasRef={canvasRef}/>
      <RemoveImage canvasRef={canvasRef}/>
    </VBox>
  );
};
