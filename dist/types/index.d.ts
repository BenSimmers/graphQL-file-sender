export interface FileData {
    filename: string;
    mimetype: string;
    encoding: string;
    content: string;
}
/**
 *  Client
 * @param base64
 * @returns
 */
export declare const base64ToArrayBuffer: (base64: string) => ArrayBufferLike;
/**
 * client
 * @param data
 * @returns
 */
export declare const handleDownload: (data: {
    file: FileData;
}) => void;
export {};
