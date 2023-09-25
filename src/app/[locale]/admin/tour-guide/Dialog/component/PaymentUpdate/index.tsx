import { Grid, useTheme } from '@mui/material';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import CustomFields from 'components/CustomFields';
import { FastField, useFormikContext } from 'formik';
import { useTranslations } from 'next-intl';
import React from 'react';
import { isCheckUpdate } from '../ProfileUpdate';
import { FormTourGuideValues } from '../../AddForm';

interface Props {}
const PaymentUpdate = (props: Props) => {
  //! State
  const t = useTranslations();
  const theme = useTheme();
  const { values } = useFormikContext<FormTourGuideValues>();
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
  //! Function

  //! Render
  return (
    <CommonStyles.Box sx={{ mt: 2 }}>
      <CommonStyles.Typography
        variant='subtitle2'
        sx={{
          color: theme?.colors?.bgneutral900,
          fontSize: '1.25rem',
          lineHeight: '1.875rem',
          fontWeight: 'bold',
        }}
      >
        {t('LocalFriend.paymentInformation')}
      </CommonStyles.Typography>
      <Grid container rowSpacing={4} columnSpacing={{ xs: 2 }} sx={styles.gridContainer}>
        <Grid item xs={4} md={4}>
          <CommonStyles.Box
            sx={{
              border: isCheckUpdate(values, 'bankName')
                ? `0.125rem solid ${theme?.colors?.bgyellow600}`
                : undefined,
              padding: isCheckUpdate(values, 'bankName') ? '0.2rem' : undefined,
            }}
          >
            <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
              {t('LocalFriend.bankName')}
            </CommonStyles.Typography>
            <FastField
              size='small'
              component={CustomFields.TextField}
              name='draft.bankName'
              placeholder={t('LocalFriend.bankName')}
              fullWidth
              disabled
            />
          </CommonStyles.Box>
        </Grid>
        <Grid item xs={4} md={4}>
          <CommonStyles.Box
            sx={{
              border: isCheckUpdate(values, 'accountNumber')
                ? `0.125rem solid ${theme?.colors?.bgyellow600}`
                : undefined,
              padding: isCheckUpdate(values, 'accountNumber') ? '0.2rem' : undefined,
            }}
          >
            <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
              {t('LocalFriend.accountNumber')}
            </CommonStyles.Typography>
            <FastField
              size='small'
              component={CustomFields.TextField}
              name='draft.accountNumber'
              placeholder={t('LocalFriend.accountNumber')}
              fullWidth
              iconEndInput={<CommonIcons.CreditCard />}
              disabled
            />
          </CommonStyles.Box>
        </Grid>
        <Grid item xs={4} md={4}>
          <CommonStyles.Box
            sx={{
              border: isCheckUpdate(values, 'beneficiaryName')
                ? `0.125rem solid ${theme?.colors?.bgyellow600}`
                : undefined,
              padding: isCheckUpdate(values, 'beneficiaryName') ? '0.2rem' : undefined,
            }}
          >
            <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
              {t('LocalFriend.beneficiaryName')}
            </CommonStyles.Typography>
            <FastField
              size='small'
              component={CustomFields.TextField}
              name='draft.beneficiaryName'
              placeholder={t('LocalFriend.beneficiaryName')}
              fullWidth
              iconEndInput={<CommonIcons.Money />}
              disabled
            />
          </CommonStyles.Box>
        </Grid>
      </Grid>
    </CommonStyles.Box>
  );
};

export default PaymentUpdate;
