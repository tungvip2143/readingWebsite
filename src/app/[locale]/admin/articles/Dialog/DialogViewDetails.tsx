import CommonStyles from 'components/CommonStyles';
import React from 'react';
import AddForm from './AddForm';
import { useTranslations } from 'next-intl';
import { modalAction } from 'constants/common';

interface IProps {
  isOpen: boolean;
  toggle: () => void;
  id?: number;
  isCreate?: boolean;
  isDetail?: boolean;
  // isEdit?: boolean;
}
const DialogViewDetails = (props: IProps) => {
  //! State
  const { isOpen, toggle, id, isCreate, isDetail } = props;
  const t = useTranslations();
  //! Function
  const tourGuideAction = React.useCallback(() => {
    if (isCreate) {
      return modalAction.CREATE;
    }
    // if (isEdit) {
    //   return modalAction.EDIT;
    // }

    return modalAction.DETAIL;
  }, [isCreate, isDetail]);

  //! Render
  return (
    <CommonStyles.Dialog
      title={t(`ActionModal.${tourGuideAction()}`).toUpperCase()}
      content={<AddForm idArticle={id} actionStatus={tourGuideAction()} toggleAddform={toggle} />}
      open={isOpen}
      toggle={toggle}
      disableClickOutside={false}
      maxWidth={'lg'}
    />
  );
};

export default DialogViewDetails;
