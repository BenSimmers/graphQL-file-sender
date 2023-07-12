import { DocumentNode } from "graphql";

/**
 * @description - This function converts a file to base64
 * @param base64 - base64 string
 * @returns - ArrayBufferLike
 */
export declare const base64ToArrayBuffer: (base64: string) => ArrayBufferLike;

/**
 * @description - This function handles file download
 * @param data - file data
 */
export declare const handleDownload: (data: {
  file: {
    filename: string;
    content: string;
    mimetype: string;
  };
}) => void;

/**
 * @description - This function deconstructs a file
 * @param filename - filename to deconstruct
 * @returns - file object or empty object
 */
export declare const deconstructFile: (filename: any) =>
  | {
      filename: string;
      mimetype: string;
      encoding: string;
      content: string;
    }
  | {
      filename: string;
      mimetype: string;
      encoding: string;
      content: string;
    };

/**
 * @description GraphQl query to get a file
 * @type {string}
 */
export declare const GET_FILE: DocumentNode;

/**
 * @description - This is a schema for the file type
 * @type {string}
 */
export declare const FileTypeSchema: string;