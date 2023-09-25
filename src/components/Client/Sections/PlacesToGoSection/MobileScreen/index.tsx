import React from 'react';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';

import image1 from '../../../../../../public/images/tour1.jpg';
import PlaceMobile from './Components/PlaceMobile';

interface MobilePlacesToGoProps {}

const MobilePlacesToGo = (props: MobilePlacesToGoProps) => {
  //! State
  const theme = useTheme();
  const t = useTranslations('PlacesToGoSession');
  //! Function

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.colors?.client.white,
        marginTop: '2rem',
      }}
    >
      <CommonStylesClient.Box
        sx={{
          marginBottom: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          alignSelf: 'stretch',
        }}
      >
        <CommonStylesClient.Box sx={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
          <CommonStylesClient.Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <CommonStylesClient.Typography type='pcHeading3'>
              {t('PlacesToGo')}
            </CommonStylesClient.Typography>
            <CommonStylesClient.Button
              variant='contained'
              sx={{
                textTransform: 'none',
                borderRadius: '1rem',
                backgroundColor: theme.colors?.client.coBaltBlue,
              }}
            >
              {t('seeAll')}
            </CommonStylesClient.Button>
          </CommonStylesClient.Box>
          <CommonStylesClient.Typography type='text12' width='82%'>
            {t('descriptionPlaces')}
          </CommonStylesClient.Typography>
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>

      <CommonStylesClient.Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '1.2rem',
        }}
      >
        <PlaceMobile
          name='1900 Club'
          hashTag='#Bar #Nightlife'
          image={image1}
          price='290.000VNĐ'
          rating={4.9}
        />
        <PlaceMobile
          name='1900 Club'
          hashTag='#Bar #Nightlife'
          image={image1}
          price='290.000VNĐ'
          rating={4.9}
        />
        <PlaceMobile
          name='1900 Club'
          hashTag='#Bar #Nightlife'
          image={image1}
          price='290.000VNĐ'
          rating={4.9}
        />
        <PlaceMobile
          name='1900 Club'
          hashTag='#Bar #Nightlife'
          image={image1}
          price='290.000VNĐ'
          rating={4.9}
        />
        <PlaceMobile
          name='1900 Club'
          hashTag='#Bar #Nightlife'
          image={image1}
          price='290.000VNĐ'
          rating={4.9}
        />
        <PlaceMobile
          name='1900 Club'
          hashTag='#Bar #Nightlife'
          image={image1}
          price='290.000VNĐ'
          rating={4.9}
        />
        <PlaceMobile
          name='1900 Club'
          hashTag='#Bar #Nightlife'
          image={image1}
          price='290.000VNĐ'
          rating={4.9}
        />
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(MobilePlacesToGo);
