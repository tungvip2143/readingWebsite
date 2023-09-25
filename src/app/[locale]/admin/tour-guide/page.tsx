'use client';
import React from 'react';

import CommonStyles from 'components/CommonStyles';
import TourGuideTable from './TourGuideTable';
import withAuthorization from 'HOCs/withAuthorization';
import { Roles } from 'constants/common';
import withPrivate from '../../../../HOCs/withPrivate';

const TourGuide = () => {
  return (
    <CommonStyles.Box>
      <TourGuideTable />
    </CommonStyles.Box>
  );
};

export default withPrivate(withAuthorization(TourGuide, [Roles.ADMIN]));
