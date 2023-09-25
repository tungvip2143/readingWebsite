import React from 'react';
import { useTranslations } from 'next-intl';
import { Grid, useTheme } from '@mui/material';
import Image from 'next/image';

import findTourImage1 from '../../../../../../../public/images/Client/FindTour/findTour1.png';
import findTourImage2 from '../../../../../../../public/images/Client/FindTour/findTour2.png';
import findTourImage3 from '../../../../../../../public/images/Client/FindTour/findTour3.png';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import PeopleBooked from '../../Components/PeopleBooked';

interface FindTourHeadingProps {}

const FindTourHeading = (props: FindTourHeadingProps) => {
  //! State
  const t = useTranslations('FindTour');
  const theme = useTheme();
  //! Function

  //! Render
  return (
    <CommonStylesClient.Box>
      <CommonStylesClient.Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'left',
          gap: '1rem',
        }}
      >
        <CommonStylesClient.TypographyWithLine label={t('timeToGo')} />
        <CommonStylesClient.Typography type={'mobiHeading1'}>
          {t('heading')}
        </CommonStylesClient.Typography>
        <CommonStylesClient.Typography type='text16' sx={{ color: theme.colors?.client?.darkGray }}>
          {t('subHeading')}
        </CommonStylesClient.Typography>
      </CommonStylesClient.Box>

      <CommonStylesClient.Box sx={{ display: 'flex', gap: '2rem', margin: '2rem 0' }}>
        <CommonStylesClient.Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
          }}
        >
          <Image
            src={findTourImage1}
            alt='Tour image'
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
            }}
          />

          <PeopleBooked />
        </CommonStylesClient.Box>

        <CommonStylesClient.Box
          sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}
        >
          <Image
            src={findTourImage2}
            alt='Tour image'
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
            }}
          />

          <Image
            src={findTourImage3}
            alt='Tour image'
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(FindTourHeading);
