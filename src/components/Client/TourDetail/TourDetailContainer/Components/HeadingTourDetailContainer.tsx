import React from 'react';
import { useTheme } from '@mui/material';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import CommonIcons from 'components/Client/CommonIcons';
import { useTranslations } from 'next-intl';
import { useGet } from 'stores/useStore';
import { Category, Tour } from 'modules/tour/tour.interface';
import { TourCategory } from 'modules/tour-category/tour-category.interface';
import useAuth from 'hooks/useAuth';
import { useParams } from 'next/navigation';
import { showError, showSuccess } from 'helpers/toast';
import wishListTourServices from 'modules/wishListTour/wishListTour.services';
import cachedKeys from 'constants/cachedKeys';

interface HeadingTourDetailContainerProps {}

interface TagNameI {
  label: string;
}

interface LocationI {
  label: string;
}

interface RatingI {
  countRating: number;
  numberReviews: number;
}

const TagName = (props: TagNameI) => {
  const { label } = props;
  const theme = useTheme();

  return (
    <CommonStylesClient.Typography
      type='title14'
      sx={{
        color: theme.colors?.client.coBaltBlue,
        padding: '0.25rem 0.75rem',
        borderRadius: '0.5rem',
        width: 'fit-content',
        background: theme.colors?.client.coBaltBlueLighter,
      }}
    >
      {label}
    </CommonStylesClient.Typography>
  );
};

const Location = (props: LocationI) => {
  const { label } = props;
  const theme = useTheme();

  return (
    <CommonStylesClient.Box
      sx={{ display: 'flex', flexDirection: 'row', gap: '0.25rem', alignItems: 'center' }}
    >
      <CommonIcons.IconLocationBlue />
      <CommonStylesClient.Typography
        type='text16'
        sx={{ color: theme.colors?.client.grayScale300, letterSpacing: '0.64px' }}
      >
        {label}
      </CommonStylesClient.Typography>
    </CommonStylesClient.Box>
  );
};

const Rating = (props: RatingI) => {
  const { countRating, numberReviews } = props;
  const theme = useTheme();
  const t = useTranslations('TourDetailPage');

  return (
    <CommonStylesClient.Box
      sx={{ display: 'flex', gap: '0.25rem', flexDirection: 'row', alignItems: 'center' }}
    >
      <CommonIcons.IconStar />
      <CommonStylesClient.Typography
        type='pcHeading5'
        sx={{ color: theme.colors?.client.grayScale }}
      >
        {countRating}
      </CommonStylesClient.Typography>
      <CommonStylesClient.Typography
        type='title16'
        sx={{ color: theme.colors?.client?.grayScale300 }}
      >{`(${numberReviews} ${t('reviews')})`}</CommonStylesClient.Typography>
    </CommonStylesClient.Box>
  );
};
const HeadingTourDetailContainer = (props: HeadingTourDetailContainerProps) => {
  //! State
  const theme = useTheme();
  const auth = useAuth();
  const params = useParams();
  const t = useTranslations();

  const detailOfTourData: Tour = useGet(cachedKeys.detailTour);
  const refetchDetailTour = useGet(cachedKeys.refetchDetailTour);
  const refetchGetProfile = useGet(cachedKeys.refetchGetProfile);

  const isLogged = auth?.isLogged;
  const tourId = Number(params?.slug);

  const title = detailOfTourData?.name || '';
  const category = detailOfTourData?.categories || [];
  const location = detailOfTourData?.Area?.name || '';
  const rating = detailOfTourData?.avgRate || 0;
  const reviewNumber = detailOfTourData?.totalRate || 0;
  const WishListTour = isLogged ? detailOfTourData?.WishListTour : false;

  //! Function
  const handleChangeWishListTour = async () => {
    try {
      if (!isLogged) {
        showError(t('Validation.login'));
        return;
      }
      const body = {
        tourId: tourId,
      };
      if (WishListTour) {
        await wishListTourServices.removeWishListTour(body);
        showSuccess(t('Wishlist.removeWishtlistSucces'));
      } else {
        await wishListTourServices.addWishListTour(body);
        showSuccess(t('Wishlist.addWislistSuccess'));
      }
      refetchDetailTour && (await refetchDetailTour());
      refetchGetProfile && (await refetchGetProfile());
    } catch (error) {
      showError(error);
    }
    return null;
  };

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '2.5rem',
        alignItems: 'center',
      }}
    >
      <CommonStylesClient.Box
        sx={{
          display: 'flex',
          gap: '1rem',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <CommonStylesClient.Typography
          type='pcHeading2'
          sx={{ color: theme.colors?.client?.grayScale }}
        >
          {title}
        </CommonStylesClient.Typography>
        <CommonStylesClient.Box
          sx={{
            display: 'flex',
            gap: '1rem',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-evenly',
          }}
        >
          {/* Tag */}
          <CommonStylesClient.Box
            sx={{
              width: 320,
              display: 'flex',
              gap: '1rem',
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            {category.map((item: Category) => {
              const category = item.category as TourCategory;
              return <TagName label={category?.name} key={item.id} />;
            })}
          </CommonStylesClient.Box>
          {/* Location */}
          <Location label={location} />
          {/* Rating */}
          <Rating countRating={rating} numberReviews={reviewNumber} />
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>

      <CommonStylesClient.Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <CommonStylesClient.Box
          onClick={handleChangeWishListTour}
          sx={{
            padding: '0.75rem',
            background: theme.colors?.client.midGray,
            width: 56,
            height: 56,
            borderRadius: '50% ',
            ['svg path']: {
              fill: WishListTour ? theme.colors?.client.red : theme.colors?.client.white,
            },
            [':hover']: {
              background: theme.colors?.client.midGray,
              ['svg path']: {
                fill: WishListTour ? theme.colors?.client.white : theme.colors?.client.red,
              },
            },
          }}
        >
          <CommonIcons.IconHeartWhite />
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(HeadingTourDetailContainer);
