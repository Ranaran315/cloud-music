// typings/colorthief.d.ts
declare module 'colorthief' {
  export default class ColorThief {
    getColor(
      sourceImage: HTMLImageElement | string,
      quality?: number
    ): [number, number, number]
    getPalette(
      sourceImage: HTMLImageElement | string,
      colorCount?: number,
      quality?: number
    ): [number, number, number][]
  }
}
