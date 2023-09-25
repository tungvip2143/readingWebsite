'use client';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import MyBookingVendorPage from 'components/Client/MyBookingVendorPage';
import Footer from 'components/Client/Sections/Footer';
import React from 'react';

const MyBookingVendor = () => {
  return (
    <CommonStylesClient.Box sx={{ background: '#fcfcfd' }}>
      <MyBookingVendorPage />
      <Footer />
    </CommonStylesClient.Box>
  );
};

export default MyBookingVendor;
