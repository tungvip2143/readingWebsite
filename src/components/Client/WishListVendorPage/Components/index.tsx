import CommonStylesClient from 'components/Client/CommonStylesClient';
import { MAX_WIDTH_CONTAINER } from 'constants/common';
import React from 'react';
import WishListVendorHeading from './WishListHeading';
import WishListHeading from './WishListHeading';
import WishListContainer from './WishListContainer';

const WishListContent = () => {
  return (
    <CommonStylesClient.Box
      sx={{
        maxWidth: MAX_WIDTH_CONTAINER,
        display: 'flex',
        flexDirection: 'column',
        margin: '6.25rem auto',
      }}
    >
      <WishListHeading />
      <WishListContainer />
    </CommonStylesClient.Box>
  );
};

export default WishListContent;
