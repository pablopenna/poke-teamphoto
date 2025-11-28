import React from 'react';
import * as fabric from 'fabric';
import Button from '@mui/material/Button';
import { HBox } from '../../common/layout';

import icon_flip_x from 'icons/flip_x.png';
import icon_flip_y from 'icons/flip_y.png';
import { Tooltip } from '@mui/material';
import { useUserOptions } from '../../../contexts';

interface FlipImageProps {
    canvasRef: React.RefObject<fabric.Canvas | null>;
}

export const FlipImage: React.FC<FlipImageProps> = ({
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

    const onFlipY = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const images = canvas.getActiveObjects();
        images.forEach(img => img.flipY = !img.flipY);
        canvas.renderAll();
    }

    const flip_x_text = "Flip X";
    const flip_y_text = "Flip Y";

    return (
        <HBox className="slightly-gapped">
            <Tooltip title={flip_x_text}>
                <Button onClick={onFlipX} variant="contained" startIcon={<img src={icon_flip_x} alt={flip_x_text} className="toolbar-icon" />}>
                    {userOptions.buttonStyle === 'icon-and-text' && flip_x_text}
                </Button>
            </Tooltip>
            <Tooltip title={flip_y_text}>
                <Button onClick={onFlipY} variant="contained" startIcon={<img src={icon_flip_y} alt={flip_y_text} className="toolbar-icon" />}>
                    {userOptions.buttonStyle === 'icon-and-text' && flip_y_text}
                </Button>
            </Tooltip>
        </HBox>
    );
};
