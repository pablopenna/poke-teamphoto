import axios from 'axios';
import { MainClient, PokemonSprites, VersionSprites } from 'pokenode-ts';

const pokeApi = new MainClient();

export const fetchAllPokes = async () => {
  const data = await pokeApi.pokemon.listPokemons(0, 100);
  return data;
};

export const fetchPokesInGen = async (generation: number) => {
  const gen = await pokeApi.game.getGenerationById(generation);
  return gen.pokemon_species;
};

export const fetchDefaultFrontPokeSprite = async (pokeId: string) => {
  let sprite;

  const data = await pokeApi.pokemon.getPokemonByName(pokeId);
  const spriteUrl = data.sprites.front_default!;
  sprite = await getImageAsBase64(spriteUrl);

  return sprite;
};

export type PokemonDefaultSpriteType = keyof Omit<PokemonSprites, "other" | "versions">;

export type PokemonSpriteVersion = keyof VersionSprites;

// type AllKeys<T> = T extends object
//   ? { [K in keyof T]: K | AllKeys<T[K]> }[keyof T]
//   : never;

type LeafKeys<T> = T extends object
  ? {
    [K in keyof T]: T[K] extends object
    ? LeafKeys<T[K]>
    : K
  }[keyof T]
  : never;

export type PokemonSpriteType = LeafKeys<VersionSprites>;
export type PokemonSpriteGame = string; // TODO


export const fetchDefaultPokeSprite = async (pokeId: string, spriteType: PokemonDefaultSpriteType) => {
  const pokemon = await pokeApi.pokemon.getPokemonByName(pokeId);
  const spriteUrl = pokemon.sprites[spriteType];
  if (!spriteUrl) return;

  const sprite = await getImageAsBase64(spriteUrl);
  return sprite;
};

export const fetchPokeSprite = async (
  pokeId: string, 
  version: PokemonSpriteVersion,
  game: PokemonSpriteGame,
  type: PokemonSpriteType = "front_default",
  isAnimated: boolean = true
) => {
  const pokemon = await pokeApi.pokemon.getPokemonByName(pokeId);
  const spriteVersion = pokemon.sprites.versions[version];
  // @ts-ignore
  const spriteGame = spriteVersion[game];
  const spriteUrl = isAnimated && spriteGame.animated != null ? spriteGame.animated[type] : spriteGame[type];
  
  if (!spriteUrl) return;

  const sprite = await getImageAsBase64(spriteUrl);
  return sprite;
};


// Function to convert an image URL to Base64
const getImageAsBase64 = async (imageUrl: string): Promise<string> => {
  try {
    // Fetch the image as a Blob using axios
    const response = await axios.get(imageUrl, {
      responseType: 'blob', // Specify that we want to fetch the image as a Blob
    });

    // Create a FileReader to convert the Blob into a Base64 string
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        // Resolve the Base64 data (reader.result is the Base64 string)
        resolve(reader.result as string);
      };
      reader.onerror = reject;

      // Read the Blob as a Data URL (Base64 string)
      reader.readAsDataURL(response.data);
    });
  } catch (error) {
    console.error('Error fetching image as base64:', error);
    throw new Error('Failed to fetch image');
  }
};
