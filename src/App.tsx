import { useRef, useState } from 'react';
import * as fabric from 'fabric';

import { HBox, DefaultSpriteFetcher, VBox, Canvas, CanvasDimensionsSelector, CanvasToolbar, AdvancedSpriteFetcherTrigger } from './components';
import { Dimensions } from './types';

import * as logo from './preloaded-images/pokeball_v2.png';
import './App.css';
import { UserOptionsProvider } from './contexts/user-options-context';
import { Link } from '@mui/material';

const GOLDEN_RATIO = 1.61803;
const DEFAULT_HEIGHT = 400;

function App() {
  const canvasRef = useRef<fabric.Canvas | null>(null); // Create a ref for the canvas
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: DEFAULT_HEIGHT * GOLDEN_RATIO,
    height: DEFAULT_HEIGHT,
  });

  return (
    <UserOptionsProvider>
      <div className="App App-content">
        <HBox className="gapped align-center">
          <img src={logo.default} alt="pokeball" className='App-logo' />
          <h1 className='App-title'>
            PokéTeam Photo
          </h1>
        </HBox>
        <VBox className="gapped align-center">
          <HBox className="slightly-gapped align-center">
            <span>Add a pokémon to the canvas:</span>
            <DefaultSpriteFetcher canvasRef={canvasRef} />
            <AdvancedSpriteFetcherTrigger canvasRef={canvasRef} />
          </HBox>
          <VBox className="slightly-gapped align-center">
            <span>You can copy-paste trainer sprites from <Link target="_blank" href="https://play.pokemonshowdown.com/sprites/trainers/">here</Link></span>
            <span>You can also find some backgrounds <Link target="_blank" href="https://infinitefusion.fandom.com/wiki/List_of_Trainer_Card_Backgrounds">here</Link></span>
          </VBox>
          <HBox className="slightly-gapped flex-wrap">
            <div className='canvas-wrapper'>
              <Canvas canvasRef={canvasRef} dimensions={dimensions} />
            </div>
            <CanvasToolbar canvasRef={canvasRef} />
          </HBox>
          <HBox className="slightly-gapped align-center">
            <span>Set canvas size manually:</span>
            <CanvasDimensionsSelector dimensions={dimensions} setDimensions={setDimensions} />
          </HBox>
        </VBox>
      </div>
    </UserOptionsProvider >
  );
}

export default App;
