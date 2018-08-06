"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function testConfirm(msg, forceShow) {
    if (forceShow === void 0) { forceShow = false; }
    if (process.env.INTERACTIVE || forceShow) {
        return confirm(msg);
    }
    return true;
}
exports.testConfirm = testConfirm;
function testAlert(msg, forceShow) {
    if (forceShow === void 0) { forceShow = false; }
    if (process.env.INTERACTIVE || forceShow) {
        return alert(msg);
    }
}
exports.testAlert = testAlert;
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/psdetch-utils/src/testUtils.js.map