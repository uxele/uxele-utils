import { ILayer, IPixelLayer, IVectorLayer, ITextLayer, IFolderLayer, IPoint } from "uxele-core";

export function isPixelLayer(layer: ILayer): layer is IPixelLayer {
  return (layer as IPixelLayer).getPixelImg !== undefined;
}
export function isVectorlLayer(layer: ILayer): layer is IVectorLayer {
  return (layer as IVectorLayer).getSvgString !== undefined;
}

export function isTextLayer(layer: ILayer): layer is ITextLayer {
  return (layer as ITextLayer).getText !== undefined;
}

export function isFolderLayer(layer: ILayer): layer is IFolderLayer {
  return (layer as IFolderLayer).children !== undefined;
}

/**
 * 
 * @param coords the coords that is relative to the page where layers belong to
 * @param layers the layers to search in.
 */
export async function bestLayerByCoords(coords:IPoint, layers: ILayer[]): Promise<ILayer | undefined>{
  let curDist = 0;
  let curLayer: ILayer | undefined=undefined;
  const {x,y}=coords;

  for (let i = layers.length - 1; i >= 0; i--) {
    const l = layers[i];
    if (!l.visible) {
      continue;
    }
    if (!l.rect.containsCoords(x, y)) {
      continue;
    }
    let res: ILayer | undefined = l;
    if (isFolderLayer(l)){
      if (l.childrenLength>0){
        res =await bestLayerByCoords(coords, await l.children());
      }
    }
    if (!res) {
      continue;
    }
    const dist = res.rect.coordsToCenter({ x, y });
    if (!curLayer) {
      curLayer = res;
      curDist = dist;
    } else if (curLayer.rect.contains(res.rect)) {
      curLayer = res;
      curDist = dist;
    } else if (res.rect.contains(curLayer.rect)) {
      continue;
    } else if (dist <= curDist) {
      curLayer = res;
      curDist = dist;
    }
  }
  return curLayer;
}
