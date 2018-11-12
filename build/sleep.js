"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sleep(ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, ms);
    });
}
exports.sleep = sleep;
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/uxele-utils/src/sleep.js.map