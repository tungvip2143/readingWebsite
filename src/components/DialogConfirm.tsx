import React from 'react';
import CommonStyles from './CommonStyles';

interface IDialogConfirm {
  title?: string;
  content: string;
  footer?: string | React.ReactNode;
  open: boolean;
  toggle: () => void;
  disableClickOutside?: boolean;
}

function DialogConfirm(props: IDialogConfirm) {
  //! State
  const { title, content, footer, open, toggle, disableClickOutside } = props;

  //! Function

  //! Render
  return (
    <CommonStyles.Dialog
      title={title}
      content={content}
      footer={footer}
      open={open}
      toggle={toggle}
      disableClickOutside={disableClickOutside || false}
      maxWidth='xs'
    />
  );
}

export default DialogConfirm;
