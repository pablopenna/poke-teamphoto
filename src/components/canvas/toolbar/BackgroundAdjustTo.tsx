import React from 'react';
import * as fabric from 'fabric';
import Button from '@mui/material/Button';

import icon from 'icons/adjust_size_to_background.png';
import { Tooltip } from '@mui/material';
import { useUserOptions } from '../../../contexts';

interface ManageBackgroundProps {
    canvasRef: React.RefObject<fabric.Canvas | null>;
}

// Adjust Canvas size to Background size
export const BackgroundAdjustTo: React.FC<ManageBackgroundProps> = ({
    canvasRef,
}) => {
    const { userOptions } = useUserOptions();

    const onAdjust = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const background = canvas.backgroundImage;
        if(!background) return;

        background.set({
            top: 0,
            left: 0,
        });
        
        const dimensions = {
            width: background.width,
            height: background.height,
        };

        canvas.setDimensions(dimensions);
        canvas.calcOffset();
        canvas.renderAll();
    }

    const text = "Adjust canvas size to background";

    return (
        <Tooltip title={text}>
            <Button onClick={onAdjust} variant="contained" className="toolbar-button" startIcon={<img src={icon} alt={text} className="toolbar-icon" />}>
                {userOptions.buttonStyle === 'icon-and-text' && text}
            </Button>
        </Tooltip>
    );
};
