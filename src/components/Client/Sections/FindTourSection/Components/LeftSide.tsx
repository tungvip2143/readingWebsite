import React from 'react';
import Image from 'next/image';
import { Grid, useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';

import findTourImage1 from '../../../../../../public/images/Client/FindTour/findTour1.png';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import PeopleBooked from './PeopleBooked';
import SearchTour from './SearchTour';

interface LeftSideProps {}

const LeftSide = (props: LeftSideProps) => {
  //! State
  const theme = useTheme();
  const t = useTranslations('FindTour');

  //! Function

  //! Render
  return (
    <Grid item lg={9} container>
      {/* TITLE WITH IMAGE */}
      {/* TITLE */}
      <Grid
        item
        lg={8}
        justifyContent='flex-start'
        direction='column'
        sx={{
          display: 'flex',
          textAlign: 'left',
          gap: '1rem',
        }}
      >
        <CommonStylesClient.TypographyWithLine label={t('timeToGo')} />
        <CommonStylesClient.Typography type={'pcHeading1'}>
          {t('heading')}
        </CommonStylesClient.Typography>
        <CommonStylesClient.Typography
          type='text16'
          sx={{ color: theme.colors?.client?.darkGray, maxWidth: 600 }}
        >
          {t('subHeading')}
        </CommonStylesClient.Typography>
      </Grid>
      {/* IMAGE */}
      <Grid
        item
        lg={4}
        sx={{
          display: 'flex',
        }}
        justifyContent='flex-end'
      >
        <Image
          src={findTourImage1}
          alt='Tour image'
          style={{
            height: 364,
          }}
        />
      </Grid>
      {/* FORM SEARCH */}
      <Grid item lg={10.7}>
        <SearchTour />
      </Grid>
      <Grid item lg={12} sx={{ marginTop: '2rem' }}>
        <PeopleBooked />
      </Grid>
      {/* USER BOOK */}
    </Grid>
  );
};

export default React.memo(LeftSide);
