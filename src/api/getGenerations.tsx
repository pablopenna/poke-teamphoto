import { MainClient } from 'pokenode-ts';

const pokeApi = new MainClient();

export const fetchAllGenerations = async () => {
    const data = (await pokeApi.game.listGenerations()).results;
    const genNames = data.map(e => e.name);
    return genNames;
};

export const fetchAvailableGenerationsForPokemonSprite = async (pokeId: string) => {
    const data = await pokeApi.pokemon.getPokemonByName(pokeId);
    if(!data) return;

    return Object.keys(data.sprites.versions);
};
