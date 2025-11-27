import React from 'react';
import Button from '@mui/material/Button';
import { Dimensions } from '../../types';
import { InputAdornment, TextField } from '@mui/material';
import { HBox } from '../common/layout';

interface CanvasDimensionsSelectorProps {
    dimensions: Dimensions
    setDimensions: (d: Dimensions) => void;
}

export const CanvasDimensionsSelector: React.FC<CanvasDimensionsSelectorProps> = ({
    dimensions,
    setDimensions,
}) => {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newDimensions = Object.fromEntries((formData as any).entries()) as unknown as Dimensions;

        setDimensions(newDimensions);
    };

    return (
        <HBox className="slightly-gapped">
            <form onSubmit={handleSubmit} id="dimensions-form">
                <HBox className="slightly-gapped">
                    <TextField
                        required={true}
                        defaultValue={dimensions.width}
                        margin="dense"
                        name="width"
                        label="Horizontal Canvas Size"
                        type="number"
                        slotProps={{
                            input: {
                                startAdornment: <InputAdornment position="start">px</InputAdornment>,
                            },
                        }}
                    />
                    <TextField
                        required={true}
                        defaultValue={dimensions.height}
                        margin="dense"
                        name="height"
                        label="Vertical Canvas Size"
                        type="number"
                        slotProps={{
                            input: {
                                startAdornment: <InputAdornment position="start">px</InputAdornment>,
                            },
                        }}
                    />
                </HBox>
            </form>
            <Button type="submit" form="dimensions-form">
                Apply
            </Button>
        </HBox>);
}
