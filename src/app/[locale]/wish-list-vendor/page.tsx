'use client';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import Footer from 'components/Client/Sections/Footer';
import WishListContent from 'components/Client/WishListVendorPage/Components';
import { MAX_WIDTH_CONTAINER } from 'constants/common';
import React from 'react';

const WishListVendor = () => {
  return (
    <CommonStylesClient.Box sx={{ background: '#fcfcfd' }}>
      <WishListContent />
      <Footer />
    </CommonStylesClient.Box>
  );
};

export default WishListVendor;
