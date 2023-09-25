'use client';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import MyBookingTourPage from 'components/Client/MyBookingTourPage';
import Footer from 'components/Client/Sections/Footer';
import React from 'react';

const MyBookingTour = () => {
  return (
    <CommonStylesClient.Box sx={{ background: '#fcfcfd' }}>
      <MyBookingTourPage />
      <Footer />
    </CommonStylesClient.Box>
  );
};

export default MyBookingTour;
