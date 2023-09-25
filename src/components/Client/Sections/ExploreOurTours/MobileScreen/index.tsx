import { useTheme } from '@mui/material';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import React, { memo } from 'react';
import NavbarWithFilters from './Components/NavbarWithFilters';
import TourLists from './Components/TourLists';
import { useTranslations } from 'next-intl';

const MobileExploreOurTours = () => {
  //! State
  const theme = useTheme();
  const t = useTranslations();

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{ padding: '1.875rem 2.5rem', backgroundColor: theme.colors?.client.backgroundBlue }}
    >
      <CommonStylesClient.Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          paddingBottom: '3rem',
        }}
      >
        <CommonStylesClient.Box sx={{ width: '100%' }}>
          <CommonStylesClient.Typography
            type='mobiHeading1'
            sx={{ color: theme.colors?.client.white }}
          >
            {t('ExploreOurTours.exploreOurTours')}
          </CommonStylesClient.Typography>
        </CommonStylesClient.Box>

        <CommonStylesClient.Box>
          <CommonStylesClient.Typography
            type='text14'
            sx={{ color: theme.colors?.client.lightGray }}
          >
            {t('ExploreOurTours.titleDescription')}
          </CommonStylesClient.Typography>
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>

      <NavbarWithFilters />
      <TourLists />
    </CommonStylesClient.Box>
  );
};

export default memo(MobileExploreOurTours);
