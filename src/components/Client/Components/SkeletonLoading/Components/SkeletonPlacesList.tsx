import React from 'react';
import { Skeleton } from '@mui/material';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import SkeletonService from './SkeletonService';

interface SkeletonPlacesListProps {}

const SkeletonPlacesList = (props: SkeletonPlacesListProps) => {
  //! State

  //! Function
  const arrSkelton = ['1', '2', '3', '4'];
  //! Render
  return (
    <CommonStylesClient.Box>
      <Skeleton variant='text' width={209} height={34} />

      <CommonStylesClient.Box
        sx={{
          display: 'flex',
          gap: '2rem 3.75rem',
          flexWrap: 'wrap',
          flexDirection: 'row',
          padding: '1.5rem 0',
        }}
      >
        {arrSkelton.map((item: string) => {
          return <SkeletonService key={item} />;
        })}
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(SkeletonPlacesList);
