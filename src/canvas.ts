import { Rect } from "psdetch-core";

export function canvasToImg(canvas: HTMLCanvasElement): Promise<HTMLImageElement> {
  const img = document.createElement("img");
  return new Promise((resolve,reject)=>{
    canvas.toBlob((blob) => {
      const src = URL.createObjectURL(blob);
      img.src = src;
      img.onload = () => {
        URL.revokeObjectURL(src);
        resolve(img);
      };
    });
  })
  
  // img.src=canvas.toDataURL();
  // return img;
}

export function zoomImg(img:HTMLImageElement,zoom:number):Promise<HTMLImageElement>{
  const canvas=document.createElement("canvas");
  canvas.width=img.width*zoom;
  canvas.height=img.height*zoom;
  const ctx=canvas.getContext("2d");
  ctx!.drawImage(img,0,0,canvas.width,canvas.height);
  return canvasToImg(canvas);
}
export function cropCanvas(canvas: HTMLCanvasElement, rect: Rect): HTMLCanvasElement {
  if (rect.right > canvas.width) {
    rect.right = canvas.width;
  }
  if (rect.left < 0) {
    rect.left = 0;
  }
  if (rect.top < 0) {
    rect.top = 0;
  }
  if (rect.bottom > canvas.height) {
    rect.bottom = canvas.height;
  }
  const newCanvas = document.createElement("canvas");
  newCanvas.width = rect.width;
  newCanvas.height = rect.height;
  const ctx = newCanvas.getContext("2d");
  if (ctx) {
    ctx.drawImage(canvas, rect.left, rect.top, rect.width, rect.height, 0, 0, rect.width, rect.height);
  }
  return newCanvas;
}
// export function canvasToFabricImage(canvas: HTMLCanvasElement): Promise<fabric.Image> {
//   return canvasToImgUrl(canvas)
//     .then(imgUrlToFabricImage)

// }

export function canvasToImgUrl(canvas: HTMLCanvasElement): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    canvas.toBlob((blob) => {
      const src = URL.createObjectURL(blob);
      resolve(src);
    });
  });
}

// export function imgUrlToFabricImage(url: string): Promise<fabric.Image> {
//   return new Promise<fabric.Image>((resolve, reject) => {
//     window.fabric.Image.fromURL(url, (img) => {
//       // URL.revokeObjectURL(src);
//       resolve(img);
//     });
//   })
// }
export function svgToUrl(svgData: string): string {
  const svg = new Blob([svgData], { type: "image/svg+xml" });
  return URL.createObjectURL(svg);
}
export function imgToCanvas(img:HTMLImageElement):HTMLCanvasElement{
  const canvas=document.createElement("canvas");
  canvas.width=img.naturalWidth;
  canvas.height=img.naturalHeight;
  const ctx=canvas.getContext("2d")!;
  ctx.drawImage(img,0,0);
  return canvas;
}
