"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function canvasToImg(canvas) {
    var img = document.createElement("img");
    return new Promise(function (resolve, reject) {
        canvas.toBlob(function (blob) {
            var src = URL.createObjectURL(blob);
            img.src = src;
            img.onload = function () {
                URL.revokeObjectURL(src);
                resolve(img);
            };
        });
    });
    // img.src=canvas.toDataURL();
    // return img;
}
exports.canvasToImg = canvasToImg;
function cropCanvas(canvas, rect) {
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
    var newCanvas = document.createElement("canvas");
    newCanvas.width = rect.width;
    newCanvas.height = rect.height;
    var ctx = newCanvas.getContext("2d");
    if (ctx) {
        ctx.drawImage(canvas, rect.left, rect.top, rect.width, rect.height, 0, 0, rect.width, rect.height);
    }
    return newCanvas;
}
exports.cropCanvas = cropCanvas;
// export function canvasToFabricImage(canvas: HTMLCanvasElement): Promise<fabric.Image> {
//   return canvasToImgUrl(canvas)
//     .then(imgUrlToFabricImage)
// }
function canvasToImgUrl(canvas) {
    return new Promise(function (resolve, reject) {
        canvas.toBlob(function (blob) {
            var src = URL.createObjectURL(blob);
            resolve(src);
        });
    });
}
exports.canvasToImgUrl = canvasToImgUrl;
// export function imgUrlToFabricImage(url: string): Promise<fabric.Image> {
//   return new Promise<fabric.Image>((resolve, reject) => {
//     window.fabric.Image.fromURL(url, (img) => {
//       // URL.revokeObjectURL(src);
//       resolve(img);
//     });
//   })
// }
function svgToUrl(svgData) {
    var svg = new Blob([svgData], { type: "image/svg+xml" });
    return URL.createObjectURL(svg);
}
exports.svgToUrl = svgToUrl;
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/psdetch-utils/src/canvas.js.map