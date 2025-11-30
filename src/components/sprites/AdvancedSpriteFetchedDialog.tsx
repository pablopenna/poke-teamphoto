import React, { useState } from 'react';
import * as fabric from 'fabric';
import { fetchDefaultFrontPokeSprite } from '../../api';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';


export interface AdvancedSpriteAddDialogProps {
    canvasRef: React.RefObject<fabric.Canvas | null>;
    isOpen: boolean;
    onClose: () => void;
}

export const AdvancedSpriteAddDialog = (props: AdvancedSpriteAddDialogProps) => {
    const { canvasRef, onClose, isOpen } = props;

    const handleClose = () => {
        onClose();
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        const email = formJson.email;
        console.log(email);
        handleClose();
    };

    const [pokeId, setPokeId] = useState<string>();
    const [removeWhite, setRemoveWhite] = useState<boolean>(false);


    const getPokeSprite = (id: string) => {
        fetchDefaultFrontPokeSprite(id).then(onSpriteDataFetched);
        // fetchPokeSprite(
        //   id,
        //   "generation-ii",
        //   "silver",
        // ).then(onSpriteDataFetched);
    };

    const onSpriteDataFetched = (sprite: string | undefined) => {
        if (!sprite) {
            return;
        }

        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }

        fabric.FabricImage.fromURL(sprite).then((image) => {
            image.imageSmoothing = false; // remove anti-aliasing as it does not look good on pixelart

            // Remove white - gen 1 and 2 sprites do not have background transparency 
            // TODO: make it toggable.
            if (removeWhite) {
                const filter = new fabric.filters.RemoveColor({
                    color: 'white',
                    threshold: 0,
                });
                image.filters.push(filter);
                image.applyFilters();
            }

            canvas.add(image);
        });
    };

    const onAddButtonClicked = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!pokeId) {
            return;
        }

        getPokeSprite(pokeId);
    };

    return (
        <Dialog onClose={handleClose} open={isOpen}>
            <DialogTitle>Advanced add sprite</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email address here. We
                    will send updates occasionally.
                </DialogContentText>
                <form onSubmit={handleSubmit} id="subscription-form">
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" form="subscription-form">
                    Subscribe
                </Button>
            </DialogActions>
        </Dialog>
    );
}