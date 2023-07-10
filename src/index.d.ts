interface FileData {
  filename: string;
  mimetype: string;
  encoding: string;
  content: string;
}

export declare const base64ToArrayBuffer: (base64: string) => ArrayBufferLike;
export declare const handleDownload: (data: { file: FileData }) => void;
