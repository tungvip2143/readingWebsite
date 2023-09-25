'use client';

import React from 'react';
import CommonStyles from 'components/CommonStyles';
import LocalFriendCard from 'components/Client/LocalFriendReport/Card';
import LocalFriendChart from 'components/Client/LocalFriendReport/Chart';

interface TourGuidePageProps {}

const TourGuidePage = (props: TourGuidePageProps) => {
  //! State

  //! Function

  //! Render
  return (
    <CommonStyles.Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <LocalFriendCard />
      <LocalFriendChart />
    </CommonStyles.Box>
  );
};

export default TourGuidePage;
