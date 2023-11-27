import { Typography } from '@mui/material';
import { Editor, IAllProps } from '@tinymce/tinymce-react';
import { TINY_API } from 'constants/common';
import React, { forwardRef, useEffect } from 'react';
import { useState } from 'react';
import { useFormikContext } from 'formik';
import { IMG_URL } from 'constants/apiUrls';

interface BlobInfo {
  id: () => string;
  name: () => string;
  filename: () => string;
  blob: () => Blob;
  base64: () => string;
  blobUri: () => string;
  uri: () => string | undefined;
}
type ProgressFn = (percent: number) => void;
type UploadHandler = (blobInfo: BlobInfo, progress: ProgressFn) => Promise<string>;
export interface Props extends IAllProps {
  height?: number;
  selector?: string;
  name?: string;
  placeholder?: string;
}

// eslint-disable-next-line react/display-name
const TinyMceCommon = forwardRef((props: Props, ref: any) => {
  //! State
  const { height, initialValue, name, placeholder, value } = props;
  const [isError, setIsError] = useState<boolean>(false);
  const { setFieldValue } = useFormikContext<any>();
  //! Function
  const example_image_upload_handler: UploadHandler = (blobInfo, progress) =>
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.open('POST', 'http://localhost:8000/upload/article');

      xhr.upload.onprogress = (e) => {
        progress((e.loaded / e.total) * 100);
      };

      xhr.onload = () => {
        if (xhr.status === 403) {
          reject({ message: 'HTTP Error: ' + xhr.status, remove: true });
          return;
        }

        if (xhr.status < 200 || xhr.status >= 300) {
          reject('HTTP Error: ' + xhr.status);
          return;
        }
        const json = `${IMG_URL}/${xhr.responseText}`;
        if (!json || typeof json != 'string') {
          reject('Invalid JSON: ' + xhr.responseText);
          return;
        }

        resolve(json);
      };

      xhr.onerror = () => {
        reject('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
      };

      const formData = new FormData();
      formData.append('file', blobInfo.blob(), blobInfo.filename());

      xhr.send(formData);
    });
  //! Render
  return (
    <>
      <Editor
        value={value}
        apiKey={TINY_API}
        onInit={(evt, editor: any) => {
          if (ref) {
            ref.current = editor;
          }
        }}
        init={{
          placeholder: placeholder,
          height: height || 200,
          plugins: 'link image media code table lists hr fullscreen preview visualblocks help ',
          images_upload_url: 'http://localhost:8000/upload/article',
          images_upload_handler: example_image_upload_handler,
          images_upload_base_path: `${IMG_URL}/`,
          // indentation: '20pt',
          // indent_use_margin: true,
          menubar: 'file edit view insert format tools table help',
          toolbar:
            'undo redo |blocks fontfamily fontsize lineheight | bold italic underline forecolor backcolor| alignleft aligncenter alignright alignjustify|code|bullist outdent indent | fullscreen  preview  ',
          elementpath: false,
        }}
        onEditorChange={(value) => {
          if (name) {
            setFieldValue(name, value);
          }
        }}
        initialValue={initialValue}
        {...props}
      />
      {isError && (
        <Typography style={{ color: 'red', fontSize: 14 }}>This is required field</Typography>
      )}
    </>
  );
});
export default TinyMceCommon;
