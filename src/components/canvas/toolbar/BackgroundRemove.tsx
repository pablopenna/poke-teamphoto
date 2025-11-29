import React from 'react';
import * as fabric from 'fabric';
import Button from '@mui/material/Button';

import clear_bk_icon from 'icons/remove_background.png';
import { Tooltip } from '@mui/material';
import { useUserOptions } from '../../../contexts';

interface ManageBackgroundProps {
    canvasRef: React.RefObject<fabric.Canvas | null>;
}

export const BackgroundRemove: React.FC<ManageBackgroundProps> = ({
    canvasRef,
}) => {
    const { userOptions } = useUserOptions();

    const onRemoveBackground = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.backgroundImage = undefined;
        canvas.renderAll();
    }

    const remove_bk_text = "Remove background";

    return (
        <Tooltip title={remove_bk_text}>
            <Button onClick={onRemoveBackground} variant="contained" className="toolbar-button" startIcon={<img src={clear_bk_icon} alt={remove_bk_text} className="toolbar-icon" />}>
                {userOptions.buttonStyle === 'icon-and-text' && remove_bk_text}
            </Button>
        </Tooltip>
    );
};
