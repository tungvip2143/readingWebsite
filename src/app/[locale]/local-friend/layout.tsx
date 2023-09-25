'use client';

import React, { useState } from 'react';
import CommonStyles from 'components/CommonStyles';
import DefaultLayoutTourGuide from 'components/DefaultLayoutTourGuide';
import router from 'routes/router';
import { useTranslations } from 'next-intl';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import CommonIconsClient from 'components/Client/CommonIcons';
import withPrivate from '../../../HOCs/withPrivate';
import withAuthorization from '../../../HOCs/withAuthorization';
import { useTheme } from '@mui/material';
import { Roles } from 'constants/common';

const LayoutTourGuide = ({ children }: { children?: React.ReactNode }) => {
  //! State
  const t = useTranslations();
  const theme = useTheme();

  //! Function
  const renderHeader = () => {
    return (
      <CommonStyles.Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          backgroundColor: theme.colors?.white,
        }}
      >
        <CommonStyles.Box>
          <CommonStyles.Typography
            variant='h4'
            sx={{ color: theme.colors?.client.black, fontSize: '1rem', fontWeight: 500 }}
          >
            {t('Routes.home')}
          </CommonStyles.Typography>
        </CommonStyles.Box>

        <CommonStyles.Box sx={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <CommonStyles.Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <CommonIconsClient.IconNotification />
            <CommonStyles.Box sx={{ position: 'absolute', top: '-0.875rem', right: '0' }}>
              <CommonIconsClient.IconStatusNotification />
            </CommonStyles.Box>
          </CommonStyles.Box>

          <CommonStylesClient.Divider
            orientation='vertical'
            variant='middle'
            flexItem
            sx={{
              borderColor: theme.colors?.client.borderGray,
              margin: 0,
            }}
          />
          <CommonStylesClient.AccountMenu />
        </CommonStyles.Box>
      </CommonStyles.Box>
    );
  };

  //! Render
  return (
    <DefaultLayoutTourGuide header={renderHeader()} router={router().routerTourGuide}>
      <CommonStyles.Box
        sx={{
          marginTop: '2.625rem',
          padding: '2.25rem 3.5rem',
          minHeight: '100vh',
        }}
      >
        {children}
      </CommonStyles.Box>
    </DefaultLayoutTourGuide>
  );
};

export default withPrivate(withAuthorization(LayoutTourGuide, [Roles.TOUR_GUIDE]));
