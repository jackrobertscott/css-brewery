export function createPixelString(...pixelArray: number[]) {
  return pixelArray.map((i) => i + "px").join(" ")
}
