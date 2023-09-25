import CommonStyles from 'components/CommonStyles';
import React from 'react';
import { useTranslations } from 'next-intl';
import CreateService from '../Components/CreateService/CreateService';
import AddTourGuide from '../Components/AddTourGuide/AddTourGuide';
import { Tour } from 'modules/tour/tour.interface';

interface DialogAddTourGuideProps {
  isOpen: boolean;
  toggle: () => void;
  tour: Tour;
}

export default function DialogAddTourGuide(props: DialogAddTourGuideProps) {
  //! State
  const { isOpen, toggle, tour } = props;
  const t = useTranslations();

  //! Function

  //! Render
  return (
    <CommonStyles.Dialog
      open={isOpen}
      toggle={toggle}
      title={t('Tour.addLocalFriendToTour')}
      content={<AddTourGuide tour={tour} />}
      disableClickOutside={false}
      maxWidth='sm'
    />
  );
}
