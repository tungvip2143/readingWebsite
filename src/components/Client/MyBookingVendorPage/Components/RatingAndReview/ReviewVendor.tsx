import CommonStyles from 'components/CommonStyles';
import { ReviewTabs } from 'constants/common';
import { MyTourBooking } from 'modules/myTourBooking/myTourBooking.interface';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import RatingAndReview from './RatingAndReview';
import { Field, Form, Formik } from 'formik';
import reviewServices from 'modules/review/review.services';
import { showError, showSuccess } from 'helpers/toast';
import { isEmpty } from 'lodash';
import { ReservationVendor } from 'modules/reservationVendor/reservationVendor.interface';
interface Props {
  myBookingVendor: ReservationVendor;
  toggle: () => void;
}
export interface FormValueRatingReview {
  ratingVendor?: number;
  ratingVendorReview?: string;
}
export const dataTabReview = [
  { label: 'myBookingVendor.ReviewTour', value: ReviewTabs.ReviewTour },
  { label: 'myBookingVendor.ReviewTourGuide', value: ReviewTabs.ReviewTourGuide },
];
const ReviewVendor = (props: Props) => {
  //!State
  const t = useTranslations();
  const initialValue: FormValueRatingReview = {
    ratingVendor: !isEmpty(props?.myBookingVendor?.Vendor?.Review)
      ? props?.myBookingVendor?.Vendor?.Review?.[0]?.rate
      : 0,
    ratingVendorReview: !isEmpty(props?.myBookingVendor?.Vendor?.Review)
      ? props?.myBookingVendor?.Vendor?.Review?.[0]?.content
      : '',
  };
  //! Function
  const handleCancel = () => {
    props.toggle();
  };
  //!Render
  return (
    <Formik
      initialValues={initialValue}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
          const response = await reviewServices.createTour(props.myBookingVendor?.id, {
            for: 'Vendor',
            rate: Number(values?.ratingVendor),
            content: values?.ratingVendorReview,
          });

          if (response?.status === 200 || response?.status === 201) {
            showSuccess(t('Common.success'));
            props.toggle();
          }
        } catch (error) {
          showError(error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => {
        return (
          <Form>
            <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <RatingAndReview
                name='ratingVendor'
                labelRating={t('MyBookingPlace.ratingVendor')}
                labelReview={t('MyBookingPlace.ratingVendorReview')}
              />
            </CommonStyles.Box>
            <CommonStyles.Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                mt: 3,
                marginRight: '2rem',
                gap: '1rem',
              }}
            >
              <CommonStyles.Button loading={isSubmitting} type='submit' color='secondary'>
                {t('MyBookingTour.review')}
              </CommonStyles.Button>
              <CommonStyles.Button
                variant='outlined'
                sx={{ marginRight: '0.625rem' }}
                onClick={handleCancel}
                color='secondary'
              >
                {t('Common.cancel')}
              </CommonStyles.Button>
            </CommonStyles.Box>
            <CommonStyles.FormikDebug />
          </Form>
        );
      }}
    </Formik>
  );
};

export default ReviewVendor;
