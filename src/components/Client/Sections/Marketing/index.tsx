import React from 'react';
import BadgeTitle from './Components/BadgeTitle';
import BooknowVideo from './Components/BooknowVideo';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { MAX_WIDTH_CONTAINER } from 'constants/common';
import useCheckResolution from 'hooks/useCheckResolution';

import MobileMarketing from './MobileScreen';
import DealBooking from './Components/DealBooking';

const Marketing = () => {
  //!State
  const { isMobile } = useCheckResolution();

  //!Function

  //!Render
  if (isMobile) {
    return <MobileMarketing />;
  }

  return (
    <CommonStylesClient.Box
      sx={{
        width: '100%',
        display: 'inline-flex',
        paddingTop: '7.5rem',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '3rem',
        margin: '0 auto',
      }}
    >
      <BadgeTitle />
      <BooknowVideo />
      <DealBooking />
    </CommonStylesClient.Box>
  );
};

export default Marketing;
