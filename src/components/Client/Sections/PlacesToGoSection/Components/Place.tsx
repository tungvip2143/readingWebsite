import React from 'react';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import CommonIcons from 'components/Client/CommonIcons';
import { StaticImageData } from 'next/image';

import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';

interface PlaceProps {
  name: string;
  image: string;
  price: string;
  rating: number;
  hashTag: string[];
}

const Place = (props: PlaceProps) => {
  //! State
  const theme = useTheme();
  const t = useTranslations('PlacesToGoSession');

  const { name, image, price, hashTag, rating } = props;
  //! Function

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        display: 'flex',
        gap: '1.5rem',
      }}
    >
      <CommonStylesClient.Box sx={{ width: '6.25rem', height: '6.25rem' }}>
        <img
          src={image}
          alt='Place 1'
          style={{
            width: '6.25rem',
            height: '6.25rem',
            objectFit: 'cover',
            borderRadius: '0.625rem',
          }}
        />
      </CommonStylesClient.Box>

      <CommonStylesClient.Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <CommonStylesClient.Box
          sx={{
            display: 'inline-flex',
            flexDirection: 'column',
            flexShrink: 0,
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            width: 236,
            height: '6.25rem',
          }}
        >
          <CommonStylesClient.Box sx={{ width: '100%' }}>
            <CommonStylesClient.Box
              sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
            >
              <CommonStylesClient.Typography type='mobiHeading2'>
                {name}
              </CommonStylesClient.Typography>

              <CommonStylesClient.Box
                sx={{ display: 'flex', gap: '0.2rem', alignItems: 'baseline', width: 45 }}
              >
                <CommonStylesClient.Box sx={{ position: 'relative', top: '2px' }}>
                  <CommonIcons.IconStar />
                </CommonStylesClient.Box>

                <CommonStylesClient.Typography
                  type='title14'
                  sx={{ color: theme.colors?.client.darkGray }}
                >
                  {rating}
                </CommonStylesClient.Typography>
              </CommonStylesClient.Box>
            </CommonStylesClient.Box>
            <CommonStylesClient.Typography
              type='text16'
              sx={{ color: theme.colors?.client.darkGray, marginTop: '0.25rem' }}
            >
              {hashTag}
            </CommonStylesClient.Typography>
          </CommonStylesClient.Box>

          <CommonStylesClient.Box sx={{ display: 'flex', gap: '0.2rem', alignItems: 'baseline' }}>
            <CommonStylesClient.Typography type='text10'>{t('from')}</CommonStylesClient.Typography>
            <CommonStylesClient.Typography
              type='mobiHeading2'
              sx={{ color: theme.colors?.client.coBaltBlue }}
            >
              {price}
            </CommonStylesClient.Typography>
          </CommonStylesClient.Box>
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(Place);
