import React from 'react';
import { useTheme } from '@mui/material';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import { IMG_URL } from 'constants/apiUrls';
import CommonIcons from 'components/Client/CommonIcons';
import { formatPrice } from 'helpers/common';

interface VendorInformationProps {
  imageVendor: string;
  name: string;
  day: string;
  time: string;
  price: number;
}

const VendorInformation = (props: VendorInformationProps) => {
  //! State
  const { imageVendor, name = '', day = '', time = '', price = 0 } = props;
  const theme = useTheme();
  const imageVendorSrc = `${IMG_URL}/${imageVendor}`;
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
        <img src={imageVendorSrc} />
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
            sx={{ color: theme.colors?.client?.darkGray, display: 'flex', alignItems: 'center' }}
          >
            <CommonIcons.IconCalendarYellow /> {day}
          </CommonStylesClient.Typography>

          <CommonStylesClient.Typography
            type='text16'
            sx={{ color: theme.colors?.client?.darkGray }}
          >
            <CommonIcons.IconClockGreen /> {time}
          </CommonStylesClient.Typography>
          <CommonStylesClient.Typography
            type='mobiHeading2'
            sx={{ color: theme.colors?.client?.coBaltBlue }}
          >
            {formatPrice(Number(price))}
          </CommonStylesClient.Typography>
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(VendorInformation);
