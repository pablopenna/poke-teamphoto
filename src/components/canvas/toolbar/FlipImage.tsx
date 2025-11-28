import React from 'react';
import * as fabric from 'fabric';
import Button from '@mui/material/Button';
import { HBox } from '../../common/layout';

import icon_flip_x from 'icons/flip_x.png';
import icon_flip_y from 'icons/flip_y.png';

interface FlipImageProps {
    canvasRef: React.RefObject<fabric.Canvas | null>;
}

export const FlipImage: React.FC<FlipImageProps> = ({
    canvasRef,
}) => {

    const onFlipX = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const images = canvas.getActiveObjects();
        images.forEach(img => img.flipX = !img.flipX);
        canvas.renderAll(); //trigger canvas refresh to apply changes instantly
    }

    const onFlipY = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const images = canvas.getActiveObjects();
        images.forEach(img => img.flipY = !img.flipY);
        canvas.renderAll();
    }

    return (
        <HBox className="slightly-gapped">
            <Button onClick={onFlipX} variant="contained" startIcon={<img src={icon_flip_x} alt="flip x" className="toolbar-icon"/>}>
                Flip X
            </Button>
            <Button onClick={onFlipY} variant="contained" startIcon={<img src={icon_flip_y} alt="flip y" className="toolbar-icon"/>}>
                Flip Y
            </Button>
        </HBox>
    );
};
