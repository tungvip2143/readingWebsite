import CommonStyles from 'components/CommonStyles';
import React from 'react';
import { useTranslations } from 'next-intl';
import PreviewPdf from 'components/PreviewPdf';

interface IProps {
  isOpen: boolean;
  toggle: () => void;
  filePdf: string | null;
}
const DialogPreviewPdf = (props: IProps) => {
  //! State
  const { isOpen, toggle, filePdf } = props;

  const t = useTranslations();
  //! Function

  //! Render
  return (
    <CommonStyles.Dialog
      title={t('Tour.preview')}
      content={<PreviewPdf filePdf={filePdf} />}
      open={isOpen}
      toggle={toggle}
      disableClickOutside={false}
      maxWidth={'md'}
    />
  );
};

export default DialogPreviewPdf;
