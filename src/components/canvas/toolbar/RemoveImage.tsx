import React from 'react';
import * as fabric from 'fabric';
import Button from '@mui/material/Button';

import icon from 'icons/delete.png';

interface RemoveImageProps {
    canvasRef: React.RefObject<fabric.Canvas | null>;
}

export const RemoveImage: React.FC<RemoveImageProps> = ({
    canvasRef,
}) => {

    const onRemove = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const images = canvas.getActiveObjects();
        images.forEach(img => canvas.remove(img));
        canvas.renderAll();
    }

    return (
        <Button onClick={onRemove} variant="contained" startIcon={<img src={icon} alt="Remove" className="toolbar-icon"/>}>
            Remove
        </Button>
    );
};
