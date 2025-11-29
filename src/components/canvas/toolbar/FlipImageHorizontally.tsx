import React from 'react';
import * as fabric from 'fabric';
import Button from '@mui/material/Button';

import icon_flip_x from 'icons/flip_x.png';
import { Tooltip } from '@mui/material';
import { useUserOptions } from '../../../contexts';

interface FlipImageProps {
    canvasRef: React.RefObject<fabric.Canvas | null>;
}

export const FlipImageHorizontally: React.FC<FlipImageProps> = ({
    canvasRef,
}) => {
    const { userOptions } = useUserOptions();

    const onFlipX = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const images = canvas.getActiveObjects();
        images.forEach(img => img.flipX = !img.flipX);
        canvas.renderAll(); //trigger canvas refresh to apply changes instantly
    }

    const flip_x_text = "Flip X";

    return (
        <Tooltip title={flip_x_text}>
            <Button onClick={onFlipX} variant="contained" className="toolbar-button" startIcon={<img src={icon_flip_x} alt={flip_x_text} className="toolbar-icon" />}>
                {userOptions.buttonStyle === 'icon-and-text' && flip_x_text}
            </Button>
        </Tooltip>
    );
};
