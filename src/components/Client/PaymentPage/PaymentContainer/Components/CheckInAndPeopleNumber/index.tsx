import React from 'react';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { useTranslations } from 'next-intl';
import { useTheme } from '@mui/material';

interface CheckInAndPeopleNumberProps {
  checkInDate: string;
  totalAdult: string | number;
  totalChildren: string | number;
}

const CheckInAndPeopleNumber = (props: CheckInAndPeopleNumberProps) => {
  //! State
  const { checkInDate, totalAdult, totalChildren } = props;
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
          {`${totalAdult} ${t('adult')}`}
        </CommonStylesClient.Typography>
        <CommonStylesClient.Typography type='text16' sx={{ color: theme.colors?.client?.darkGray }}>
          {`${totalChildren} ${t('children')}`}
        </CommonStylesClient.Typography>
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(CheckInAndPeopleNumber);
