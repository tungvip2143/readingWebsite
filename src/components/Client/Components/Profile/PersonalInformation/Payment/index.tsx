import { Grid, useTheme } from '@mui/material';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import CustomFields from 'components/CustomFields';
import { FastField } from 'formik';
import { useTranslations } from 'next-intl';
import React from 'react';

const Payment = () => {
  //! State
  const t = useTranslations();
  const theme = useTheme();
  //! Funtion
  //! Css
  const styles = {
    title: {
      color: theme?.colors?.bgneutral900,
      fontSize: '1.25rem',
      lineHeight: '1.875rem',
      fontWeight: 'bold',
    },
    labelInput: {
      mb: 1,
    },
    contentItem: { display: 'flex', flexDirection: 'column', rowGap: 2 },
    gridContainer: {
      py: 2,
      '& .MuiGrid-item': { paddingTop: '1.25rem' },
    },
  };
  return (
    <CommonStyles.Box sx={{ mt: 2 }}>
      <CommonStyles.Typography
        variant='h4'
        sx={{
          color: theme.colors?.client.textPaginationBlack,
          fontSize: '0.875rem',
          fontWeight: 700,
          lineHeight: '1.313rem',
          letterSpacing: '0.035rem',
          marginBottom: '0.5rem',
        }}
      >
        {t('Profile.paymentInformation')}
      </CommonStyles.Typography>
      <Grid container rowSpacing={4} columnSpacing={{ xs: 2 }} sx={styles.gridContainer}>
        <Grid item xs={4} md={4}>
          <CommonStyles.Box>
            <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
              {t('Articles.bankName')}
            </CommonStyles.Typography>
            <FastField
              size='small'
              component={CustomFields.TextField}
              name='bankName'
              placeholder={t('Articles.bankName')}
              fullWidth
              //   disabled={isDisabled}
            />
          </CommonStyles.Box>
        </Grid>
        <Grid item xs={4} md={4}>
          <CommonStyles.Box>
            <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
              {t('Articles.accountNumber')}
            </CommonStyles.Typography>
            <FastField
              size='small'
              component={CustomFields.TextField}
              name='accountNumber'
              placeholder={t('Articles.accountNumber')}
              fullWidth
              iconEndInput={<CommonIcons.CreditCard />}
              //   disabled={isDisabled}
            />
          </CommonStyles.Box>
        </Grid>
        <Grid item xs={4} md={4}>
          <CommonStyles.Box>
            <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
              {t('Articles.beneficiaryName')}
            </CommonStyles.Typography>
            <FastField
              size='small'
              component={CustomFields.TextField}
              name='beneficiaryName'
              placeholder={t('Articles.beneficiaryName')}
              fullWidth
              iconEndInput={<CommonIcons.Money />}
              //   disabled={isDisabled}
            />
          </CommonStyles.Box>
        </Grid>
      </Grid>
    </CommonStyles.Box>
  );
};

export default Payment;
