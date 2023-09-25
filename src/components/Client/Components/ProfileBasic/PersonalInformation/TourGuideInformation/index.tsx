import CommonStylesClient from 'components/Client/CommonStylesClient';
import React from 'react';
import LeftContent from './LeftContent';
import RightContent from './RightContent';

interface TourGuideInformationProps {}

const TourGuideInformation = (props: TourGuideInformationProps) => {
  //! State

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box sx={{ display: 'flex', gap: 6, marginBottom: '2rem' }}>
      <LeftContent />
      <RightContent />
    </CommonStylesClient.Box>
  );
};

export default React.memo(TourGuideInformation);
