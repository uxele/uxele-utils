"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var uxele_i18n_1 = require("uxele-i18n");
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
function svgToCanvas(svg, scale) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var img = new Image();
                    img.src = svgToUrl(svg);
                    img.onload = function () {
                        var width = img.width * scale;
                        var height = img.height * scale;
                        var canvas = document.createElement("canvas");
                        canvas.width = width;
                        canvas.height = height;
                        var ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0, width, height);
                        resolve(canvas);
                    };
                })];
        });
    });
}
exports.svgToCanvas = svgToCanvas;
function canvasToFile(canvas, name, format, quality) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    canvas.toBlob(function (blob) {
                        if (blob) {
                            var f = new File([blob], name, { type: format });
                            resolve(f);
                        }
                        else {
                            reject(uxele_i18n_1.lang("error_canvas_convert_file_fail", format, "Blob returned as null."));
                        }
                    }, format, quality);
                })];
        });
    });
}
exports.canvasToFile = canvasToFile;
function zoomImg(img, zoom) {
    var canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth * zoom;
    canvas.height = img.naturalHeight * zoom;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvasToImg(canvas);
}
exports.zoomImg = zoomImg;
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
function imgToCanvas(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    return canvas;
}
exports.imgToCanvas = imgToCanvas;
function scaleCanvas(oriCanvas, scale) {
    var rtn = document.createElement("canvas");
    rtn.width = oriCanvas.width * scale;
    rtn.height = oriCanvas.height * scale;
    var ctx = rtn.getContext("2d");
    ctx.drawImage(oriCanvas, 0, 0, oriCanvas.width, oriCanvas.height, 0, 0, rtn.width, rtn.height);
    return rtn;
}
exports.scaleCanvas = scaleCanvas;
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/uxele-utils/src/canvas.js.map