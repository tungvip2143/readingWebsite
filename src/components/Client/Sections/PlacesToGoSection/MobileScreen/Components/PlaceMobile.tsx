import React from 'react';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import CommonIcons from 'components/Client/CommonIcons';
import Image from 'next/image';

import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';

interface PlaceMobileProps {
  name: string;
  image: any;
  price: string;
  rating: number;
  hashTag: string;
}

const PlaceMobile = (props: PlaceMobileProps) => {
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
        marginBottom: '2rem',
        marginRight: '1rem',
      }}
    >
      <CommonStylesClient.Box>
        <Image
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

      <CommonStylesClient.Box
        sx={{
          display: 'inline-flex',
          flexDirection: 'column',
          flexShrink: 0,
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginLeft: '1rem',
        }}
      >
        <CommonStylesClient.Typography type='mobiHeading3'>{name}</CommonStylesClient.Typography>
        <CommonStylesClient.Typography type='text14'>{hashTag}</CommonStylesClient.Typography>

        <CommonStylesClient.Box sx={{ display: 'flex', gap: '0.2rem', alignItems: 'baseline' }}>
          <CommonStylesClient.Typography type='text10'>{t('from')}</CommonStylesClient.Typography>
          <CommonStylesClient.Typography
            type='mobiHeading3'
            sx={{ color: theme.colors?.client.coBaltBlue }}
          >
            {price}
          </CommonStylesClient.Typography>
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>

      <CommonStylesClient.Box sx={{ display: 'flex', gap: '0.2rem', alignItems: 'baseline' }}>
        <CommonStylesClient.Box sx={{ position: 'relative', top: '2px' }}>
          <CommonIcons.IconStar />
        </CommonStylesClient.Box>

        <CommonStylesClient.Typography type='title12'>{rating}</CommonStylesClient.Typography>
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(PlaceMobile);
