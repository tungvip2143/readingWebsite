import React from 'react';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { Skeleton } from '@mui/material';
import SkeletonTour from './SkeletonTour';

interface SkeletonTourListProps {}

const SkeletonTourList = (props: SkeletonTourListProps) => {
  //! State

  //! Function
  const arrSkelton = ['1', '2', '3'];

  //! Render
  return (
    <CommonStylesClient.Box>
      <Skeleton variant='text' width={209} height={34} />

      <CommonStylesClient.Box
        sx={{
          display: 'flex',
          gap: '1.5rem',
          flexWrap: 'wrap',
          flexDirection: 'row',
          padding: '1.5rem 0',
        }}
      >
        {arrSkelton.map((item: string) => {
          return (
            <CommonStylesClient.Box sx={{ width: 287 }}>
              <SkeletonTour key={item} />
            </CommonStylesClient.Box>
          );
        })}
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(SkeletonTourList);
