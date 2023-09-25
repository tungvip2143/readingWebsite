import React from 'react';
import { Skeleton } from '@mui/material';

import CommonStylesClient from 'components/Client/CommonStylesClient';

interface SkeletonCategoryProps {}

const SkeletonCategory = (props: SkeletonCategoryProps) => {
  //! State

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
      }}
    >
      <Skeleton variant='circular' width={120} height={120} />
      <CommonStylesClient.Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          flexDirection: 'column',
        }}
      >
        <Skeleton variant='text' width={136} />
        <Skeleton variant='rounded' width={102} height={38} />
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(SkeletonCategory);
