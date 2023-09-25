import React from 'react';
import { Grid } from '@mui/material';

import { MAX_WIDTH_CONTAINER } from 'constants/common';
import useCheckResolution from 'hooks/useCheckResolution';
import LeftSide from './Components/LeftSide';
import RightSide from './Components/RightSide';
import FindTourSectionMobile from './MobileScreen';
interface FindTourSectionProps {}

const FindTourSection = (props: FindTourSectionProps) => {
  //! State
  const { isMobile } = useCheckResolution();
  //! Function

  //! Render
  if (isMobile) {
    return (
      <Grid
        container
        direction='column'
        sx={{
          padding: '2.5rem 1.5rem',
          width: '100%',
        }}
      >
        <FindTourSectionMobile />
      </Grid>
    );
  }
  return (
    <Grid
      container
      direction='row'
      sx={{
        padding: {
          lg: '7.5rem 0',
          width: '100%',
          maxWidth: MAX_WIDTH_CONTAINER,
          margin: '0 auto',
        },
      }}
    >
      <LeftSide />
      <RightSide />
    </Grid>
  );
};

export default React.memo(FindTourSection);
