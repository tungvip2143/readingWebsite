import React from 'react';
import MyBookingTourHeading from './MyBookingTourHeading';
import MyBookingTourContainer from './MyBookingTourContainer';
import CommonStylesClient from '../CommonStylesClient';
import { MAX_WIDTH_CONTAINER } from 'constants/common';

const MyBookingTourPage = () => {
  return (
    <CommonStylesClient.Box
      sx={{
        maxWidth: MAX_WIDTH_CONTAINER,
        display: 'flex',
        flexDirection: 'column',
        margin: '6.25rem auto',
      }}
    >
      <MyBookingTourHeading />
      <MyBookingTourContainer />
    </CommonStylesClient.Box>
  );
};

export default MyBookingTourPage;
