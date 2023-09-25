import React from 'react';
import tour1 from '../../../../../../../public/images/Client/tour1.png';
import tour2 from '../../../../../../../public/images/Client/tour2.png';
import tour3 from '../../../../../../../public/images/Client/tour3.png';
import tour4 from '../../../../../../../public/images/Client/tour4.png';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { StaticImageData } from 'next/image';
import TourItem from './TourItem';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';

export interface TourI {
  id: string;
  image: StaticImageData | string;
  name: string;
  place: string;
  price: number;
  rating: number;
}

export default function TourLists() {
  //! State
  const theme = useTheme();
  const t = useTranslations();
  const data: TourI[] = [
    {
      id: '1',
      image: tour1,
      name: t('ExploreOurTours.luxuryResort'),
      place: 'Indonesia',
      price: 140,
      rating: 4.8,
    },
    {
      id: '2',
      image: tour2,
      name: t('ExploreOurTours.luxuryResort'),
      place: 'Indonesia',
      price: 140,
      rating: 4.8,
    },
    {
      id: '3',
      image: tour3,
      name: t('ExploreOurTours.luxuryResort'),
      place: 'Indonesia',
      price: 140,
      rating: 4.8,
    },
    {
      id: '4',
      image: tour4,
      name: t('ExploreOurTours.luxuryResort'),
      place: 'Indonesia',
      price: 140,
      rating: 4.8,
    },
  ];

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box>
      <CommonStylesClient.Box
        sx={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: '2.5rem' }}
      >
        {data.map((el: TourI) => {
          return <TourItem key={el.id} tour={el} />;
        })}
      </CommonStylesClient.Box>

      <CommonStylesClient.Box sx={{ textAlign: 'center' }}>
        <CommonStylesClient.Button
          variant='contained'
          sx={{ backgroundColor: theme.colors?.client.white, color: theme.colors?.client.midBlack }}
          onClick={() => console.log('view all tours')}
        >
          {t('ExploreOurTours.viewAllTours')}
        </CommonStylesClient.Button>
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
}
