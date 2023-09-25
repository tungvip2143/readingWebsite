import React from 'react';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import CustomFields from 'components/CustomFields';
import { Field } from 'formik';
import { useTranslations } from 'next-intl';

interface RatingAndReviewProps {
  name: string;
  labelReview: string;
  labelRating: string;
}

const RatingAndReview = (props: RatingAndReviewProps) => {
  //! State
  const { name, labelRating, labelReview } = props;
  const t = useTranslations();
  //! Function

  //! Render
  return (
    <CommonStyles.Box>
      <CommonStyles.Box sx={{ width: 'inherit', mb: 2 }}>
        <CommonStyles.Typography sx={{ mb: 1 }} variant='subtitle2'>
          {labelRating}
        </CommonStyles.Typography>
        <Field component={CommonStyles.RatingMui} name={name} />
      </CommonStyles.Box>
      <CommonStyles.Typography variant='subtitle2'>{labelReview}</CommonStyles.Typography>
      <CommonStyles.Box sx={{ width: 'inherit', mt: 1 }}>
        <Field component={CustomFields.Textarea} sx={{ width: '20rem' }} name={`${name}Review`} />
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default React.memo(RatingAndReview);
