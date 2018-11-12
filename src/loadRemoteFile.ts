import * as path from "path";
import { IFileBlob, Progress } from "uxele-core";
export interface ILoadRemoteFileOption {
  url: string;
  header?: { [key: string]: string };
}
export interface IRemoteFile {
  name: string;
  data: Blob;
}
export function loadRemoteFile(params: ILoadRemoteFileOption): Progress<IFileBlob> {
  const rtn = new Progress<IFileBlob>();
  const xhr = new XMLHttpRequest();
  const url = params.url.trim();
  const filename = path.basename(url);
  xhr.open("GET", url, true);
  if (params.header) {
    for (const key in params.header) {
      if (params.hasOwnProperty(key)) {
        xhr.setRequestHeader(key, params.header[key]);
      }
    }
  }
  xhr.responseType = "arraybuffer";
  xhr.addEventListener("load", () => {
    if (xhr.status !== 200) {
      rtn.error(new Error(xhr.statusText));
      // dlg.alert("Error happened while downloading psd file.\n " + xhr.responseText);
    } else {
      // dlg.open(dlg.tmpl.psdParsing);
      // setTimeout(function () {
      const contentType = xhr.getResponseHeader("content-type");
      const mime = contentType ? contentType.split(";")[0] : "unknown";
      const f = new Blob([xhr.response], {
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
  xhr.addEventListener("progress", (evt) => {
    if (evt.lengthComputable) {
      rtn.progress(evt.loaded / evt.total);
    }
  });
  xhr.send();
  return rtn;
}
