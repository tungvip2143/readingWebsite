import React from 'react';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';

interface CustomerInformationProps {
  name: string;
  phone: string | number;
}

const CustomerInformation = (props: CustomerInformationProps) => {
  //! State
  const { name, phone } = props;
  const theme = useTheme();
  const t = useTranslations('PaymentPage');

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box sx={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
      <CommonStylesClient.Typography type='pcHeading4' sx={{ color: theme.colors?.client?.black }}>
        {t('customerInformation')}
      </CommonStylesClient.Typography>

      <CommonStylesClient.Box sx={{ display: 'flex', width: '100%', gap: '1.5rem' }}>
        <CommonStylesClient.Typography type='text16' sx={{ color: theme.colors?.client?.darkGray }}>
          {t('nameCustomer')}
        </CommonStylesClient.Typography>

        <CommonStylesClient.Typography type='title16' sx={{ color: theme.colors?.client?.black }}>
          {name}
        </CommonStylesClient.Typography>
      </CommonStylesClient.Box>

      <CommonStylesClient.Box sx={{ display: 'flex', width: '100%', gap: '1.5rem' }}>
        <CommonStylesClient.Typography type='text16' sx={{ color: theme.colors?.client?.darkGray }}>
          {t('phoneCustomer')}
        </CommonStylesClient.Typography>

        <CommonStylesClient.Typography type='title16' sx={{ color: theme.colors?.client?.black }}>
          {phone}
        </CommonStylesClient.Typography>
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(CustomerInformation);
