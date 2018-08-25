import { Rect } from "psdetch-core";
export declare function canvasToImg(canvas: HTMLCanvasElement): Promise<HTMLImageElement>;
export declare function zoomImg(img: HTMLImageElement, zoom: number): Promise<HTMLImageElement>;
export declare function cropCanvas(canvas: HTMLCanvasElement, rect: Rect): HTMLCanvasElement;
export declare function canvasToImgUrl(canvas: HTMLCanvasElement): Promise<string>;
export declare function svgToUrl(svgData: string): string;
export declare function imgToCanvas(img: HTMLImageElement): HTMLCanvasElement;
