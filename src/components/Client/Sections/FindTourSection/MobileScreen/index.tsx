import React from 'react';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import FindTourHeading from './Components/FindTourHeading';

interface FindTourSectionMobileProps {}

const FindTourSectionMobile = (props: FindTourSectionMobileProps) => {
  //! State

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <FindTourHeading />
    </CommonStylesClient.Box>
  );
};

export default React.memo(FindTourSectionMobile);
