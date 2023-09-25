import React from 'react';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { MAX_WIDTH_CONTAINER, SkeletonType } from 'constants/common';
import pageUrls from 'constants/pageUrls';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import Place from 'components/Client/Sections/PlacesToGoSection/Components/Place';
import useCheckResolution from 'hooks/useCheckResolution';
import MobilePlacesToGo from './MobileScreen';
import SkeletonLoading from 'components/Client/Components/SkeletonLoading';
import useGetVendorList from 'modules/vendor/hooks/useGetVendorList';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { Vendor, VendorTypeRelation } from 'modules/vendor/vendor.interface';
import { IMG_URL } from 'constants/apiUrls';
import { formatPrice } from 'helpers/common';

interface PlacesToGoProps {}

const PlacesToGo = (props: PlacesToGoProps) => {
  //! State
  const theme = useTheme();
  const t = useTranslations('PlacesToGoSession');
  const { isMobile } = useCheckResolution();

  //! Function
  const initialFilters = {};

  const { filters } = useFiltersHandler(initialFilters);

  const { data: resDataListVendor, isLoading: loadingDatListVendor } = useGetVendorList(filters);
  const data = resDataListVendor?.items?.slice(0, 6) || ([] as Vendor[]);
  const loading = loadingDatListVendor;

  const Loading = () => {
    const arrSkeleton = ['1', '2', '3', '4', '5', '6'];
    return (
      <CommonStylesClient.Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignSelf: 'stretch',
          justifyContent: 'space-between',
        }}
      >
        {arrSkeleton.map((item: string) => {
          return <SkeletonLoading key={item} type={SkeletonType.SERVICE} />;
        })}
      </CommonStylesClient.Box>
    );
  };
  //! Render
  if (isMobile) {
    return <MobilePlacesToGo />;
  }

  return (
    <CommonStylesClient.Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.colors?.client.white,
        maxWidth: MAX_WIDTH_CONTAINER,
        margin: '0 auto',
        paddingTop: '7.5rem',
      }}
    >
      <CommonStylesClient.Box
        sx={{
          marginBottom: '3rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <CommonStylesClient.Box
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}
        >
          <CommonStylesClient.Typography type='pcHeading2'>
            {t('PlacesToGo')}
          </CommonStylesClient.Typography>
          <CommonStylesClient.Typography
            type='text14'
            width='60%'
            sx={{ color: theme.colors?.client.darkGray }}
          >
            {t('descriptionPlaces')}
          </CommonStylesClient.Typography>
        </CommonStylesClient.Box>

        <Link href={`${pageUrls.Places}`}>
          <CommonStylesClient.Button
            variant='contained'
            sx={{
              textTransform: 'none',
              borderRadius: '1rem',
              width: '8rem',
              height: '3rem',
              backgroundColor: theme.colors?.client.coBaltBlue,
            }}
          >
            {t('seeAll')}
          </CommonStylesClient.Button>
        </Link>
      </CommonStylesClient.Box>

      <CommonStylesClient.Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {loading ? (
          <Loading />
        ) : (
          <CommonStylesClient.Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '3rem 3.75rem',
              alignSelf: 'stretch',
              justifyContent: 'flex-start',
              ['a']: {
                textDecoration: 'none',
              },
            }}
          >
            {data.map((item: Vendor) => {
              const href = `${pageUrls.DetailPlaces}${item.id}`;
              const vendorTypeRelation = item?.VendorTypeRelation;

              const hashTag = vendorTypeRelation?.map((vendorTypeItem: VendorTypeRelation) => {
                return vendorTypeItem?.type?.name || '';
              }) || [''];

              const renderHashTag = hashTag?.map((string: string) => {
                return `#${string} `;
              });
              return (
                <Link href={href} key={item.id}>
                  <Place
                    name={item?.name || ''}
                    hashTag={renderHashTag}
                    image={`${IMG_URL}/${item.thumbnail}`}
                    price={formatPrice(Number(item.minPrice))}
                    rating={Number(item.totalRate)}
                  />
                </Link>
              );
            })}
          </CommonStylesClient.Box>
        )}
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(PlacesToGo);
