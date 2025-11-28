import React from 'react';
import * as fabric from 'fabric';
import Button from '@mui/material/Button';

import icon from 'icons/reset.png';
import { Tooltip } from '@mui/material';
import { useUserOptions } from '../../../contexts';

interface ResetSizeProps {
    canvasRef: React.RefObject<fabric.Canvas | null>;
}

export const ResetSize: React.FC<ResetSizeProps> = ({
    canvasRef,
}) => {
    const { userOptions } = useUserOptions();

    const onResetSize = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const images = canvas.getActiveObjects();
        images.forEach(img => img.scale(1.0));
        canvas.renderAll();
    }

    const text = "Reset size";

    return (
        <Tooltip title={text}>
            <Button onClick={onResetSize} variant="contained" startIcon={<img src={icon} alt={text} className="toolbar-icon" />}>
                {userOptions.buttonStyle === 'icon-and-text' && text}
            </Button>
        </Tooltip>
    );
};
