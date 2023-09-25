import React from 'react';
import { useTheme } from '@mui/material';
import Link from '@mui/material/Link';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import queryString from 'query-string';
import pageUrls from 'constants/pageUrls';
import { IMG_URL } from 'constants/apiUrls';

interface JourneyCardProps {
  label: string;
  image: string;
  numberTour: string | number;
  href: string | number;
}

const JourneyCard = (props: JourneyCardProps) => {
  const { label, image, numberTour, href } = props;
  //! State
  const theme = useTheme();

  //! Function
  const bodeParsed = {
    category: href,
  };

  const hrerParsed = `${pageUrls.Tour}?${queryString.stringify(bodeParsed)}`;

  //! Render
  return (
    <Link href={hrerParsed} underline='none'>
      <CommonStylesClient.Box
        sx={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          textAlign: 'left',
        }}
      >
        <img
          src={`${IMG_URL}/${image}`}
          alt={label}
          style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover' }}
        />
        <CommonStylesClient.Box
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            flexDirection: 'column',
          }}
        >
          <CommonStylesClient.Typography type='mobiHeading3'>{label}</CommonStylesClient.Typography>
          <CommonStylesClient.Typography
            type='text14'
            sx={{
              padding: '0.5rem 0.75rem',
              borderRadius: '2rem',
              background: theme?.colors?.client.midGray,
              color: theme.colors?.client?.grayScale,
              width: 102,
              height: 38,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'left',
            }}
          >
            {`${Number(numberTour).toLocaleString('vi')} tour`}
          </CommonStylesClient.Typography>
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>
    </Link>
  );
};

export default React.memo(JourneyCard);
