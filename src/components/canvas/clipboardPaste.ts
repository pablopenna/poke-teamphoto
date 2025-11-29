import * as fabric from 'fabric';

export const setupClipboardPaste = (canvas: fabric.Canvas) => {
  const handlePaste = async (event: ClipboardEvent) => {
    // Check if clipboard contains image data
    if (!event.clipboardData || !event.clipboardData.items) return;

    // Find image in clipboard items
    const items = event.clipboardData.items;
    let imageItem: DataTransferItem | null = null;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        imageItem = items[i];
        break;
      }
    }

    if (!imageItem) return;

    // Prevent default paste behavior
    event.preventDefault();

    // Get the image file from clipboard
    const file = imageItem.getAsFile();
    if (!file) return;

    try {
      // Convert file to data URL
      const dataURL = await fileToDataURL(file);
      
      // Create Fabric.js image from data URL
      fabric.FabricImage.fromURL(dataURL).then((img) => {
        if (!img) return;

        // Center the image on canvas
        img.imageSmoothing = false;
        img.set({
          left: canvas.getWidth() / 2 - img.width! / 2,
          top: canvas.getHeight() / 2 - img.height! / 2,
          scaleX: 1,
          scaleY: 1
        });

        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
      });
    } catch (error) {
      console.error('Error pasting image:', error);
    }
  };

  // Add event listener
  document.addEventListener('paste', handlePaste);

  // Return cleanup function
  return () => {
    document.removeEventListener('paste', handlePaste);
  };
};

// Helper function to convert file to data URL
const fileToDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};