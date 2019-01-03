"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var build_1 = require("uxele-core/build");
var gridMargin = 20;
var itemPerRow = 4;
/**
 * scan all pages and prepare the layout:
 * 1. pages that has offsetx and offsety will be rendered in group 1
 * 2. other pages with not offset will be rendered in group 2 in a 4*n grid system
 * 3. each page will render its name and preview
 */
function pagesToLayout(pages) {
    var rectA;
    var dynamicRects = [];
    var rtn = [];
    var pagesA = [];
    var pagesB = [];
    pages.forEach(function (page) {
        if (page.offsetX !== undefined && page.offsetY !== undefined) {
            pagesA.push(page);
        }
        else {
            pagesB.push(page);
        }
    });
    pagesA.forEach(function (page) {
        var rect = new build_1.Rect(page.offsetX, page.offsetY, page.offsetX + page.width, page.offsetY + page.height);
        if (rectA) {
            rectA = rectA.combine(rect);
        }
        else {
            rectA = rect;
        }
        rtn.push({
            page: page,
            rect: rect
        });
    });
    if (rectA) {
        if (rectA.left !== 0 || rectA.top !== 0) {
            for (var _i = 0, rtn_1 = rtn; _i < rtn_1.length; _i++) {
                var item = rtn_1[_i];
                item.rect = item.rect.pan(-rectA.left, -rectA.top);
            }
            rectA = rectA.pan(-rectA.left, -rectA.top);
        }
    }
    pagesB.forEach(function (page) {
        var nextOffset = nextGridSlot(dynamicRects);
        if (rectA) {
            nextOffset.y += rectA.height;
        }
        var rect = new build_1.Rect(nextOffset.x, nextOffset.y, page.width, page.height);
        dynamicRects.push(rect);
        rtn.push({
            page: page,
            rect: rect
        });
    });
    return rtn;
}
exports.pagesToLayout = pagesToLayout;
function nextGridSlot(grid) {
    var rowNum = Math.floor(grid.length / itemPerRow);
    var colNum = grid.length % itemPerRow;
    var x = grid.slice(rowNum * itemPerRow).reduce(function (lastLeft, item) { return lastLeft + item.width + gridMargin; }, 0);
    var y = 0;
    if (colNum > 0) {
        y = grid[rowNum * itemPerRow + colNum - 1].top;
    }
    else {
        for (var i = 0; i < rowNum; i++) {
            for (var j = 0; j < itemPerRow; j++) {
                var item = grid[i * itemPerRow + j];
                y = Math.max(y, item.top + item.height);
            }
            y += gridMargin;
        }
    }
    return { x: x, y: y };
}
exports.nextGridSlot = nextGridSlot;
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/uxele-utils/src/pageCanvasLayout.js.map