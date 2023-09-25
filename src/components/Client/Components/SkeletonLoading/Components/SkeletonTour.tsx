import React from 'react';
import { Skeleton, useTheme } from '@mui/material';

import CommonStylesClient from 'components/Client/CommonStylesClient';

interface SkeletonTourProps {}

const SkeletonTour = (props: SkeletonTourProps) => {
  //! State
  const theme = useTheme();

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box sx={{ width: '25%' }}>
      <Skeleton
        variant='rounded'
        width={288}
        height={282}
        sx={{ marginBottom: '0.875rem', background: theme.colors?.client.midGray }}
      />

      <CommonStylesClient.Box sx={{ marginBottom: '0.25rem' }}>
        <Skeleton
          variant='text'
          width={191}
          height={28}
          sx={{ background: theme.colors?.client.midGray }}
        />
      </CommonStylesClient.Box>

      <CommonStylesClient.Box sx={{ marginBottom: '1rem' }}>
        <Skeleton
          variant='text'
          width={135}
          height={24}
          sx={{ background: theme.colors?.client.midGray }}
        />
      </CommonStylesClient.Box>

      <CommonStylesClient.Box
        sx={{
          paddingTop: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Skeleton
          variant='rounded'
          width={250}
          height={28}
          sx={{ background: theme.colors?.client.midGray }}
        />
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(SkeletonTour);
