import { useTheme } from '@mui/material';
import CommonStyles from 'components/CommonStyles';
import CustomFields from 'components/CustomFields';
import { FastField } from 'formik';
import { useTranslations } from 'next-intl';
import React from 'react';

const TotalSlot = () => {
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
          color: theme.colors?.custom?.textBlack,
          marginBottom: '1rem',
          fontWeight: 500,
        }}
      >
        {t('Vendor.totalSlot')}
      </CommonStyles.Typography>

      <CommonStyles.Box sx={{ marginBottom: '1rem' }}>
        <CommonStyles.Box>
          <FastField
            name='totalSlot'
            component={CustomFields.TextField}
            fullWidth
            sx={{ background: theme.colors?.bgneutral50 }}
            size='small'
          />
        </CommonStyles.Box>
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default React.memo(TotalSlot);
