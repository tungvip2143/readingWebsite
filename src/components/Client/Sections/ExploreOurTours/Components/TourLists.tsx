import React from 'react';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';

import TourItem from './TourItem';
import { Tour } from 'modules/tour/tour.interface';
import { ResponseList } from 'interfaces/common';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import Link from 'next/link';
import pageUrls from 'constants/pageUrls';
import SkeletonLoading from 'components/Client/Components/SkeletonLoading';
import { SkeletonType } from 'constants/common';
import queryString from 'query-string';
import { isEmpty } from 'lodash';

interface TourLists {
  data: ResponseList<Tour[]> | undefined;
  loading?: boolean;
  categoriesNumber?: number;
}
export default function TourLists(props: TourLists) {
  //! State
  const { data, loading = false, categoriesNumber } = props;

  const theme = useTheme();
  const t = useTranslations();

  //! Function

  const Loading = () => {
    const arrSkeleton = ['1', '2', '3', '4'];
    return arrSkeleton.map((item: string) => {
      return <SkeletonLoading key={item} type={SkeletonType.TOUR} />;
    });
  };

  const totalItems = Number(data?.totalItems) || 0;

  const bodeParsed = {
    category: categoriesNumber,
  };

  const hrerParsed =
    categoriesNumber !== 0
      ? `${pageUrls.Tour}?${queryString.stringify(bodeParsed)}`
      : `${pageUrls.Tour}`;

  //! Render
  return (
    <CommonStylesClient.Box>
      <CommonStylesClient.Box sx={{ display: 'flex', gap: 3, marginBottom: '2.5rem' }}>
        {loading ? (
          <Loading />
        ) : (
          data?.items?.slice(0, 4).map((el: Tour) => {
            return <TourItem key={el.id} tour={el} />;
          })
        )}
      </CommonStylesClient.Box>

      {!loading && (
        <CommonStylesClient.Box sx={{ textAlign: 'center' }}>
          <Link href={hrerParsed}>
            <CommonStylesClient.Button
              loading={loading}
              variant='contained'
              sx={{
                backgroundColor: theme.colors?.client.white,
                color: theme.colors?.client.midBlack,
                [':hover']: {
                  backgroundColor: theme.colors?.client.white,
                },
              }}
            >
              {t('ExploreOurTours.viewAllTours', { number: totalItems })}
            </CommonStylesClient.Button>
          </Link>
        </CommonStylesClient.Box>
      )}
    </CommonStylesClient.Box>
  );
}
