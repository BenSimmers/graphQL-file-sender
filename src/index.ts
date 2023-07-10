import { gql } from '@apollo/client';
import { Try } from 'funfix';

import { readFileSync } from 'fs';
import { join } from 'path';

const GET_FILE = gql`
  query GetFile {
    file {
      filename
      mimetype
      encoding
      content
    }
  }
`;

export const base64ToArrayBuffer = (base64: string) => {
  const binaryString = window.atob(base64);
  const bytes = Uint8Array.from(binaryString, (char) => char.charCodeAt(0));
  return bytes.buffer;
};

export const handleDownload = (data: { file: { filename: string, content: string, mimetype: string } }) => {
  const { filename, content, mimetype } = data?.file ?? {};
  if (!filename || !content || !mimetype) return;

  const blob = new Blob([base64ToArrayBuffer(content)], { type: mimetype });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
};

// server functions

function deconstructFile(filename: any) {
  return Try.of(() => {
    if (!filename) throw new Error('Filename is null');

    const file = join(__dirname, filename);
    const fileContent: any = readFileSync(file);

    const base64Content = Buffer.from(fileContent).toString('base64');
    // @ts-ignore
    const fileMime = mime.lookup(file);

    const fileObj = { filename, mimetype: fileMime, encoding: 'base64', content: base64Content };

    return fileObj;
  }).fold(
    (_) => {
      return {
        filename: '',
        mimetype: '',
        encoding: '',
        content: '',
      };
    },
    (fileObj) => {
      return fileObj;
    },
  );
}
