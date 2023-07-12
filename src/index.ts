import { Option } from 'funfix';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as mimeTypes from 'mime-types';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

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
  
  link.click();
}
const PdfGenerationParamsTests = {
  fontSize: 24,
  textContent: 'Hello, World!',
  x: 0,
  y: 0,
};

interface PdfGenerationParams {
  fontSize: number;
  textContent: string;
  x: number;
  y: number;
}

const defaultPdfGenerationFunction = async (params: PdfGenerationParams) => {
  const { fontSize, textContent, x, y } = params;

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const textWidth = font.widthOfTextAtSize(textContent, fontSize);
  const textHeight = font.heightAtSize(fontSize);
  const xPos = (page.getWidth() - textWidth) / 2 + x;
  const yPos = (page.getHeight() - textHeight) / 2 + y;

  page.drawText(textContent, {
    x: xPos,
    y: yPos,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();
  const base64String = Buffer.from(pdfBytes).toString('base64');
  const fileMime = mimeTypes.lookup('pdf') ?? '';

  // return the file object
  return {
    filename: 'test.pdf',
    mimetype: fileMime,
    encoding: 'base64',
    content: base64String,
  };
};

export function deconstructFile(baseDirectory: any, generatePdfFn = defaultPdfGenerationFunction) {
  return Option.of(baseDirectory)
    .map((_) => {
      const fileContent = generatePdfFn(PdfGenerationParamsTests);

      return fileContent;
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
