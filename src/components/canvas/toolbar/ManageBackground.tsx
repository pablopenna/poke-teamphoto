import React from 'react';
import * as fabric from 'fabric';
import Button from '@mui/material/Button';

import { HBox } from '../../common/layout';
import backgroundImage from '../../../preloaded-images/trainer_card_placeholder_1.png';

interface ManageBackgroundProps {
    canvasRef: React.RefObject<fabric.Canvas | null>;
}

export const ManageBackground: React.FC<ManageBackgroundProps> = ({
    canvasRef,
}) => {

    const onAddBackground = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        fabric.FabricImage.fromURL(backgroundImage).then((img) => {
            img.scale(0.4);
            img.set({
                angle: 0,
            });
            
            canvas.backgroundImage = img;
            canvas.renderAll();
        });
    }

    const onRemoveBackground = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.backgroundImage = undefined;
        canvas.renderAll();
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
