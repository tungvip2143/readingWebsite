import React from 'react';
import CommonStyles from 'components/CommonStyles';
import { useTranslations } from 'next-intl';
import { ReservationVendor } from 'modules/reservationVendor/reservationVendor.interface';
import ReviewVendor from '../RatingAndReview/ReviewVendor';

interface DialogFiltersMyBookingProps {
  open: boolean;
  toggle: () => void;
  myBookingVendor: ReservationVendor;
}

const DialogReviewVendor = (props: DialogFiltersMyBookingProps) => {
  //! State
  const { open, toggle, myBookingVendor } = props;
  const t = useTranslations();

  //! Function

  //! Render
  return (
    <CommonStyles.Dialog
      title={t('MyBookingTour.review')}
      content={<ReviewVendor myBookingVendor={myBookingVendor} toggle={toggle} />}
      open={open}
      toggle={toggle}
      disableClickOutside={false}
      maxWidth={'sm'}
    />
  );
};

export default DialogReviewVendor;
