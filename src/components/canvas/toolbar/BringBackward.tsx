import React from 'react';
import * as fabric from 'fabric';
import Button from '@mui/material/Button';

import icon from 'icons/backwards_3.png';
import { Tooltip } from '@mui/material';
import { useUserOptions } from '../../../contexts';

interface BringBackwardsProps {
    canvasRef: React.RefObject<fabric.Canvas | null>;
}

export const BringBackwards: React.FC<BringBackwardsProps> = ({
    canvasRef,
}) => {

    const { userOptions } = useUserOptions();

    const onBringBackwards = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const images = canvas.getActiveObjects();
        images.forEach(img => canvas.sendObjectToBack(img));
        canvas.renderAll();
    }

    const text = "Bring Backwards";

    return (
        <Tooltip title={text}>
            <Button onClick={onBringBackwards} variant="contained" className="toolbar-button" startIcon={<img src={icon} alt={text} className="toolbar-icon" />}>
                {userOptions.buttonStyle === 'icon-and-text' && text}
            </Button>
        </Tooltip>
    );
};
