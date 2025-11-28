import React from 'react';
import * as fabric from 'fabric';
import Button from '@mui/material/Button';

import icon from 'icons/clone.png';

interface DuplicateProps {
    canvasRef: React.RefObject<fabric.Canvas | null>;
}

export const Duplicate: React.FC<DuplicateProps> = ({
    canvasRef,
}) => {

    const OFFSET_X = 10;
    const OFFSET_Y = 10;

    const onDuplicate = async () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const images = canvas.getActiveObjects();
        images.forEach(async img => {
            const newImg = await img.clone();
            newImg.set({
                top: img.top + OFFSET_Y,
                left: img.left + OFFSET_X,
            });
            canvas.add(newImg);
        });
        // canvas.renderAll();
    }

    return (
        <Button onClick={onDuplicate} variant="contained" startIcon={<img src={icon} alt="Duplicate" className="toolbar-icon"/>}>
            Duplicate
        </Button>
    );
};
