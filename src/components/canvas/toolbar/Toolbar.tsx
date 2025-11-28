import React from 'react';
import * as fabric from 'fabric';
import { Flexbox } from '../../common/layout';
import { ResetSize, BringForwards, FlipImage, ManageBackground, RemoveImage, Duplicate, BringBackwards, SaveAsPng } from '.';
import { ButtonGroup } from '@mui/material';

interface CanvasToolbarProps {
  canvasRef: React.RefObject<fabric.Canvas | null>;
}

export const CanvasToolbar: React.FC<CanvasToolbarProps> = ({
  canvasRef,
}) => {
   return (
    <Flexbox className="slightly-gapped flex-wrap vbox">
      <ButtonGroup>
        <BringForwards canvasRef={canvasRef}/>
        <BringBackwards canvasRef={canvasRef}/>
      </ButtonGroup>
      <ManageBackground canvasRef={canvasRef}/>
      <FlipImage canvasRef={canvasRef}/>
      <ResetSize canvasRef={canvasRef}/>
      <RemoveImage canvasRef={canvasRef}/>
      <Duplicate canvasRef={canvasRef}/>
      <SaveAsPng canvasRef={canvasRef}/>
    </Flexbox>
  );
};
