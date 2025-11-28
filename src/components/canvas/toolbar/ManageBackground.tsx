import React from 'react';
import * as fabric from 'fabric';
import Button from '@mui/material/Button';

import set_bk_icon from 'icons/set_background.png';
import clear_bk_icon from 'icons/remove_background.png';
import { ButtonGroup, Tooltip } from '@mui/material';

interface ManageBackgroundProps {
    canvasRef: React.RefObject<fabric.Canvas | null>;
}

export const ManageBackground: React.FC<ManageBackgroundProps> = ({
    canvasRef,
}) => {

    const onSetAsBackground = async () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const image = canvas.getActiveObject();
        if (!image) return;

        canvas.backgroundImage = await image.clone(); // Need to clone the instance, cannot use the existing one (does not work)
        canvas.remove(image);
        canvas.renderAll();
    }

    const onRemoveBackground = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.backgroundImage = undefined;
        canvas.renderAll();
    }

    const add_bk_text = "Set as background";
    const remove_bk_text = "Remove background";

    return (
        <ButtonGroup>
            <Tooltip title={add_bk_text}>
                <Button onClick={onSetAsBackground} variant="contained" startIcon={<img src={set_bk_icon} alt={add_bk_text} className="toolbar-icon" />}>
                    {add_bk_text}
                </Button>
            </Tooltip>
            <Tooltip title={remove_bk_text}>
                <Button onClick={onRemoveBackground} variant="contained" startIcon={<img src={clear_bk_icon} alt={remove_bk_text} className="toolbar-icon" />}>
                    {remove_bk_text}
                </Button>
            </Tooltip>
        </ButtonGroup>
    );
};
