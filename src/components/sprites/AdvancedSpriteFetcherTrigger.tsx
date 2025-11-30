import React, { useState } from 'react';
import * as fabric from 'fabric';
import { Button } from '@mui/material';
import { Flexbox } from '../common/layout';
import { AdvancedSpriteAddDialog } from './AdvancedSpriteFetchedDialog';


interface AdvancedSpriteFetcherTrigger {
    canvasRef: React.RefObject<fabric.Canvas | null>;
}

export const AdvancedSpriteFetcherTrigger: React.FC<AdvancedSpriteFetcherTrigger> = ({ canvasRef }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleClickOpen = () => setIsOpen(true);

    return (
        <Flexbox className="align-center">
            <Button className="default-input-height" variant="contained" onClick={handleClickOpen}>
                Advanced Add
            </Button>
            <AdvancedSpriteAddDialog
                canvasRef={canvasRef}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </Flexbox>
    );
};
