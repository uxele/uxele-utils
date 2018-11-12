import { Rect } from "uxele-core";

export function adjustPixelRect(rect: Rect, c: HTMLCanvasElement): Rect {
  const trimRect = trimOffsetCanvas(c);
  if (trimRect) {
    return rect.clampedRelativeRect(trimRect);
  }
  return rect;
}
export function trimCanvas(c: HTMLCanvasElement): HTMLCanvasElement {
  const trimRect = trimOffsetCanvas(c);
  if (trimRect) {
    const newCanvas = document.createElement("canvas");
    newCanvas.width = trimRect.width;
    newCanvas.height = trimRect.height;
    const ctx = newCanvas.getContext("2d");
    ctx!.drawImage(c, trimRect.left, trimRect.top, trimRect.width, trimRect.height, 0, 0, trimRect.width, trimRect.height);
    return newCanvas;
  } else {
    return c;
  }
}
function trimOffsetCanvas(c: HTMLCanvasElement): Rect | undefined {
  const ctx = c.getContext("2d");
  const width = c.width;
  const height = c.height;
  if (width === 0 || height ===0){
    return undefined;
  }
  const imgData = ctx!.getImageData(0, 0, width, height).data;
  let newTop = 0;
  let newLeft = 0;
  // here use fake bottom and right (bottom -1) as bottom / right edge has no pixels. 
  // https://developer.android.com/reference/android/graphics/Rect.html#contains(int,%20int)
  let newBottom = height - 1;
  let newRight = width - 1;
  for (newTop = 0; newTop < height; newTop++) {
    let hasPixel = false;
    for (let j = 0; j < width; j++) {
      const pos = (newTop * width + j) * 4;
      hasPixel = imgData[pos + 3] > 0;
      if (hasPixel) {
        break;
      }
    }
    if (hasPixel) {
      newTop--;
      break;
    }
  }
  for (newLeft = 0; newLeft < width; newLeft++) {
    let hasPixel = false;
    for (let i = 0; i < height; i++) {
      const pos = (i * width + newLeft) * 4;
      hasPixel = imgData[pos + 3] > 0;
      if (hasPixel) {
        break;
      }
    }
    if (hasPixel) {
      newLeft--;
      break;
    }
  }
  for (newBottom = height - 1; newBottom >= 0; newBottom--) {
    let hasPixel = false;
    for (let j = 0; j < width; j++) {
      const pos = (newBottom * width + j) * 4;
      hasPixel = imgData[pos + 3] > 0;
      if (hasPixel) {
        break;
      }
    }
    if (hasPixel) {
      // newBottom++;
      break;
    }
  }
  for (newRight = width - 1; newRight >= 0; newRight--) {
    let hasPixel = false;
    for (let i = 0; i < height; i++) {
      const pos = (i * width + newRight) * 4;
      hasPixel = imgData[pos + 3] > 0;
      if (hasPixel) {
        break;
      }
    }
    if (hasPixel) {
      // newRight++;
      break;
    }
  }
  if (newLeft > 0 || newTop > 0 || newBottom < height - 1 || newRight < width - 1) {
    return new Rect(
      newLeft,
      newTop,
      newRight + 1,
      newBottom + 1
    );
  }
  // if no trim need/ return null
  return undefined;
}