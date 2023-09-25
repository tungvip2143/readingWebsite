import React from 'react';
import { Grid } from '@mui/material';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import SkeletonLoading from 'components/Client/Components/SkeletonLoading';
import JourneyCard from './JourneyCard';
import { TourCategory } from 'modules/tour-category/tour-category.interface';
import { SkeletonType } from 'constants/common';

interface JourneyListProps {
  data: TourCategory[];
  loading?: boolean;
}

const JourneyList = (props: JourneyListProps) => {
  //! State
  const { data, loading = false } = props;

  //! Function

  const Loading = () => {
    const arrSkeleton = ['1', '2', '3', '4', '5'];
    return arrSkeleton.map((item: string) => {
      return (
        <Grid key={item} item lg={4} sx={{ padding: '1rem', width: 320 }}>
          <SkeletonLoading type={SkeletonType.CATEGORY} />
        </Grid>
      );
    });
  };
  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        gap: '0.876rem',
        maxWidth: 1120,
        width: '100%',
        margin: 'auto',
        padding: '2rem 0',
      }}
    >
      <Grid container sx={{ justifyContent: 'center' }}>
        {loading ? (
          <Loading />
        ) : (
          data.map((item: TourCategory) => {
            return (
              <Grid key={item.id} item lg={4} sx={{ padding: '1rem', width: 320 }}>
                <JourneyCard
                  href={item?.id}
                  label={item?.name}
                  image={item?.thumbnail}
                  numberTour={item?.count || 0}
                />
              </Grid>
            );
          })
        )}
      </Grid>
    </CommonStylesClient.Box>
  );
};

export default React.memo(JourneyList);
