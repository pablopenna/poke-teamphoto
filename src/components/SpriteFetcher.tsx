import React, { useState } from 'react';
import { fetchPokeSprite } from '../api';
import * as fabric from 'fabric';
import Button from '@mui/material/Button';
import { HBox } from './common/layout';
import { TextField } from '@mui/material';

interface SpriteFetcherProps {
  canvasRef: React.RefObject<fabric.Canvas | null>;
}

export const SpriteFetcher: React.FC<SpriteFetcherProps> = ({ canvasRef }) => {

  const [pokeId, setPokeId] = useState<string>();

  const getPokeSprite = (id: string) => {
    fetchPokeSprite(id).then(onSpriteDataFetched);
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
      canvas.add(image);
    });
  };

  const onAddButtonClicked = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if(!pokeId) {
      return;
    }

    getPokeSprite(pokeId);
  };

  return (
    <HBox className="slightly-gapped">
      <TextField 
        label="Name or Dex no." 
        value={pokeId} 
        onChange={(event) => {
          const value = event.target.value;
          setPokeId(value);
        }}
      />
      <Button variant="contained" onClick={onAddButtonClicked}>
        Add
      </Button>
    </HBox>
  );
};
