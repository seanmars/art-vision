declare module 'colorthief' {
  type Color = [number, number, number];
  export default class ColorThief {
    static getColor: (image: string, quality: number = 10) => Promise<Color>;
    static getPalette: (image: string, colorCount: number = 10, quality: number = 10) => Promise<Color[]>;
  }
}