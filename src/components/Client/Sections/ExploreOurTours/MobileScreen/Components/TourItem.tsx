import React from 'react';
import { TourI } from './TourLists';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import Image from 'next/image';
import CommonIcons from 'components/Client/CommonIcons';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';

interface TourItemProps {
  tour: TourI;
}

export default function TourItem(props: TourItemProps) {
  //! State
  const theme = useTheme();
  const t = useTranslations();
  const { tour } = props;
  const { image, name, place, price, rating } = tour;

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box>
      <CommonStylesClient.Box sx={{ width: '100%', marginBottom: '0.875rem' }}>
        <Image src={image} style={{ width: '100%', borderRadius: '1rem' }} alt={`Image ${place}`} />
      </CommonStylesClient.Box>

      <CommonStylesClient.Box sx={{ marginBottom: '0.25rem' }}>
        <CommonStylesClient.Typography
          type='mobiHeading2'
          sx={{ color: theme.colors?.client.white }}
        >
          {name}
        </CommonStylesClient.Typography>
      </CommonStylesClient.Box>

      <CommonStylesClient.Box sx={{ marginBottom: '1rem' }}>
        <CommonStylesClient.Typography type='text16' sx={{ color: theme.colors?.client.gray }}>
          {place}
        </CommonStylesClient.Typography>
      </CommonStylesClient.Box>

      <CommonStylesClient.Box
        sx={{
          paddingTop: '1rem',
          borderTop: `1px solid ${theme.colors?.client.darkGray}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <CommonStylesClient.Typography
          type='mobiHeading2'
          sx={{ color: theme.colors?.client.white }}
        >
          ${price}/{t('ExploreOurTours.night')}
        </CommonStylesClient.Typography>

        <CommonStylesClient.Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CommonIcons.IconStar />
          <CommonStylesClient.Box>
            <CommonStylesClient.Typography
              type='title16'
              sx={{ color: theme.colors?.client.lightGray, marginLeft: '0.25rem' }}
            >
              {rating}
            </CommonStylesClient.Typography>
          </CommonStylesClient.Box>
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
}
