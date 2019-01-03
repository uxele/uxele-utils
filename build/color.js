"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
exports.rgbToHex = rgbToHex;
var numReg = /\d+/g;
function rgbStrToHex(rgb) {
    if (!rgb) {
        return rgbToHex(0, 0, 0);
    }
    var matches = rgb.match(numReg);
    if (matches) {
        return rgbToHex(parseInt(matches[0]), parseInt(matches[1]), parseInt(matches[2]));
    }
    else {
        return "";
    }
}
exports.rgbStrToHex = rgbStrToHex;
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/uxele-utils/src/color.js.map