import React from 'react';
import * as fabric from 'fabric';
import { ResetSize, BringForwards, RemoveImage, Duplicate, BringBackwards, SaveAsPng, FlipImageHorizontally, FlipImageVertically, BackgroundSet, BackgroundRemove } from '.';
import { ButtonGroup } from '@mui/material';

interface CanvasToolbarProps {
  canvasRef: React.RefObject<fabric.Canvas | null>;
}

export const CanvasToolbar: React.FC<CanvasToolbarProps> = ({
  canvasRef,
}) => {
  return (
    <div className="canvas-toolbar">
      <ButtonGroup variant="contained">
        <BringForwards canvasRef={canvasRef} />
        <BringBackwards canvasRef={canvasRef} />
      </ButtonGroup>
      <ButtonGroup variant="contained">
        <BackgroundSet canvasRef={canvasRef} />
        <BackgroundRemove canvasRef={canvasRef} />
      </ButtonGroup>
      <ButtonGroup variant="contained">
        <FlipImageHorizontally canvasRef={canvasRef} />
        <FlipImageVertically canvasRef={canvasRef} />
      </ButtonGroup>
      <ResetSize canvasRef={canvasRef} />
      <RemoveImage canvasRef={canvasRef} />
      <Duplicate canvasRef={canvasRef} />
      <SaveAsPng canvasRef={canvasRef} />
    </div>
  );
};
