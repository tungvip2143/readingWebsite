import React from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from '@mui/material';
import Link from 'next/link';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import EachRecomendation from './Components/EachRecomendation';
import useFiltersHandler from 'hooks/useFiltersHandler';
import useGetListTourRecommendation from 'modules/tourRecommendation/hooks/useGetListTourRecommendation';
import pageUrls from 'constants/pageUrls';

interface TourDetailRecomendationProps {
  provinceCode: string;
  tourId?:string | number | undefined;
}

const TourDetailRecomendation = (props: TourDetailRecomendationProps) => {
  //! State
  const t = useTranslations();
  const theme = useTheme();
  //! Function

  const { filters } = useFiltersHandler({
    provinceCode: props.provinceCode,
    recentId: props.tourId
  });

  const { data: listTourRecommendation } = useGetListTourRecommendation(filters);

  //! Render
  if(listTourRecommendation && listTourRecommendation?.data.length <= 0){
    return null
  }

  return (
    <CommonStylesClient.Box sx={{ marginBottom: '2.5rem', width: '100%' }}>
      <CommonStylesClient.Typography
        type='pcHeading2'
        sx={{ color: theme.colors?.client?.midBlack }}
      >
        {t('TourDetailPage.recomendationTours')}
      </CommonStylesClient.Typography>

      <CommonStylesClient.Box sx={{ padding: '3rem 0' }}>
        <EachRecomendation
          sxList={{ gap: '1rem', padding: 0 }}
          tours={listTourRecommendation?.data.slice(0, 4)}
        />
      </CommonStylesClient.Box>

      <CommonStylesClient.Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          a: { textDecoration: 'none' },
        }}
      >
        <Link href={pageUrls.Tour}>
          <CommonStylesClient.Typography
            type='text16'
            sx={{
              color: theme.colors?.client?.black,
              background: theme.colors?.client.lightGray,
              padding: '1rem 2rem',
              borderRadius: '1rem',
              cursor: 'pointer',
            }}
          >
            {t('TourDetailPage.viewAll')}
          </CommonStylesClient.Typography>
        </Link>
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(TourDetailRecomendation);
