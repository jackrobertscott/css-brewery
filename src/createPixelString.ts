/**
 * Converts an array of numbers into a string where each number is suffixed with 'px', representing pixel values.
 * This is commonly used for CSS styling.
 *
 * @param pixelArray - A rest parameter that takes multiple numbers representing pixel values.
 * @returns A string with each number converted to a pixel value, separated by spaces.
 */
export function createPixelString(...pixelArray: number[]): string {
  return pixelArray.map((i) => `${i}px`).join(" ")
}
