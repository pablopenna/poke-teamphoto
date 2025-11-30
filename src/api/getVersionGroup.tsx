import { MainClient } from 'pokenode-ts';

const pokeApi = new MainClient();

export const fetchAllVersionGroups = async () => {
    const data = (await pokeApi.game.listVersionGroups()).results;
    const genNames = data.map(e => e.name);
    return genNames;
};

export const fetchVersionGroupsForGeneration = async (generation: string) => {
    const genData = (await pokeApi.game.getGenerationByName(generation));
    const vgData = genData.version_groups;
    const vgNames = vgData.map(e => e.name);

    return vgNames;
}

export const fetchVersionGroupNamesForPokemonSprite = async (pokeId: string) => {
    const data = await pokeApi.pokemon.getPokemonByName(pokeId);
    if (!data) return;

    const generations = data.sprites.versions;
    const versionGroupNames = Object.values(generations).flatMap((gen => Object.keys(gen)));
    return versionGroupNames;
};

export const fetchAllSpriteUrlsForPokemonVersionGroup = async (pokeId: string, targetVersionGroup: string) => {
    const data = await pokeApi.pokemon.getPokemonByName(pokeId);
    if (!data) return;

    const generations = data.sprites.versions;

    const versionGroupsWithSpriteData: Record<string, Record<string, string | object>> = {};
    Object.values(generations).forEach((generation) => {
        Object.entries(generation).forEach(([versionGroup, spriteData]) => {
            //@ts-ignore
            versionGroupsWithSpriteData[versionGroup] = spriteData;
        })
    });

    //@ts-ignore
    const targetVersionGroupWithSpriteData = versionGroupsWithSpriteData[targetVersionGroup];

    // Some instances like black-white have also an animated object containing more URLs
    const parsedSpriteData: Record<string, string> = {}
    for(let key in targetVersionGroupWithSpriteData) {
        const value = targetVersionGroupWithSpriteData[key];
        if(value == null) continue;
        if(typeof value === 'object') {
		    const nestedObject = value as Record<string, string>;
            for(let subkey in nestedObject) {
                parsedSpriteData[key+subkey] = nestedObject[subkey];
            }
        } else {
            parsedSpriteData[key] = value;
        }
    }

    const spriteUrls = Object.values(parsedSpriteData).filter((url) => url != null);

    return spriteUrls;
};
