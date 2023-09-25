import CommonStyles from 'components/CommonStyles';
import React from 'react';
import { useTranslations } from 'next-intl';
import CreateService from '../Components/CreateService/CreateService';
import { Tour } from 'modules/tour/tour.interface';

interface DialogAddServiceProps {
  isOpen: boolean;
  toggle: () => void;
  tour: Tour;
}

export default function DialogAddService(props: DialogAddServiceProps) {
  //! State
  const { isOpen, toggle, tour } = props;
  const t = useTranslations();

  //! Function

  //! Render
  return (
    <CommonStyles.Dialog
      open={isOpen}
      toggle={toggle}
      title={t('Tour.addService')}
      content={<CreateService tour={tour} />}
      disableClickOutside={false}
      maxWidth='sm'
    />
  );
}
