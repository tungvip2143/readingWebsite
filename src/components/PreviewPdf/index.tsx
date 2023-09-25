'use client';
import React, { useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import CommonStyles from 'components/CommonStyles';

interface Prop {
  filePdf: string | null;
}
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

export default function PreviewPdf({ filePdf }: Prop) {
  const [numPages, setNumPages] = useState<number | undefined>(undefined);

  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  return (
    <CommonStyles.Box>
      <CommonStyles.Box>
        <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Document file={filePdf} onLoadSuccess={onDocumentLoadSuccess} options={options}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </CommonStyles.Box>
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
}
