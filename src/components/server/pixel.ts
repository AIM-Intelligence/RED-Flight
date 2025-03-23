import { createCanvas, loadImage } from 'canvas';

/**
 * Calculates the normalized RMSE between two images (0-1 range)
 * @param {Buffer} imageBuffer1 - First image as a buffer
 * @param {Buffer} imageBuffer2 - Second image as a buffer
 * @returns {Promise<number>} Normalized RMSE value (0: perfect match, 1: maximum difference)
 */
export async function calculateNormalizedRMSE(
  imageBuffer1: Buffer,
  imageBuffer2: Buffer
) {
  try {
    // Load images from buffers
    const img1 = await loadImage(imageBuffer1);
    const img2 = await loadImage(imageBuffer2);

    // Create canvas with first image dimensions
    const width = img1.width;
    const height = img1.height;
    const canvas1 = createCanvas(width, height);
    const ctx1 = canvas1.getContext('2d');
    ctx1.drawImage(img1, 0, 0, width, height);

    // Create canvas for second image (resized to match first image)
    const canvas2 = createCanvas(width, height);
    const ctx2 = canvas2.getContext('2d');
    ctx2.drawImage(img2, 0, 0, width, height);

    // Extract image data
    const imageData1 = ctx1.getImageData(0, 0, width, height);
    const imageData2 = ctx2.getImageData(0, 0, width, height);
    const data1 = imageData1.data;
    const data2 = imageData2.data;

    // Initialize sum of squared differences
    let sumSquaredDiff = 0;

    // Compare pixels (RGBA, 4 channels)
    for (let i = 0; i < data1.length; i += 4) {
      // Only consider RGB channels (exclude alpha)
      for (let c = 0; c < 3; c++) {
        const diff = data1[i + c] - data2[i + c];
        sumSquaredDiff += diff * diff;
      }
    }

    // Total pixel values (width × height × 3 RGB channels)
    const totalValues = width * height * 3;

    // Calculate MSE
    const mse = sumSquaredDiff / totalValues;

    // Calculate RMSE
    const rmse = Math.sqrt(mse);

    // Normalize (0-255 range → 0-1 range)
    // Maximum possible RMSE is 255 (comparing pure black to pure white)
    const normalizedRMSE = rmse / 255;

    return normalizedRMSE;
  } catch (error) {
    throw new Error(`Image comparison error: ${error}`);
  }
}

/**
 * Calculates similarity score between two images (1: perfect match, 0: maximum difference)
 * @param {Buffer} imageBuffer1 - First image as a buffer
 * @param {Buffer} imageBuffer2 - Second image as a buffer
 * @returns {Promise<number>} Normalized similarity score (1: perfect match, 0: maximum difference)
 */
export async function calculateSimilarityScore(
  imageBuffer1: Buffer,
  imageBuffer2: Buffer
) {
  const normalizedRMSE = await calculateNormalizedRMSE(
    imageBuffer1,
    imageBuffer2
  );
  return 1 - normalizedRMSE;
}

/**
 * Fetches an image from a URL and returns it as a buffer
 * @param {string} imageUrl - URL of the image to fetch
 * @returns {Promise<Buffer>} Image as a buffer
 */
export async function fetchImageAsBuffer(imageUrl: string): Promise<Buffer> {
  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch image: ${response.status} ${response.statusText}`
      );
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    throw new Error(`Error fetching image: ${error}`);
  }
}

/**
 * Compares an image with the reference AI-generated car image
 * @param {Buffer} imageBuffer - Image to compare as a buffer
 * @returns {Promise<{similarityScore: number, isMatch: boolean}>} Comparison results
 */
export async function compareWithReferenceImage(imageBuffer: Buffer) {
  try {
    // Reference image URL
    const referenceImageUrl =
      'https://mnkjdyduuwruvaokqowr.supabase.co/storage/v1/object/public/red-image//car-ai.png';

    // Fetch reference image
    const referenceImageBuffer = await fetchImageAsBuffer(referenceImageUrl);

    // Calculate similarity score
    const similarityScore = await calculateSimilarityScore(
      imageBuffer,
      referenceImageBuffer
    );

    // Determine if it's a match (you can adjust this threshold as needed)

    return {
      similarityScore,
    };
  } catch (error) {
    throw new Error(`Reference image comparison error: ${error}`);
  }
}
