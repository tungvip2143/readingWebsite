import { useTheme } from '@mui/material';
import CommonIcons from 'components/Client/CommonIcons';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { useTranslations } from 'next-intl';
import React from 'react';

const RevenueCard = () => {
  //! State
  const theme = useTheme();
  const t = useTranslations('ReportLocalFiend');

  //! Function

  //! Render

  return (
    <CommonStylesClient.Box
      sx={{
        borderRadius: '0.75rem',
      }}
    >
      <CommonStylesClient.Box
        sx={{
          padding: '1rem 0.5rem 0 1rem',
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
        }}
      >
        <CommonStylesClient.Typography type='title10' sx={{ color: theme.colors?.client.white }}>
          {t('revenue')}
        </CommonStylesClient.Typography>
        <CommonStylesClient.Box sx={{ display: 'flex', color: theme.colors?.client.white }}>
          <CommonStylesClient.Typography
            type='pcHeading3'
            sx={{ color: theme.colors?.client.white }}
          >
            67,000,000
          </CommonStylesClient.Typography>{' '}
          VNĐ
        </CommonStylesClient.Box>

        <CommonStylesClient.Box sx={{ display: 'flex', gap: '0.125rem' }}>
          <CommonIcons.IconArrowUp />
          <CommonStylesClient.Typography type='title10' sx={{ color: theme.colors?.client.white }}>
            5.8%
          </CommonStylesClient.Typography>
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>

      <CommonIcons.IconReceipt />
    </CommonStylesClient.Box>
  );
};
export default React.memo(RevenueCard);
