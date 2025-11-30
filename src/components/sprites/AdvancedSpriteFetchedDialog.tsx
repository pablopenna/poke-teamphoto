import React, { useEffect, useState } from 'react';
import * as fabric from 'fabric';
import { fetchVersionGroupNamesForPokemonSprite, fetchAllSpriteUrlsForPokemonVersionGroup } from '../../api';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { getImageUrlAsBase64 } from '../../utils';
import { Flexbox, VBox } from '../common/layout';


export interface AdvancedSpriteAddDialogProps {
    canvasRef: React.RefObject<fabric.Canvas | null>;
    isOpen: boolean;
    onClose: () => void;
}

export const AdvancedSpriteAddDialog = (props: AdvancedSpriteAddDialogProps) => {
    const { canvasRef, onClose, isOpen } = props;

    const [pokeId, setPokeId] = useState<string>("");

    const [availableVersionGroups, setAvailableVersionGroups] = useState<string[]>([]);
    const [chosenVersionGroup, setChosenVersionGroup] = useState<string>("");

    const [removeWhite, setRemoveWhite] = useState<boolean>(false);

    const [results, setResults] = useState<string[]>([]);

    const loadAvailableVersionGroups = async () => {
        if (!pokeId) return;

        fetchVersionGroupNamesForPokemonSprite(pokeId)
            .then(versionGroups => setAvailableVersionGroups(versionGroups || []))
            .catch(e => undefined);
    }

    const fetchSpriteCandidates = async () => {
        if (!chosenVersionGroup || !pokeId) return;

        fetchAllSpriteUrlsForPokemonVersionGroup(pokeId, chosenVersionGroup)
            .then(async (spriteUrls) => {
                if (!spriteUrls) return;
                const sprites: string[] = [];
                await Promise.all(
                    spriteUrls.map(async (url) => {
                        if (!url) return;
                        //@ts-ignore
                        const image = await getImageUrlAsBase64(url);
                        sprites.push(image);
                    })
                );
                setResults(sprites);
            }).catch(e => undefined);
    }

    const clearSpriteCandidates = () => setResults([]);

    useEffect(() => {
        loadAvailableVersionGroups();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pokeId]);

    useEffect(() => {
        clearSpriteCandidates();
        fetchSpriteCandidates();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pokeId, chosenVersionGroup]);


    const handleClose = () => {
        onClose();
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

    return (
        <Dialog onClose={handleClose} open={isOpen}>
            <DialogTitle>Advanced add sprite</DialogTitle>
            <DialogContent>
                <VBox className="gapped">
                    <form
                        // onSubmit={handleSubmit} 
                        id="advanced-add-form"
                    >
                        <VBox className="slightly-gapped">
                            <InputLabel>Pokémon (name or dex no.)</InputLabel>
                            <TextField
                                id="pokemon"
                                onChange={(event) => { setPokeId(event.target.value); }}
                            />
                            <InputLabel>Game</InputLabel>
                            <Select
                                id="game"
                                label="Game"
                                onChange={(event) => setChosenVersionGroup(event.target.value as string || "")}
                                value={chosenVersionGroup}
                                displayEmpty
                                required
                            >
                                <MenuItem disabled value="">
                                    <em style={{ color: 'grey' }}>Choose an option</em>
                                </MenuItem>
                                {availableVersionGroups.map((vg) => (
                                    <MenuItem value={vg}>{vg}</MenuItem>
                                ))}
                            </Select>
                            <FormControlLabel
                                control={<Checkbox
                                    value={removeWhite}
                                    onChange={(event) => setRemoveWhite(event.target.checked)}
                                />}
                                label="Replace white color with alpha"
                            />
                        </VBox>
                    </form>
                    <InputLabel>Results</InputLabel>
                    <DialogContentText>
                        Click on the Sprite you want to add to the canvas
                    </DialogContentText>
                    <Flexbox className="flex-wrap align-center">
                        {results.map((sprite, idx) => (
                            <Button
                                key={idx}
                                onClick={(_event) => {
                                    onSpriteDataFetched(sprite);
                                    handleClose();
                                }}
                            >
                                <img
                                    className="result-image"
                                    alt="pokemon"
                                    src={sprite}
                                />
                            </Button>))}
                    </Flexbox>
                </VBox>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}