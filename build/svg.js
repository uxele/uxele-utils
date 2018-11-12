"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function centerSvgStringViewBox(svg) {
    var div = document.createElement("div");
    div.innerHTML = svg;
    var svgEle = div.firstChild;
    document.body.appendChild(div);
    var viewBox = svgEle.viewBox.baseVal;
    var started = false;
    var children = svgEle.children;
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        var bbox = child.getBBox();
        if (bbox.width === 0 || bbox.height === 0) {
            continue;
        }
        if (started) {
            if (viewBox.x > bbox.x) {
                viewBox.x = bbox.x;
            }
            if (viewBox.y > bbox.y) {
                viewBox.y = bbox.y;
            }
            if (viewBox.width < bbox.width + bbox.x - viewBox.x) {
                viewBox.width = bbox.width + bbox.x - viewBox.x;
            }
            if (viewBox.height < bbox.height + bbox.y - viewBox.y) {
                viewBox.height = bbox.height + bbox.y - viewBox.y;
            }
        }
        else {
            started = true;
            viewBox.x = bbox.x;
            viewBox.y = bbox.y;
            viewBox.width = bbox.width;
            viewBox.height = bbox.height;
        }
    }
    var rtn = div.innerHTML;
    document.body.removeChild(div);
    return rtn;
}
exports.centerSvgStringViewBox = centerSvgStringViewBox;
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/psdetch-utils/src/svg.js.map