import React from 'react';
import * as fabric from 'fabric';
import Button from '@mui/material/Button';

import icon from 'icons/backwards_3.png';

interface BringBackwardsProps {
    canvasRef: React.RefObject<fabric.Canvas | null>;
}

export const BringBackwards: React.FC<BringBackwardsProps> = ({
    canvasRef,
}) => {

    const onBringBackwards = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const images = canvas.getActiveObjects();
        images.forEach(img => canvas.sendObjectToBack(img));
        canvas.renderAll();
    }

    return (
        <Button onClick={onBringBackwards} variant="contained" startIcon={<img src={icon} alt="Bring Backwards" className="toolbar-icon"/>}>
            Bring Backwards
        </Button>
    );
};
