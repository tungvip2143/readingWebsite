import React from 'react';
import CommonStyles from 'components/CommonStyles';
import { useTranslations } from 'next-intl';
import CreateHotDeal from '../Components/CreateHotDeal/CreateHotDeal';
import { modalAction } from 'constants/common';
import { HotDeal } from 'modules/hotDeal/hotDeal.interface';

interface IProps {
  isOpen: boolean;
  toggle: () => void;
  hotDeal?: HotDeal;
}

const DialogCreateHotDeal = (props: IProps) => {
  //! State
  const t = useTranslations();
  const { isOpen, toggle, hotDeal } = props;

  //! Function

  //! Render
  return (
    <CommonStyles.Dialog
      title={t('HotDeal.createHotDeal')}
      content={<CreateHotDeal hotDeal={hotDeal} toggle={toggle} />}
      open={isOpen}
      toggle={toggle}
      disableClickOutside={false}
      maxWidth={'lg'}
    />
  );
};

export default DialogCreateHotDeal;
