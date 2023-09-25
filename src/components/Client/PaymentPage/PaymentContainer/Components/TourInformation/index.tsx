import React from 'react';
import { useTheme } from '@mui/material';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import { IMG_URL } from 'constants/apiUrls';
import CommonIcons from 'components/Client/CommonIcons';
import { formatPrice } from 'helpers/common';

interface TourInformationProps {
  imageTour: string;
  name: string;
  location: string;
  rate: number;
  price: number;
}

const TourInformation = (props: TourInformationProps) => {
  //! State
  const { imageTour, name = '', location = '', rate = 0, price = 0 } = props;
  const theme = useTheme();
  const imageTourSrc = `${IMG_URL}/${imageTour}`;
  //! Function

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}
    >
      <CommonStylesClient.Box
        sx={{
          img: {
            width: 220,
            height: 150,
            objectFit: 'cover',
            borderRadius: '1rem',
          },
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: '1rem',
          height: '100%',
        }}
      >
        <img src={imageTourSrc} />
        <CommonStylesClient.Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: 150,
          }}
        >
          <CommonStylesClient.Typography
            type='pcHeading4'
            sx={{ color: theme.colors?.client?.black }}
          >
            {name}
          </CommonStylesClient.Typography>

          <CommonStylesClient.Typography
            type='text16'
            sx={{ color: theme.colors?.client?.darkGray }}
          >
            <CommonIcons.IconLocationBlue /> {location}
          </CommonStylesClient.Typography>

          <CommonStylesClient.Typography
            type='mobiHeading2'
            sx={{ color: theme.colors?.client?.coBaltBlue }}
          >
            {formatPrice(Number(price))}
          </CommonStylesClient.Typography>
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>
      {/*  */}
      <CommonStylesClient.Box
        sx={{ display: 'flex', gap: '0.2rem', alignItems: 'baseline', width: 45 }}
      >
        <CommonStylesClient.Box sx={{ position: 'relative', top: '2px' }}>
          <CommonIcons.IconStar />
        </CommonStylesClient.Box>

        <CommonStylesClient.Typography type='title14' sx={{ color: theme.colors?.client.darkGray }}>
          {rate}
        </CommonStylesClient.Typography>
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(TourInformation);
