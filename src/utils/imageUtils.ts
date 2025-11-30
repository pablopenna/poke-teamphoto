import axios from "axios";

export const getImageUrlAsBase64 = async (imageUrl: string): Promise<string> => {
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

export const convertImageBinaryToBase64 = async (imageBin: Blob): Promise<string> => {
    // Create a FileReader to convert the Blob into a Base64 string
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onloadend = () => {
            // Resolve the Base64 data (reader.result is the Base64 string)
            resolve(reader.result as string);
        };
        reader.onerror = reject;

        // Read the Blob as a Data URL (Base64 string)
        reader.readAsDataURL(imageBin);
    });
};