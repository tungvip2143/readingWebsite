import React from 'react';
import { Skeleton } from '@mui/material';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import { MAX_WIDTH_CONTAINER } from 'constants/common';
import SkeletonTour from './SkeletonTour';

interface SkeletonDetailProps {}

const SkeletonDetail = (props: SkeletonDetailProps) => {
  //! State
  const arrTour = ['1', '2', '3', '4'];
  //! Function

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        padding: {
          width: '100%',
          maxWidth: MAX_WIDTH_CONTAINER,
          margin: '0 auto',
        },
      }}
    >
      <CommonStylesClient.Box
        sx={{
          padding: {
            lg: '3.75rem 0',
          },
        }}
      >
        <CommonStylesClient.Box sx={{ marginBottom: '2.5rem', width: '100%' }}>
          <Skeleton variant='text' width={300} height={22} />
        </CommonStylesClient.Box>

        <CommonStylesClient.Box
          sx={{
            display: 'flex',
            gap: '1.5rem',
            flexDirection: 'row',
            marginBottom: '2rem',
            img: {
              borderRadius: '1rem',
              objectFit: 'cover',
            },
          }}
        >
          <Skeleton variant='rounded' width={792} height={568} />
          <CommonStylesClient.Box sx={{ display: 'flex', gap: '1.5rem', flexDirection: 'column' }}>
            <Skeleton variant='rounded' width={384} height={272} />
            <Skeleton variant='rounded' width={384} height={272} />
          </CommonStylesClient.Box>
        </CommonStylesClient.Box>
        <CommonStylesClient.Box sx={{ display: 'flex', flexDirection: 'row', gap: '5.5rem' }}>
          <CommonStylesClient.Box sx={{ width: 728 }}>
            <Skeleton variant='rounded' width={728} height={1446} />
          </CommonStylesClient.Box>

          <CommonStylesClient.Box
            sx={{
              width: 384,
            }}
          >
            <Skeleton variant='rounded' width={384} height={403} />
          </CommonStylesClient.Box>
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>

      <CommonStylesClient.Box
        sx={{
          padding: {
            lg: '5rem 0',
          },
        }}
      >
        <CommonStylesClient.Box sx={{ marginBottom: '2.5rem', width: '100%' }}>
          <Skeleton variant='text' width={522} height={67} />

          <CommonStylesClient.Box sx={{ padding: '3rem 0',display: 'flex', flexDirection: 'row', gap: '1.5rem' }}>
            {arrTour.map((item: string) => {
              return <SkeletonTour key={item} />;
            })}
          </CommonStylesClient.Box>

          <CommonStylesClient.Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              a: { textDecoration: 'none' },
            }}
          >
            <Skeleton variant='rounded' width={125} height={56} />
          </CommonStylesClient.Box>
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(SkeletonDetail);
