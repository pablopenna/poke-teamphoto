import React, { useEffect } from 'react';
import { fetchData } from '../api';
import * as fabric from 'fabric';

interface SpriteFetcherProps {
    canvasRef: React.RefObject<fabric.Canvas | null>;
}

export const SpriteFetcher: React.FC<SpriteFetcherProps> = ({
    canvasRef
}) => {

    const getPokeSprite = (id: string) => {
        fetchData(id).then(onSpriteDataFetched);
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

    return (<button onClick={() => getPokeSprite("1")}>Fetch!</button>);
}
