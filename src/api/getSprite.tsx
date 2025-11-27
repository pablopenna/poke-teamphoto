import axios from 'axios';

const apiUrlTemplate = 'https://pokeapi.co/api/v2/pokemon/{id}';

// GET request
export const fetchData = async (pokeId: string = 'ditto') => {
    const url = apiUrlTemplate.replace('{id}', pokeId);
    let sprite;
    try {
        const response = await axios.get(url);
        console.log('Response:', response.data);
        
        const spriteUrl = response.data.sprites.front_default;
        sprite = await getImageAsBase64(spriteUrl)
    } catch (error) {
        console.error('Error:', error);
    } finally {
        return sprite;
    }
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

// POST request
const sendData = async (pokeId: string, data: object) => {
    const url = apiUrlTemplate.replace('{id}', pokeId);
    try {
        const response = await axios.post(url, data);
        console.log('Data sent:', response.data);
    } catch (error) {
        console.error('Error:', error);
    }
}
