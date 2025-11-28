import React from 'react';
import * as fabric from 'fabric';
import Button from '@mui/material/Button';
import { HBox } from '../../common/layout';

interface ManageBackgroundProps {
    canvasRef: React.RefObject<fabric.Canvas | null>;
}

export const ManageBackground: React.FC<ManageBackgroundProps> = ({
    canvasRef,
}) => {

    const onAddBackground = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const background = new fabric.Rect({
            left: 0,
            top: 0,
            width: 1000,
            height: 1000,
            fill: 'green',
        });
    
        canvas.backgroundImage = background;
        canvas.set("backgroundImage", background);
    }

    const onRemoveBackground = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.backgroundImage = undefined;
    }

    return (
        <HBox className="slightly-gapped">
            <Button onClick={onAddBackground}>
                Set background
            </Button>
            <Button onClick={onRemoveBackground}>
                Remove background
            </Button>
        </HBox>
    );
};
