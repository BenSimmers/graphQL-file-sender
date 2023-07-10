// src/index.d.ts

export interface FileData {
  filename: string;
  mimetype: string;
  encoding: string;
  content: string;
}

export function base64ToArrayBuffer(base64: string): ArrayBuffer;
export function handleDownload(data: { file: FileData }): void;
