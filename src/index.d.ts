export declare const base64ToArrayBuffer: (base64: string) => ArrayBufferLike;
export declare const handleDownload: (data: {
  file: {
    filename: string;
    content: string;
    mimetype: string;
  };
}) => void;
