import { Rect } from "uxele-core";
import { lang } from "uxele-i18n";
export type CanvasExportFormat = "image/png" | "image/jpeg" | "image/webp";
export function canvasToImg(canvas: HTMLCanvasElement): Promise<HTMLImageElement> {
  const img = document.createElement("img");
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob){
        const src = URL.createObjectURL(blob);
        img.src = src;
        img.onload = () => {
          // URL.revokeObjectURL(src);
          resolve(img);
        };
      }else{
        reject(lang("error_canvas_convert_file_fail","PNG","Blob returned as null."));
      }
    });
  })

  // img.src=canvas.toDataURL();
  // return img;
}

export async function svgToCanvas(svg:string, scale:number):Promise<HTMLCanvasElement>{
  return new Promise<HTMLCanvasElement>((resolve,reject)=>{
    const img=new Image();
    img.src=svgToUrl(svg);
    img.onload=()=>{
      const width=img.width*scale;
      const height=img.height*scale;
      const canvas=document.createElement("canvas");
      canvas.width=width;
      canvas.height=height;
      const ctx=canvas.getContext("2d")!;
      ctx.drawImage(img,0,0,width,height);
      resolve(canvas);
    }
  });

}
export async function canvasToFile(canvas: HTMLCanvasElement, name: string, format: CanvasExportFormat, quality: number): Promise<File> {
  return new Promise<File>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob){
        const f = new File([blob], name, { type: format });
        resolve(f);
      }else{
        reject(lang("error_canvas_convert_file_fail",format,"Blob returned as null."));
      }
      
    }, format, quality);
  });
}
export function zoomImg(img: HTMLImageElement, zoom: number): Promise<HTMLImageElement> {
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth * zoom;
  canvas.height = img.naturalHeight * zoom;
  const ctx = canvas.getContext("2d");
  ctx!.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvasToImg(canvas);
}
export function cropCanvas(canvas: HTMLCanvasElement, rect: Rect): HTMLCanvasElement {
  // if (rect.right > canvas.width) {
  //   rect.right = canvas.width;
  // }
  // if (rect.left < 0) {
  //   rect.left = 0;
  // }
  // if (rect.top < 0) {
  //   rect.top = 0;
  // }
  // if (rect.bottom > canvas.height) {
  //   rect.bottom = canvas.height;
  // }
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
export function imgToCanvas(img: HTMLImageElement): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0);
  return canvas;
}

export function scaleCanvas(oriCanvas: HTMLCanvasElement, scale: number,smooth:boolean=true): HTMLCanvasElement {
  if (scale === 1){
    return oriCanvas;
  }
  const rtn = document.createElement("canvas");
  rtn.width = oriCanvas.width * scale;
  rtn.height = oriCanvas.height * scale;
  const ctx = rtn.getContext("2d")!;
  if (!smooth){
    ctx.imageSmoothingEnabled=false;
    ctx.webkitImageSmoothingEnabled=false;
    ctx.mozImageSmoothingEnabled=false;
    const style=rtn.style as any;
    style["image-rendering"]="auto";
    style["image-rendering"]="crisp-edges";
    style["image-rendering"]="pixelated";
  }
  ctx.drawImage(oriCanvas, 0, 0, oriCanvas.width, oriCanvas.height, 0, 0, rtn.width, rtn.height);
  return rtn;
}