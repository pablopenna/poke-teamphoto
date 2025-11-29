import React, { useState } from 'react';
import { fetchDefaultFrontPokeSprite } from '../api';
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
      const filter = new fabric.filters.RemoveColor({
        threshold: 0,
      });
      image.filters.push(filter);
      image.applyFilters();

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
