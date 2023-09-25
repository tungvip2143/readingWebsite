import React from 'react';
import MyBookingVendorHeading from './MyBookingHeading';
import MyBookingContainer from './MyBookingContainer';
import CommonStylesClient from '../CommonStylesClient';
import { MAX_WIDTH_CONTAINER } from 'constants/common';

const MyBookingVendorPage = () => {
  return (
    <CommonStylesClient.Box
      sx={{
        maxWidth: MAX_WIDTH_CONTAINER,
        display: 'flex',
        flexDirection: 'column',
        margin: '6.25rem auto',
      }}
    >
      <MyBookingVendorHeading />
      <MyBookingContainer />
    </CommonStylesClient.Box>
  );
};

export default MyBookingVendorPage;
