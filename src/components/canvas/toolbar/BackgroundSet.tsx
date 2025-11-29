import React from 'react';
import * as fabric from 'fabric';
import Button from '@mui/material/Button';

import set_bk_icon from 'icons/set_background.png';
import { Tooltip } from '@mui/material';
import { useUserOptions } from '../../../contexts';

interface ManageBackgroundProps {
    canvasRef: React.RefObject<fabric.Canvas | null>;
}

export const BackgroundSet: React.FC<ManageBackgroundProps> = ({
    canvasRef,
}) => {
    const { userOptions } = useUserOptions();

    const onSetAsBackground = async () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const image = canvas.getActiveObject();
        if (!image) return;

        canvas.backgroundImage = await image.clone(); // Need to clone the instance, cannot use the existing one (does not work)
        canvas.remove(image);
        canvas.renderAll();
    }

    const add_bk_text = "Set as background";

    return (
        <Tooltip title={add_bk_text}>
            <Button onClick={onSetAsBackground} variant="contained" className="toolbar-button" startIcon={<img src={set_bk_icon} alt={add_bk_text} className="toolbar-icon" />}>
                {userOptions.buttonStyle === 'icon-and-text' && add_bk_text}
            </Button>
        </Tooltip>
    );
};
