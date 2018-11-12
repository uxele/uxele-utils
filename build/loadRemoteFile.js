"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = __importStar(require("path"));
var uxele_core_1 = require("uxele-core");
function loadRemoteFile(params) {
    var rtn = new uxele_core_1.Progress();
    var xhr = new XMLHttpRequest();
    var url = params.url.trim();
    var filename = path.basename(url);
    xhr.open("GET", url, true);
    if (params.header) {
        for (var key in params.header) {
            if (params.hasOwnProperty(key)) {
                xhr.setRequestHeader(key, params.header[key]);
            }
        }
    }
    xhr.responseType = "arraybuffer";
    xhr.addEventListener("load", function () {
        if (xhr.status !== 200) {
            rtn.error(new Error(xhr.statusText));
            // dlg.alert("Error happened while downloading psd file.\n " + xhr.responseText);
        }
        else {
            // dlg.open(dlg.tmpl.psdParsing);
            // setTimeout(function () {
            var contentType = xhr.getResponseHeader("content-type");
            var mime = contentType ? contentType.split(";")[0] : "unknown";
            var f = new Blob([xhr.response], {
                type: mime,
            });
            rtn.complete({
                meta: {
                    name: filename,
                    mime: f.type,
                },
                file: f,
            });
        }
        // $rootScope.$broadcast("load_file", new File([xhr.response], params.fileName));
        // }, 100);
    });
    xhr.addEventListener("progress", function (evt) {
        if (evt.lengthComputable) {
            rtn.progress(evt.loaded / evt.total);
        }
    });
    xhr.send();
    return rtn;
}
exports.loadRemoteFile = loadRemoteFile;
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/uxele-utils/src/loadRemoteFile.js.map