import React, { useEffect } from 'react';
import { fetchPokeSprite } from '../api';
import * as fabric from 'fabric';
import Button from '@mui/material/Button';

interface SpriteFetcherProps {
    canvasRef: React.RefObject<fabric.Canvas | null>;
}

export const SpriteFetcher: React.FC<SpriteFetcherProps> = ({
    canvasRef
}) => {

    const getPokeSprite = (id: string) => {
        fetchPokeSprite(id).then(onSpriteDataFetched);
    }

    const onSpriteDataFetched = (sprite: string | undefined) => {
        if(!sprite) {
            return;
        }

        const canvas = canvasRef.current;
        if(!canvas) {
            return;
        }

        fabric.FabricImage.fromURL(sprite).then((image) => {
            canvas.add(image);
        });
    }

    return (<Button variant="contained" onClick={() => getPokeSprite("ditto")}>Get Poke</Button>);
}
