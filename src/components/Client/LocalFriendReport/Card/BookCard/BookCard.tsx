import { useTheme } from '@mui/material';
import CommonIcons from 'components/Client/CommonIcons';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { useTranslations } from 'next-intl';
import React from 'react';

const BookCard = () => {
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
          {t('booked')}
        </CommonStylesClient.Typography>

        <CommonStylesClient.Typography type='pcHeading3' sx={{ color: theme.colors?.client.white }}>
          238
        </CommonStylesClient.Typography>

        <CommonStylesClient.Box sx={{ display: 'flex', gap: '0.125rem' }}>
          <CommonIcons.IconArrowUp />
          <CommonStylesClient.Typography type='title10' sx={{ color: theme.colors?.client.white }}>
            5.8%
          </CommonStylesClient.Typography>
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>

      <CommonIcons.IconFrame />
    </CommonStylesClient.Box>
  );
};
export default React.memo(BookCard);
