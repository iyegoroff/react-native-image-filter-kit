import { generatedImage, inputImage } from "./image-names";

export const filter = (paramMap, imageNames = [inputImage]) => ({
  paramNames: Object.keys(paramMap),
  paramTypes: Object.values(paramMap),
  imageNames
});

export const generator = (paramMap) => filter(paramMap, [generatedImage]);
