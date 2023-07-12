import { Option } from 'funfix';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as mimeTypes from 'mime-types';

export const base64ToArrayBuffer = (base64: string) =>
  Uint8Array.from(window.atob(base64), (char) => char.charCodeAt(0)).buffer;

export function handleDownload(data: any) {
  const { filename, content, mimetype } = data?.file || {};
  if (!filename || !content || !mimetype) return null;

  const blob = new Blob([base64ToArrayBuffer(content)], { type: mimetype });
  const url = URL.createObjectURL(blob);

  const link = Object.assign(document.createElement('a'), {
    href: url,
    download: filename,
  });
}

export function deconstructFile(filename: any, baseDirectory: string) {
  return Option.of(filename)
    .map((f) => {
      const file = join(baseDirectory, f);
      const fileContent = readFileSync(file);
      const base64Content = Buffer.from(fileContent).toString('base64');
      const fileMime = mimeTypes.lookup(file) ?? '';
      const fileObj = { filename, mimetype: fileMime, encoding: 'base64', content: base64Content };

      return fileObj;
    })
    .getOrElse({
      filename: '',
      mimetype: '',
      encoding: '',
      content: '',
    });
}

export function FileTypeSchema() {
  return `
    type File {
      filename: String!
      mimetype: String!
      encoding: String!
      content: String!
    }
  `;
}

export default {
  handleDownload,
  deconstructFile,
  FileTypeSchema,
};
