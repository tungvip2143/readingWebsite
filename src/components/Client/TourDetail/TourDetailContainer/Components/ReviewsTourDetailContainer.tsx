import React, { useCallback, useMemo, useState } from 'react';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import moment from 'moment';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import CommonStyles from 'components/CommonStyles';
import { ReviewOfDetailTour } from 'interfaces/common';
import { useGet } from 'stores/useStore';
import { Tour, TourReview } from 'modules/tour/tour.interface';
import cachedKeys from 'constants/cachedKeys';

interface ReviewsTourDetailContainerProps {}

const Review = (props: ReviewOfDetailTour) => {
  const { name, star, imageUrl, description, date } = props;
  const theme = useTheme();

  return (
    <CommonStylesClient.Box
      sx={{
        display: 'flex',
        gap: '0.75rem',
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '100%',
      }}
    >
      <CommonStylesClient.Avatar sx={{ width: '2.25rem', height: '2.25rem' }} src={imageUrl} />

      <CommonStylesClient.Box
        sx={{ display: 'flex', gap: '0.75rem', flexDirection: 'column', width: '100%' }}
      >
        <CommonStylesClient.Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CommonStylesClient.Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
            }}
          >
            <CommonStylesClient.Typography
              type='pcHeading5'
              sx={{ color: theme.colors?.client.darkGray, letterSpacing: '0.65px' }}
            >
              {name}
            </CommonStylesClient.Typography>

            <CommonStylesClient.Typography
              type='text12'
              sx={{ color: theme.colors?.client.darkGray, letterSpacing: '0.65px' }}
            >
              {date}
            </CommonStylesClient.Typography>
          </CommonStylesClient.Box>
          <CommonStyles.RatingMui
            readOnly
            sxRating={{
              svg: { width: '0.75rem', height: '0.75rem' },
              gap: '0.5rem',
              marginTop: '2px',
            }}
            valueTable={star}
          />
        </CommonStylesClient.Box>
        <CommonStylesClient.Typography type='text14' sx={{ color: theme.colors?.client?.darkGray }}>
          {description}
        </CommonStylesClient.Typography>
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

const ReviewsTourDetailContainer = (props: ReviewsTourDetailContainerProps) => {
  //! State
  const theme = useTheme();
  const t = useTranslations('TourDetailPage');
  const [viewAll, setViewAll] = useState(false);
  const detailOfTourData: Tour = useGet(cachedKeys.detailTour);

  //! Function
  const reviewList = useMemo(() => {
    return detailOfTourData?.Review || [];
  }, [detailOfTourData]);

  const totalReview = Number(reviewList?.length);

  const onToggleViewAll = () => {
    setViewAll(!viewAll);
  };

  const ReviewList = () => {
    const firstThreeReviews = reviewList.slice(0, 3);
    const renderReviewList = !viewAll ? firstThreeReviews : reviewList;
    return (
      <CommonStylesClient.Box
        sx={{ display: 'flex', gap: '1.5rem', flexDirection: 'column', width: '100%' }}
      >
        {renderReviewList.map((item: TourReview, index: number) => {
          return (
            <Review
              date={moment(item.updatedAt).format('YY MMM')}
              key={item.id}
              name={item.Customer?.User?.fullName || ''}
              star={Number(item.rate)}
              imageUrl={item.Customer?.User?.avatar || ''}
              description={item.content || ''}
            />
          );
        })}
      </CommonStylesClient.Box>
    );
  };

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        display: 'flex',
        gap: '1.5rem',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <CommonStylesClient.Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <CommonStylesClient.Typography
          type='pcHeading4'
          sx={{ color: theme.colors?.client?.black }}
        >
          {t('reviewsHeading')}
        </CommonStylesClient.Typography>
        {totalReview > 3 && (
          <CommonStylesClient.Typography
            type='pcHeading5'
            sx={{ color: theme.colors?.client.primaryPurple, cursor: 'pointer' }}
            onClick={onToggleViewAll}
          >
            {viewAll ? t('showLess') : t('viewAll')}
          </CommonStylesClient.Typography>
        )}
      </CommonStylesClient.Box>

      <CommonStylesClient.Box sx={{ width: '100%' }}>
        {totalReview <= 0 ? (
          <CommonStylesClient.Typography
            type='pcHeading5'
            sx={{ color: theme.colors?.client.darkGray, letterSpacing: '0.65px' }}
          >
            {t('noReviews')}
          </CommonStylesClient.Typography>
        ) : (
          <ReviewList />
        )}
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(ReviewsTourDetailContainer);
