import { useTheme } from '@mui/material';
import CommonStyles from 'components/CommonStyles';
import CustomFields from 'components/CustomFields';
import { FastField } from 'formik';
import { useTranslations } from 'next-intl';
import React from 'react';

const Commission = () => {
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
        width: 'calc(73% + 0.125rem)',
        marginBottom: '1rem',
      }}
    >
      <CommonStyles.Typography
        variant='h4'
        sx={{
          fontSize: '1.125rem',
          color: theme.colors?.custom?.textGrey,
          fontWeight: 500,
          marginBottom: '2rem',
        }}
      >
        {t('Tour.commission')}
      </CommonStyles.Typography>

      <CommonStyles.Box sx={{ display: 'flex', gap: 5 }}>
        <CommonStyles.Box sx={{ width: '50%' }}>
          <CommonStyles.Typography
            variant='h4'
            sx={{
              fontSize: '1.125rem',
              color: theme.colors?.custom?.textBlack,
              fontWeight: 500,
              marginBottom: '0.5rem',
            }}
          >
            {t('Tour.createdBy')}
          </CommonStyles.Typography>

          <FastField
            name='createdBy'
            component={CustomFields.TextField}
            size='small'
            sx={{
              color: theme.colors?.custom?.textBlack,
            }}
            fullWidth
          />
        </CommonStyles.Box>

        <CommonStyles.Box sx={{ width: '50%' }}>
          <CommonStyles.Typography
            variant='h4'
            sx={{
              fontSize: '1.125rem',
              color: theme.colors?.custom?.textBlack,
              fontWeight: 500,
              marginBottom: '0.5rem',
            }}
          >
            % {t('Tour.commissionPercentage')}
          </CommonStyles.Typography>

          <FastField
            name='commission'
            component={CustomFields.TextField}
            size='small'
            sx={{
              color: theme.colors?.custom?.textBlack,
            }}
            fullWidth
          />
        </CommonStyles.Box>
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default React.memo(Commission);
