// types.d.ts
export {};

/**
 * 由 WebView.addJavascriptInterface 注入的 JavaScript 接口
 */
declare const iftc: {
    showToast(msg: string): void;
    isExist(path: string): boolean;
    isDir(path: string): boolean;
    fileSize(path: string): number;
    folderSize(path: string, callbackFun: string): void;
    readFile(path: string): string;
    readFileChunk(path: string, chunkSize: number, index: number): string;
    writeFile(path: string, base64: string): boolean;
    appendFile(path: string, base64: string): boolean;
    isExist(path: string): boolean;
    deleteFile(path: string): boolean;
    listFile(path: string): string;
    // ... 其他方法
};
/**
 * globalThis 中 vvbrowser 对象
 */
declare global {
    interface Window {
        vvbrowser: {
            version: {
                browser: {
                    name: string;
                    code: number;
                };
                webview: string;
            };
            toast: (msg?: string) => void;
            File: {
                new (path?: string): VvBrowserFile;
                prototype: VvBrowserFile;
            };
        };
    }
    interface VvBrowserFile {
        path: string;
        read(): Promise<Blob | null>;
        write(blob: Blob): Promise<boolean>;
        append(blob: Blob): Promise<boolean>;
        delete(): boolean;
        exist(): boolean;
        /**
         * 为文件时，同步返回文件大小
         * 为目录时，异步返回目录大小
         */
        size(): number | Promise<number>;
        isDir(): boolean;
        isFile(): boolean;
        lastModified(): number;
        list(): string[] | null;
        toString(): string;
    }
}
