import { IFileBlob, Progress } from "uxele-core";
export interface ILoadRemoteFileOption {
    url: string;
    header?: {
        [key: string]: string;
    };
}
export interface IRemoteFile {
    name: string;
    data: Blob;
}
export declare function loadRemoteFile(params: ILoadRemoteFileOption): Progress<IFileBlob>;
