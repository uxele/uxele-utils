"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Clipboard = require("clipboard");
function copyToClipboard(txt) {
    var btn = document.createElement("button");
    var c = new Clipboard(btn, {
        text: function () {
            return txt;
        }
    });
    btn.click();
    c.destroy();
}
exports.copyToClipboard = copyToClipboard;
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/uxele-utils/src/copyToClipboard.js.map