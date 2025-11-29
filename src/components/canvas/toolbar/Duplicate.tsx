import React from 'react';
import * as fabric from 'fabric';
import Button from '@mui/material/Button';

import icon from 'icons/clone.png';
import { Tooltip } from '@mui/material';
import { useUserOptions } from '../../../contexts';

interface DuplicateProps {
    canvasRef: React.RefObject<fabric.Canvas | null>;
}

export const Duplicate: React.FC<DuplicateProps> = ({
    canvasRef,
}) => {

    const OFFSET_X = 10;
    const OFFSET_Y = 10;
    
    const { userOptions } = useUserOptions();

    const onDuplicate = async () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const images = canvas.getActiveObjects();
        images.forEach(async img => {
            const newImg = await img.clone();
            newImg.set({
                top: img.top + OFFSET_Y,
                left: img.left + OFFSET_X,
            });
            canvas.add(newImg);
        });
    }

    const text = "Duplicate";

    return (
        <Tooltip title={text}>
            <Button onClick={onDuplicate} variant="contained" className="toolbar-button" startIcon={<img src={icon} alt={text} className="toolbar-icon" />}>
                {userOptions.buttonStyle === 'icon-and-text' && text}
            </Button>
        </Tooltip>
    );
};
