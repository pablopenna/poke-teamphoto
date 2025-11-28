import React from 'react';
import * as fabric from 'fabric';
import Button from '@mui/material/Button';

interface BringForwardsProps {
    canvasRef: React.RefObject<fabric.Canvas | null>;
}

export const BringForwards: React.FC<BringForwardsProps> = ({
    canvasRef,
}) => {

    const onBringForward = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const images = canvas.getActiveObjects();
        images.forEach(img => canvas.bringObjectToFront(img));
    }

    return (
        <Button onClick={onBringForward}>
            Bring Forward
        </Button>
    );
};
