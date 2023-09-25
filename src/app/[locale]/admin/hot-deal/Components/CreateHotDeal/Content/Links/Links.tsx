import { useTheme } from '@mui/material';
import CommonStyles from 'components/CommonStyles';
import CustomFields from 'components/CustomFields';
import { FastField } from 'formik';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function Links() {
  //! State
  const theme = useTheme();
  const t = useTranslations();

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      sx={{
        padding: '2rem 1rem',
        border: `0.0625rem solid ${theme.colors?.bgneutral200}`,
        borderRadius: '0.25rem',
        flex: 1,
        width: 'calc(73% + 0.125rem)',
      }}
    >
      <CommonStyles.Typography
        variant='h2'
        sx={{
          fontSize: '1.125rem',
          color: theme.colors?.custom?.textGrey,
          fontWeight: 500,
          marginBottom: '2rem',
        }}
      >
        {t('HotDeal.sidebarLink')}
      </CommonStyles.Typography>

      <CommonStyles.Box
        sx={{ display: 'flex', gap: 1, alignItems: 'center', marginBottom: '1rem' }}
      >
        <CommonStyles.Typography
          variant='h4'
          sx={{
            fontSize: '1.125rem',
            color: theme.colors?.custom?.textGrey,
            fontWeight: 500,
            width: '40%',
          }}
        >
          {t('HotDeal.deepLinkApp')}
        </CommonStyles.Typography>

        <FastField
          name='deepLinkApp'
          component={CustomFields.TextField}
          size='small'
          sx={{
            color: theme.colors?.custom?.textBlack,
          }}
          fullWidth
        />
      </CommonStyles.Box>

      <CommonStyles.Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <CommonStyles.Typography
          variant='h4'
          sx={{
            fontSize: '1.125rem',
            color: theme.colors?.custom?.textGrey,
            fontWeight: 500,
            width: '40%',
          }}
        >
          {t('HotDeal.webLink')}
        </CommonStyles.Typography>

        <FastField
          name='webLink'
          component={CustomFields.TextField}
          size='small'
          sx={{
            color: theme.colors?.custom?.textBlack,
          }}
          fullWidth
        />
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
}
