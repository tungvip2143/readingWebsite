import CommonStyles from 'components/CommonStyles';
import React from 'react';
import { useTranslations } from 'next-intl';
import PreviewVideo from 'components/PreviewVideo';

interface IProps {
  isOpen: boolean;
  toggle: () => void;
  fileVideo: string | null;
}
const DialogPreviewVideo = (props: IProps) => {
  //! State
  const { isOpen, toggle, fileVideo } = props;

  const t = useTranslations();
  //! Function

  //! Render
  return (
    <CommonStyles.Dialog
      title={t('Tour.preview')}
      content={<PreviewVideo fileVideo={fileVideo ?? ''} />}
      open={isOpen}
      toggle={toggle}
      disableClickOutside={false}
      maxWidth={'md'}
    />
  );
};

export default DialogPreviewVideo;
