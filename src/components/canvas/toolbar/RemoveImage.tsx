import React from 'react';
import * as fabric from 'fabric';
import Button from '@mui/material/Button';

import icon from 'icons/delete.png';
import { Tooltip } from '@mui/material';
import { useUserOptions } from '../../../contexts';

interface RemoveImageProps {
    canvasRef: React.RefObject<fabric.Canvas | null>;
}

export const RemoveImage: React.FC<RemoveImageProps> = ({
    canvasRef,
}) => {
    const { userOptions } = useUserOptions();

    const onRemove = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const images = canvas.getActiveObjects();
        images.forEach(img => canvas.remove(img));
        canvas.renderAll();
    }

    const text = "Remove";

    return (
        <Tooltip title={text}>
            <Button onClick={onRemove} variant="contained" startIcon={<img src={icon} alt={text} className="toolbar-icon" />}>
                {userOptions.buttonStyle === 'icon-and-text' && text}
            </Button>
        </Tooltip>
    );
};
