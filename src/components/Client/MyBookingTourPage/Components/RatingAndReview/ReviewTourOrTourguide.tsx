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
interface Props {
  myBookingTour: MyTourBooking;
  toggle: () => void;
}
export interface FormValueRatingReview {
  ratingTour?: number;
  ratingTourGuide?: number;
  ratingTourReview?: string;
  ratingTourGuideReview?: string;
}
export const dataTabReview = [
  { label: 'MyBookingTour.ReviewTour', value: ReviewTabs.ReviewTour },
  { label: 'MyBookingTour.ReviewTourGuide', value: ReviewTabs.ReviewTourGuide },
];
const ReviewTourOrTourguide = (props: Props) => {
  //!State
  const t = useTranslations();
  const initialValue: FormValueRatingReview = {
    ratingTour: !isEmpty(props?.myBookingTour?.Tours?.Review)
      ? props?.myBookingTour?.Tours?.Review?.[0]?.rate
      : 0,
    ratingTourGuide: !isEmpty(props?.myBookingTour?.TourGuide?.Review)
      ? props?.myBookingTour?.TourGuide?.Review?.[0]?.rate
      : 0,
    ratingTourReview: !isEmpty(props?.myBookingTour?.Tours?.Review)
      ? props?.myBookingTour?.Tours?.Review?.[0]?.content
      : '',
    ratingTourGuideReview: !isEmpty(props?.myBookingTour?.TourGuide?.Review)
      ? props?.myBookingTour?.TourGuide?.Review?.[0]?.content
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
          const tourPromise =
            values?.ratingTour && values?.ratingTourReview
              ? reviewServices.createTour(props.myBookingTour?.id, {
                  for: 'Tour',
                  rate: Number(values?.ratingTour),
                  content: values?.ratingTourReview,
                })
              : Promise.resolve(); // Trả về Promise đã được giải quyết ngay lập tức nếu không có dữ liệu để gửi

          const tourGuidePromise =
            values?.ratingTourGuide && values?.ratingTourGuideReview
              ? reviewServices.createTour(props.myBookingTour?.id, {
                  for: 'TourGuide',
                  rate: Number(values?.ratingTourGuide),
                  content: values?.ratingTourGuideReview,
                })
              : Promise.resolve(); // Trả về Promise đã được giải quyết ngay lập tức nếu không có dữ liệu để gửi

          // Sử dụng Promise.all để gọi cả hai API cùng một lúc và đợi cho đến khi cả hai API hoàn thành.
          await Promise.all([tourPromise, tourGuidePromise]);

          showSuccess(t('Common.success'));
          props.toggle();
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
                name='ratingTour'
                labelRating={t('LocalFriend.ratingTour')}
                labelReview={t('LocalFriend.ratingTourReview')}
              />
              <CommonStyles.Divider variant='middle' orientation='vertical' flexItem />
              <RatingAndReview
                name='ratingTourGuide'
                labelRating={t('LocalFriend.ratingTourGuide')}
                labelReview={t('LocalFriend.ratingTourGuideReview')}
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

export default ReviewTourOrTourguide;
