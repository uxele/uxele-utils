import { ILayer, IPixelLayer, IVectorLayer, ITextLayer, IFolderLayer, IPoint } from "uxele-core";
export declare function isPixelLayer(layer: ILayer): layer is IPixelLayer;
export declare function isVectorlLayer(layer: ILayer): layer is IVectorLayer;
export declare function isTextLayer(layer: ILayer): layer is ITextLayer;
export declare function isFolderLayer(layer: ILayer): layer is IFolderLayer;
/**
 *
 * @param coords the coords that is relative to the page where layers belong to
 * @param layers the layers to search in.
 */
export declare function bestLayerByCoords(coords: IPoint, layers: ILayer[]): Promise<ILayer | undefined>;
