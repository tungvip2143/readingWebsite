import CommonStylesClient from 'components/Client/CommonStylesClient';
import React from 'react';
import WishListVendorTable from './components/WishListVendorTable';
import WishListTourTable from './components/WishListTourTable';

const WishListContainer = () => {
  return (
    <CommonStylesClient.Box sx={{ display: 'flex', gap: '2rem', justifyContent: 'space-between' }}>
      <WishListVendorTable />
      <CommonStylesClient.Divider orientation='vertical' flexItem variant='middle' />
      <WishListTourTable />
    </CommonStylesClient.Box>
  );
};

export default WishListContainer;
