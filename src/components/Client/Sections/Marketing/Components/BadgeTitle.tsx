import { useTheme } from '@mui/material';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { useTranslations } from 'next-intl';
import React from 'react';

const BadgeTitle = () => {
  //! State
  const theme = useTheme();
  const t = useTranslations();
  //! Function

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{ display: 'flex', flexDirection: 'column', rowGap: '1rem', alignItems: 'center' }}
    >
      <CommonStylesClient.Box sx={{ display: 'flex', alignItems: 'center', columnGap: '0.75rem' }}>
        <CommonStylesClient.Box
          sx={{ width: '32px', height: '2px', background: theme.colors?.client.coBaltBlue }}
        ></CommonStylesClient.Box>
        <CommonStylesClient.Typography
          type='title16'
          sx={{ color: theme.colors?.client.coBaltBlue }}
        >
          GotU.vn
        </CommonStylesClient.Typography>
      </CommonStylesClient.Box>
      <CommonStylesClient.Typography
        type='pcHeading2'
        sx={{
          maxWidth: '59.188rem',
          width: '100%',
          textAlign: 'center',
          [theme.breakpoints.down('lg')]: {
            fontSize: '1.5rem',
          },
        }}
      >
        {t('Marketing.lookingToGetAway')}
      </CommonStylesClient.Typography>
    </CommonStylesClient.Box>
  );
};

export default BadgeTitle;
