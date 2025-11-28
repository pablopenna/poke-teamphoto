import React from 'react';
import * as fabric from 'fabric';
import Button from '@mui/material/Button';

import icon from 'icons/reset.png';

interface ResetSizeProps {
    canvasRef: React.RefObject<fabric.Canvas | null>;
}

export const ResetSize: React.FC<ResetSizeProps> = ({
    canvasRef,
}) => {

    const onResetSize = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const images = canvas.getActiveObjects();
        images.forEach(img => img.scale(1.0));
        canvas.renderAll();
    }

    return (
        <Button onClick={onResetSize} variant="contained" startIcon={<img src={icon} alt="Reset size" className="toolbar-icon"/>}>
            Reset size
        </Button>
    );
};
