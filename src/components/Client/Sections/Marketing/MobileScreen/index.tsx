import React from 'react';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import BadgeTitle from './Components/BadgeTitle';
import BooknowVideo from './Components/BooknowVideo';
import DealBooking from './Components/DealBooking';

interface MobileMarketingProps {}

const MobileMarketing = (props: MobileMarketingProps) => {
  //! State

  //! Function

  //! Render
  return (
    <CommonStyles.Box>
      <BadgeTitle />
      <BooknowVideo />
      <DealBooking />
    </CommonStyles.Box>
  );
};

export default React.memo(MobileMarketing);
