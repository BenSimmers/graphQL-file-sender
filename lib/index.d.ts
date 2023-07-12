export declare const GET_FILE: import("@apollo/client").DocumentNode;
export declare function base64ToArrayBuffer(base64: string): ArrayBufferLike;
export declare function handleDownload(data: any): void;
/**
 *
 * @param filename - filename to deconstruct
 * @returns - file object or empty object
 */
export declare function deconstructFile(filename: any): {
    filename: any;
    mimetype: any;
    encoding: string;
    content: string;
} | {
    filename: string;
    mimetype: string;
    encoding: string;
    content: string;
};
export declare function FileTypeSchema(): string;
declare const _default: {
    handleDownload: typeof handleDownload;
    deconstructFile: typeof deconstructFile;
    FileTypeSchema: typeof FileTypeSchema;
};
export default _default;
