import React from 'react';
import * as fabric from 'fabric';
import Button from '@mui/material/Button';

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
        <Button onClick={onRemove}>
            Remove
        </Button>
    );
};
