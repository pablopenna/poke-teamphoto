import { MainClient, PokemonSprites, VersionSprites } from 'pokenode-ts';

import { getImageUrlAsBase64 } from '../utils';

const pokeApi = new MainClient();

export const fetchDefaultFrontPokeSprite = async (pokeId: string) => {
  let sprite;

  const data = await pokeApi.pokemon.getPokemonByName(pokeId);
  const spriteUrl = data.sprites.front_default!;
  sprite = await getImageUrlAsBase64(spriteUrl);

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

  const sprite = await getImageUrlAsBase64(spriteUrl);
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

  const sprite = await getImageUrlAsBase64(spriteUrl);
  return sprite;
};
