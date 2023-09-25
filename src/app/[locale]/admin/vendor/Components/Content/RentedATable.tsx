import { useTheme } from '@mui/material';
import CommonStyles from 'components/CommonStyles';
import CustomFields from 'components/CustomFields';
import { FastField } from 'formik';
import { useTranslations } from 'next-intl';
import React from 'react';

const RentedATable = () => {
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
        {t('Vendor.rentedTable')}
      </CommonStyles.Typography>

      <CommonStyles.Box sx={{ marginBottom: '1rem' }}>
        <CommonStyles.Typography
          variant='h4'
          sx={{
            fontSize: '1.125rem',
            color: theme.colors?.custom?.textBlack,
            marginBottom: '0.5rem',
            fontWeight: 500,
          }}
        >
          {t('Vendor.priceOfPerson')}
        </CommonStyles.Typography>
        <FastField
          name='bookingPrice'
          component={CustomFields.TextField}
          size='small'
          sx={{
            color: theme.colors?.custom?.textBlack,
            background: theme.colors?.bgneutral50,
          }}
          fullWidth
          isFormatNumber
        />
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default React.memo(RentedATable);
