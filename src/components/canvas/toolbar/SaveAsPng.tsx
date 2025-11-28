import React from 'react';
import * as fabric from 'fabric';
import Button from '@mui/material/Button';

import icon from 'icons/save.png';
import { Tooltip } from '@mui/material';

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

    const text = "Export as .PNG";

    return (
        <Tooltip title={text}>
            <Button onClick={onSave} variant="contained" startIcon={<img src={icon} alt={text} className="toolbar-icon" />}>
                {text}
            </Button>
        </Tooltip>
    );
};
