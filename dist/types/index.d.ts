export declare const GET_FILE: import("@apollo/client").DocumentNode;
export declare const base64ToArrayBuffer: (base64: string) => ArrayBufferLike;
export declare const handleDownload: (data: {
    file: {
        filename: string;
        content: string;
        mimetype: string;
    };
}) => void;
/**
 *
 * @param filename - filename to deconstruct
 * @returns - file object or empty object
 */
export declare const deconstructFile: (filename: any) => {
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
export declare const FileTypeSchema = "\n  type File {\n    filename: String!\n    mimetype: String!\n    encoding: String!\n    content: String!\n  }\n";
