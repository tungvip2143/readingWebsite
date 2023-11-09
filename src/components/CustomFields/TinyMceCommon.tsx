import { Typography } from '@mui/material';
import { Editor, IAllProps } from '@tinymce/tinymce-react';
import { TINY_API } from 'constants/common';
import React, { forwardRef, useEffect } from 'react';
import { useState } from 'react';
import { useFormikContext } from 'formik';

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
          plugins: 'link image code table lists hr fullscreen preview visualblocks help ',
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
