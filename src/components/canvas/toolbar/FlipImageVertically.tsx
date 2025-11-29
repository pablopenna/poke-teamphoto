import React from 'react';
import * as fabric from 'fabric';
import Button from '@mui/material/Button';

import icon_flip_y from 'icons/flip_y.png';
import { Tooltip } from '@mui/material';
import { useUserOptions } from '../../../contexts';

interface FlipImageProps {
    canvasRef: React.RefObject<fabric.Canvas | null>;
}

export const FlipImageVertically: React.FC<FlipImageProps> = ({
    canvasRef,
}) => {
    const { userOptions } = useUserOptions();

    const onFlipY = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const images = canvas.getActiveObjects();
        images.forEach(img => img.flipY = !img.flipY);
        canvas.renderAll();
    }

    const flip_y_text = "Flip Y";

    return (
        <Tooltip title={flip_y_text}>
            <Button onClick={onFlipY} variant="contained" className="toolbar-button" startIcon={<img src={icon_flip_y} alt={flip_y_text} className="toolbar-icon" />}>
                {userOptions.buttonStyle === 'icon-and-text' && flip_y_text}
            </Button>
        </Tooltip>
    );
};
