import CommonStylesClient from 'components/Client/CommonStylesClient';
import { useTranslations } from 'next-intl';
import React from 'react';

const MyBookingVendorHeading = () => {
  const t = useTranslations();
  return (
    <CommonStylesClient.Typography type='pcHeading2'>
      {t('MyBookingTour.BookedTours')}
    </CommonStylesClient.Typography>
  );
};

export default MyBookingVendorHeading;
