import CommonStylesClient from 'components/Client/CommonStylesClient';
import { useTranslations } from 'next-intl';
import React from 'react';

const WishListHeading = () => {
  const t = useTranslations();
  return (
    <CommonStylesClient.Typography type='pcHeading2'>
      {t('WishListVendor.BookedWishListVendor')}
    </CommonStylesClient.Typography>
  );
};

export default WishListHeading;
