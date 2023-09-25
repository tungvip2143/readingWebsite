import React, { useState } from 'react';
import { useTheme } from '@mui/material';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import CommonIcons from 'components/Client/CommonIcons';
import { useTranslations } from 'next-intl';
import { useGet } from 'stores/useStore';
import { Vendor, VendorTypeRelation } from 'modules/vendor/vendor.interface';
import { StatusType } from 'constants/common';
import useAuth from 'hooks/useAuth';
import { showError, showSuccess } from 'helpers/toast';
import wishListVendorServices from 'modules/wishListVendor/wishListVendor.services';
import { useParams } from 'next/navigation';
import cachedKeys from 'constants/cachedKeys';
import { map } from 'lodash';

interface HeadingPlacesDetailContainerProps {}

interface TagNameI {
  label: string;
}

interface LocationI {
  label: string;
}

interface OpeningI {
  open: Boolean;
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
        display: 'flex',
        textAlign: 'center',
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

const Opening = (props: OpeningI) => {
  const { open = false } = props;
  const theme = useTheme();
  const t = useTranslations('PlacesDetail');

  return (
    <CommonStylesClient.Box
      sx={{ display: 'flex', flexDirection: 'row', gap: '0.25rem', alignItems: 'center' }}
    >
      {open ? <CommonIcons.IconClockGreen /> : <CommonIcons.IconClockRed />}
      <CommonStylesClient.Typography
        type='text16'
        sx={{ color: theme.colors?.client.grayScale300, letterSpacing: '0.64px' }}
      >
        {open ? t('opening') : t('closed')}
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
const HeadingPlacesDetailContainer = (props: HeadingPlacesDetailContainerProps) => {
  //! State
  const t = useTranslations();
  const theme = useTheme();
  const auth = useAuth();
  const params = useParams();

  const vendorId = Number(params?.slug);
  const isLogged = auth?.isLogged;
  const detailOfPlaces: Vendor = useGet(cachedKeys.detailPlaces);
  const refetchDetailPlaces = useGet(cachedKeys.refetchDetailPlaces);
  const refetchGetProfile = useGet(cachedKeys.refetchGetProfile);
  const title = detailOfPlaces?.name || '';
  const vendorTypeRelation = detailOfPlaces?.VendorTypeRelation;
  const type = vendorTypeRelation?.map((item: VendorTypeRelation) => {
    return item?.type?.name || '';
  }) || [''];
  const category = detailOfPlaces?.type || '';
  const wardName = detailOfPlaces?.destination?.wardName || '';
  const districtName = detailOfPlaces?.destination?.districtName || '';
  const provinceName = detailOfPlaces?.destination?.provinceName || '';
  const fullAddress = detailOfPlaces?.destination?.fullAddress || '';
  const location = `${fullAddress}${wardName && `, ${wardName}`}${
    districtName && `, ${districtName}`
  }${provinceName && `, ${provinceName}`}`;

  const rating = detailOfPlaces?.totalRate || 0;
  const reviewNumber = detailOfPlaces?.avgRate || 0;
  const WishListVendor = detailOfPlaces?.WishListVendor || false;
  //! Function
  const opening = () => {
    switch (detailOfPlaces?.status) {
      case StatusType.OPEN:
        return true;
      case StatusType.CLLOSE:
        return false;
      default:
        return false;
    }
  };

  const handleChangeWishListVendor = async () => {
    try {
      if (!isLogged) {
        showError(t('Validation.login'));
        return;
      }
      const body = {
        vendorId: vendorId,
      };
      if (WishListVendor) {
        await wishListVendorServices.removeWishListVendor(body);
        showSuccess(t('Wishlist.removeWishtlistSucces'));
      } else {
        await wishListVendorServices.addWishListVendor(body);
        showSuccess(t('Wishlist.addWislistSuccess'));
      }
      refetchDetailPlaces && (await refetchDetailPlaces());
      refetchGetProfile && (await refetchGetProfile());
    } catch (error) {
      showError(error);
    }
    return null;
  };

  //! Effect

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
            flexWrap: 'wrap',
          }}
        >
          {/* Tag */}
          {type &&
            type?.map((item: string, index: number) => {
              return <TagName key={`${item} ${index + 1}`} label={item} />;
            })}

          {/* Location */}
          <Location label={location} />

          {/* Open */}
          <Opening open={opening()} />

          {/* Rating */}
          <Rating countRating={rating} numberReviews={reviewNumber} />
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>

      <CommonStylesClient.Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <CommonStylesClient.Box
          onClick={handleChangeWishListVendor}
          sx={{
            padding: '0.75rem',
            background: theme.colors?.client.midGray,
            width: 56,
            height: 56,
            borderRadius: '50% ',
            ['svg path']: {
              fill: WishListVendor ? theme.colors?.client.red : theme.colors?.client.white,
            },
            [':hover']: {
              background: theme.colors?.client.midGray,
              ['svg path']: {
                fill: WishListVendor ? theme.colors?.client.white : theme.colors?.client.red,
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

export default React.memo(HeadingPlacesDetailContainer);
