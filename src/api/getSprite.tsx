import axios from 'axios';
import { MainClient } from 'pokenode-ts';

const apiUrlTemplate = 'https://pokeapi.co/api/v2/pokemon/{id}';

const pokeApi = new MainClient();

export const fetchAllPokes = async () => {
  const data = await pokeApi.pokemon.listPokemons(0, 100);
  return data;
}

export const fetchPokesInGen = async (generation: number) => {
  const gen = await pokeApi.game.getGenerationById(generation);
  return gen.pokemon_species;
}

export const fetchPokeSprite = async (pokeId: string) => {
  let sprite;

  const data = await pokeApi.pokemon.getPokemonByName(pokeId);
  const spriteUrl = data.sprites.front_default!;
  sprite = await getImageAsBase64(spriteUrl)

  return sprite;
}

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
