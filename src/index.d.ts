export declare const base64ToArrayBuffer: (base64: string) => ArrayBufferLike;
export declare const handleDownload: (data: {
  file: {
    filename: string;
    content: string;
    mimetype: string;
  };
}) => void;

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
