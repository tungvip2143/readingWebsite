import React from 'react';
import { Skeleton } from '@mui/material';
import CommonStylesClient from 'components/Client/CommonStylesClient';

interface SkeletonServiceProps {}

const SkeletonService = (props: SkeletonServiceProps) => {
  //! State

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        display: 'flex',
        marginBottom: '3rem',
        marginRight: '1rem',
      }}
    >
      <CommonStylesClient.Box>
        <Skeleton variant='rounded' width={'6.25rem'} height={'6.25rem'} />
      </CommonStylesClient.Box>

      <CommonStylesClient.Box
        sx={{
          display: 'inline-flex',
          flexDirection: 'column',
          flexShrink: 0,
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginLeft: '1.5rem',
        }}
      >
        <Skeleton variant='text' width={230} height={22} />
        <Skeleton variant='text' width={200} height={22} />

        <Skeleton variant='text' width={165} height={28} />
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(SkeletonService);
