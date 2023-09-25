import React from 'react';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import TourDetailImage from './Components/TourDetailImage';
import HeadingTourDetailContainer from './Components/HeadingTourDetailContainer';
import LanguagesTourDetailContainer from './Components/LanguagesTourDetailContainer';
import DescriptionTourDetailContainer from './Components/DescriptionTourDetailContainer';
import ScheduleTourDetailContainer from './Components/ScheduleTourDetailContainer';
import ServiceTourDetailContainer from './Components/ServiceTourDetailContainer';
import ReviewsTourDetailContainer from './Components/ReviewsTourDetailContainer';
import FindTourGuide from './Components/FindTourGuide';

interface TourDetailContainerProps {}

const TourDetailContainer = (props: TourDetailContainerProps) => {
  //! State

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box>
      {/* Image */}
      <TourDetailImage />

      <CommonStylesClient.Box sx={{ display: 'flex', flexDirection: 'row', gap: '5.5rem' }}>
        <CommonStylesClient.Box sx={{ width: 728 }}>
          <HeadingTourDetailContainer />

          <LanguagesTourDetailContainer />

          <DescriptionTourDetailContainer />

          <ScheduleTourDetailContainer />

          <ServiceTourDetailContainer />

          <ReviewsTourDetailContainer />
        </CommonStylesClient.Box>

        <CommonStylesClient.Box
          sx={{
            width: 384,
          }}
        >
          <FindTourGuide />
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(TourDetailContainer);
