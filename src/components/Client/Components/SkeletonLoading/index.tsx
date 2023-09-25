import React from 'react';
import { Skeleton, SxProps } from '@mui/material';

import { SkeletonType } from 'constants/common';
import SkeletonTour from './Components/SkeletonTour';
import SkeletonCategory from './Components/SkeletonCategory';
import SkeletonService from './Components/SkeletonService';
import SkeletonDetail from './Components/SkeletonDetail';
import SkeletonPlacesList from './Components/SkeletonPlacesList';
import SkeletonTourList from './Components/SkeletonTourList';

interface SkeletonLoadingProps {
  type?: string;
  sx?: SxProps;
}

const SkeletonLoading = (props: SkeletonLoadingProps) => {
  //! State
  const { type = '', sx } = props;

  //! Function
  const renderSkeletonLoading = () => {
    switch (type) {
      case SkeletonType.TOUR:
        return <SkeletonTour />;
      case SkeletonType.CATEGORY:
        return <SkeletonCategory />;
      case SkeletonType.SERVICE:
        return <SkeletonService />;
      case SkeletonType.DETAIL:
        return <SkeletonDetail />;
      case SkeletonType.PLACES_LIST:
        return <SkeletonPlacesList />;
      case SkeletonType.TOUR_LIST:
        return <SkeletonTourList />;
      default:
        return <Skeleton width={'100%'} sx={sx} />;
    }
  };
  //! Render

  return renderSkeletonLoading();
};

export default React.memo(SkeletonLoading);
