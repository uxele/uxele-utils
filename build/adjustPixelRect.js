"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uxele_core_1 = require("uxele-core");
function adjustPixelRect(rect, c) {
    var trimRect = trimOffsetCanvas(c);
    if (trimRect) {
        return rect.clampedRelativeRect(trimRect);
    }
    return rect;
}
exports.adjustPixelRect = adjustPixelRect;
function trimCanvas(c) {
    var trimRect = trimOffsetCanvas(c);
    if (trimRect) {
        var newCanvas = document.createElement("canvas");
        newCanvas.width = trimRect.width;
        newCanvas.height = trimRect.height;
        var ctx = newCanvas.getContext("2d");
        ctx.drawImage(c, trimRect.left, trimRect.top, trimRect.width, trimRect.height, 0, 0, trimRect.width, trimRect.height);
        return newCanvas;
    }
    else {
        return c;
    }
}
exports.trimCanvas = trimCanvas;
function trimOffsetCanvas(c) {
    var ctx = c.getContext("2d");
    var width = c.width;
    var height = c.height;
    if (width === 0 || height === 0) {
        return undefined;
    }
    var imgData = ctx.getImageData(0, 0, width, height).data;
    var newTop = 0;
    var newLeft = 0;
    // here use fake bottom and right (bottom -1) as bottom / right edge has no pixels. 
    // https://developer.android.com/reference/android/graphics/Rect.html#contains(int,%20int)
    var newBottom = height - 1;
    var newRight = width - 1;
    for (newTop = 0; newTop < height; newTop++) {
        var hasPixel = false;
        for (var j = 0; j < width; j++) {
            var pos = (newTop * width + j) * 4;
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
        var hasPixel = false;
        for (var i = 0; i < height; i++) {
            var pos = (i * width + newLeft) * 4;
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
        var hasPixel = false;
        for (var j = 0; j < width; j++) {
            var pos = (newBottom * width + j) * 4;
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
        var hasPixel = false;
        for (var i = 0; i < height; i++) {
            var pos = (i * width + newRight) * 4;
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
        return new uxele_core_1.Rect(newLeft, newTop, newRight + 1, newBottom + 1);
    }
    // if no trim need/ return null
    return undefined;
}
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/uxele-utils/src/adjustPixelRect.js.map