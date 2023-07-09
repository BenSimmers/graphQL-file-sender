import { gql } from '@apollo/client';
interface FileData {
  filename: string;
  mimetype: string;
  encoding: string;
  content: string;
}

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
/**
 *  Client
 * @param base64
 * @returns
 */
export const base64ToArrayBuffer = (base64: string) => {
  const binaryString = window.atob(base64);
  const bytes = Uint8Array.from(binaryString, (char) => char.charCodeAt(0));
  return bytes.buffer;
};

/**
 * client
 * @param data
 * @returns
 */
export const handleDownload = (data: { file: FileData }) => {
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
