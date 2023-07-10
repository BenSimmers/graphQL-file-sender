export declare function base64ToArrayBuffer(base64: string): ArrayBuffer;

export declare function handleDownload(data: { file: FileData }): void;

export interface FileData {
  filename: string;
  mimetype: string;
  encoding: string;
  content: string;
}
