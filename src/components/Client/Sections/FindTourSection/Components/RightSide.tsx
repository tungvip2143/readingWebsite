import React from 'react';
import Image from 'next/image';
import { Grid } from '@mui/material';

import findTourImage2 from '../../../../../../public/images/Client/FindTour/findTour2.png';
import findTourImage3 from '../../../../../../public/images/Client/FindTour/findTour3.png';

interface RightSideProps {}

const RightSide = (props: RightSideProps) => {
  //! State

  //! Function

  //! Render
  return (
    <Grid item container lg={3} sx={{ display: 'flex', gap: '2rem' }}>
      <Grid item xs={12} sx={{ display: 'flex' }} justifyContent='flex-end'>
        <Image
          src={findTourImage2}
          alt='Tour image 2'
          style={{
            borderRadius: '1rem',
          }}
        />
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex' }} justifyContent='flex-end'>
        <Image
          src={findTourImage3}
          alt='Tour image 3'
          style={{
            borderRadius: '1rem',
          }}
        />
      </Grid>
    </Grid>
  );
};

export default React.memo(RightSide);
