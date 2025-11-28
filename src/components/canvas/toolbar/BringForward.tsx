import React from 'react';
import * as fabric from 'fabric';
import Button from '@mui/material/Button';

import icon from 'icons/forwards_3.png';
import { Tooltip } from '@mui/material';

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

    const text = "Bring forward";

    return (
        <Tooltip title={text}>
            <Button onClick={onBringForward} variant="contained" startIcon={<img src={icon} alt={text} className="toolbar-icon" />}>
                {text}
            </Button>
        </Tooltip>
    );
};
