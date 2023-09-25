import { Grid, useTheme } from '@mui/material';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import CustomFields from 'components/CustomFields';
import { modalAction } from 'constants/common';
import { FastField } from 'formik';
import { useTranslations } from 'next-intl';
import React from 'react';

interface Props {
  actionStatus?: string;
}
const Payment = ({ actionStatus }: Props) => {
  //! State
  const t = useTranslations();
  const theme = useTheme();
  const isDisabled = actionStatus === modalAction.DETAILS;
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
      <Grid container rowSpacing={4} columnSpacing={{ xs: 2 }} sx={styles.gridContainer}>
        <Grid item xs={4} md={4}>
          <CommonStyles.Box>
            <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
              {t('LocalFriend.bankName')}
            </CommonStyles.Typography>
            <FastField
              size='small'
              component={CustomFields.TextField}
              name='bankName'
              placeholder={t('LocalFriend.bankName')}
              fullWidth
              disabled={isDisabled}
            />
          </CommonStyles.Box>
        </Grid>
        <Grid item xs={4} md={4}>
          <CommonStyles.Box>
            <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
              {t('LocalFriend.accountNumber')}
            </CommonStyles.Typography>
            <FastField
              size='small'
              component={CustomFields.TextField}
              name='accountNumber'
              placeholder={t('LocalFriend.accountNumber')}
              fullWidth
              iconEndInput={<CommonIcons.CreditCard />}
              disabled={isDisabled}
            />
          </CommonStyles.Box>
        </Grid>
        <Grid item xs={4} md={4}>
          <CommonStyles.Box>
            <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
              {t('LocalFriend.beneficiaryName')}
            </CommonStyles.Typography>
            <FastField
              size='small'
              component={CustomFields.TextField}
              name='beneficiaryName'
              placeholder={t('LocalFriend.beneficiaryName')}
              fullWidth
              iconEndInput={<CommonIcons.Money />}
              disabled={isDisabled}
            />
          </CommonStyles.Box>
        </Grid>
      </Grid>
    </CommonStyles.Box>
  );
};

export default Payment;
