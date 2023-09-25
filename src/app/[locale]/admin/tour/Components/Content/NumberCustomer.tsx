import CommonStyles from 'components/CommonStyles';
import React from 'react';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import FormikField from 'components/FormikField';
import CustomFields from 'components/CustomFields';

const NumberCustomer = () => {
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
        }}
      >
        {t('Tour.numberCustomer')}
      </CommonStyles.Typography>
      <CommonStyles.Box sx={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <CommonStyles.Box sx={{ width: '50%' }}>
          <CommonStyles.Typography
            variant='h4'
            sx={{
              fontSize: '1.125rem',
              color: theme.colors?.custom?.textGrey,
              fontWeight: 500,
              marginBottom: '0.5rem',
            }}
          >
            {t('Tour.from')}
          </CommonStyles.Typography>
          <FormikField
            name='minCustomer'
            component={CustomFields.TextField}
            fullWidth
            size='small'
          />
        </CommonStyles.Box>
        <CommonStyles.Box sx={{ width: '50%' }}>
          <CommonStyles.Typography
            variant='h4'
            sx={{
              fontSize: '1.125rem',
              color: theme.colors?.custom?.textGrey,
              fontWeight: 500,
              marginBottom: '0.5rem',
            }}
          >
            {t('Tour.to')}
          </CommonStyles.Typography>
          <FormikField
            name='maxCustomer'
            component={CustomFields.TextField}
            fullWidth
            size='small'
          />
        </CommonStyles.Box>
      </CommonStyles.Box>
      <CommonStyles.Box sx={{ my: '1rem' }}>
        <CommonStyles.Typography
          variant='h4'
          sx={{
            fontSize: '1.125rem',
            color: theme.colors?.custom?.textGrey,
            fontWeight: 500,
            marginBottom: '0.5rem',
          }}
        >
          {t('Tour.defaultCustomer')}
        </CommonStyles.Typography>
        <FormikField
          name='defaultNumberCustomer'
          component={CustomFields.TextField}
          fullWidth
          size='small'
          isFormatNumber
        />
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default React.memo(NumberCustomer);
