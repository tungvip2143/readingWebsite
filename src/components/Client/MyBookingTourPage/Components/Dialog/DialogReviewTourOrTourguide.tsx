import React from 'react';
import CommonStyles from 'components/CommonStyles';
import { useTranslations } from 'next-intl';
import { MyTourBooking } from 'modules/myTourBooking/myTourBooking.interface';
import ReviewTourOrTourguide from '../RatingAndReview/ReviewTourOrTourguide';

interface DialogFiltersMyBookingProps {
  open: boolean;
  toggle: () => void;
  myBookingTour: MyTourBooking;
}

const DialogReviewTourOrTourguide = (props: DialogFiltersMyBookingProps) => {
  //! State
  const { open, toggle, myBookingTour } = props;
  const t = useTranslations();

  //! Function

  //! Render
  return (
    <CommonStyles.Dialog
      title={t('MyBookingTour.review')}
      content={<ReviewTourOrTourguide myBookingTour={myBookingTour} toggle={toggle} />}
      open={open}
      toggle={toggle}
      disableClickOutside={false}
      maxWidth={'md'}
    />
  );
};

export default DialogReviewTourOrTourguide;
