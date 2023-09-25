import React from 'react';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { useTranslations } from 'next-intl';
import { useTheme } from '@mui/material';

interface CheckInAndTotalCustomerProps {
  checkInDate: string;
  totalCustomer: string | number;
}

const CheckInAndTotalCustomer = (props: CheckInAndTotalCustomerProps) => {
  //! State
  const { checkInDate, totalCustomer } = props;
  const t = useTranslations('PaymentPage');
  const theme = useTheme();
  //! Function

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
    >
      <CommonStylesClient.Box sx={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
        <CommonStylesClient.Typography
          type='pcHeading4'
          sx={{ color: theme.colors?.client?.black }}
        >
          {t('checkInDate')}
        </CommonStylesClient.Typography>
        <CommonStylesClient.Typography type='text16' sx={{ color: theme.colors?.client?.darkGray }}>
          {checkInDate}
        </CommonStylesClient.Typography>
      </CommonStylesClient.Box>

      <CommonStylesClient.Box sx={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
        <CommonStylesClient.Typography
          type='pcHeading4'
          sx={{ color: theme.colors?.client?.black }}
        >
          {t('numberPeople')}
        </CommonStylesClient.Typography>
        <CommonStylesClient.Typography type='text16' sx={{ color: theme.colors?.client?.darkGray }}>
          {`${totalCustomer} ${t('adult')}`}
        </CommonStylesClient.Typography>
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(CheckInAndTotalCustomer);
