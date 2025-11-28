import React from 'react';
import * as fabric from 'fabric';
import Button from '@mui/material/Button';

import icon from 'icons/save.png';

interface SaveAsPngProps {
    canvasRef: React.RefObject<fabric.Canvas | null>;
}

export const SaveAsPng: React.FC<SaveAsPngProps> = ({
    canvasRef,
}) => {

    const onSave = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        window.open(canvas.toDataURL({
            format: 'png',
            multiplier: 1,
        }));
    }

    return (
        <Button onClick={onSave} variant="contained" startIcon={<img src={icon} alt="Export as png" className="toolbar-icon"/>}>
            Export as .PNG
        </Button>
    );
};
