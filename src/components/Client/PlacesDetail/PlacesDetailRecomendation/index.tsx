import React from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from '@mui/material';
import Link from 'next/link';

import { Places } from 'interfaces/common';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import EachRecomendation from './Components/EachRecomendation';
import useFiltersHandler from 'hooks/useFiltersHandler';
import useGetListVendorRecommendation from 'modules/vendorRecommendation/hooks/useGetListVendorRecommendation';
import pageUrls from 'constants/pageUrls';

interface PlacesDetailRecomendationProps {
  provinceCode: string;
  vendorId?: string | number | undefined;
}

const PlacesDetailRecomendation = (props: PlacesDetailRecomendationProps) => {
  //! State
  const t = useTranslations();
  const theme = useTheme();
  const { filters } = useFiltersHandler({
    provinceCode: props.provinceCode,
    recentid: props.vendorId,
  });
  const { data: listVendorRecommendation } = useGetListVendorRecommendation(filters);
  //! Function

  //! Render
  if (listVendorRecommendation && listVendorRecommendation?.data.length <= 0) {
    return null;
  }

  return (
    <CommonStylesClient.Box sx={{ marginBottom: '2.5rem', width: '100%' }}>
      <CommonStylesClient.Typography
        type='pcHeading2'
        sx={{ color: theme.colors?.client?.midBlack }}
      >
        {t('PlacesDetail.recommendationPlaces')}
      </CommonStylesClient.Typography>

      <CommonStylesClient.Box sx={{ padding: '3rem 0' }}>
        <EachRecomendation
          sxList={{ gap: '1rem', padding: 0 }}
          listOfPlaces={listVendorRecommendation?.data.slice(0, 6)}
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
        <Link href={pageUrls.Places}>
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

export default React.memo(PlacesDetailRecomendation);
