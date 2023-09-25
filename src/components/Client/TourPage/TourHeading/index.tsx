import React, { useMemo } from 'react';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import Heading from 'components/Client/Components/Heading';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { MAX_WIDTH_CONTAINER } from 'constants/common';
import { IMG_URL } from 'constants/apiUrls';

interface TourHeadingProps {
  label: string;
  numberBooking: number;
  backgroundImage: string;
}

const TourHeading = (props: TourHeadingProps) => {
  const { label, numberBooking, backgroundImage } = props;
  //! State
  const t = useTranslations('TourPage');

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover !important',
        background: `url('${IMG_URL}/${backgroundImage}')`,
        position: 'relative',
        ['::before']: {
          content: `''`,
          display: 'block',
          position: 'absolute',
          filter: `blur(0px) brightness(0.5)`,
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          background: 'inherit',
          zIndex: 0,
        },
      }}
    >
      <CommonStylesClient.Box
        sx={{
          paddingTop: '60px',
          padding: {
            width: '100%',
            maxWidth: MAX_WIDTH_CONTAINER,
            margin: '0 auto',
            position: 'relative',
            zIndex: 1,
          },
        }}
      >
        <Heading
          headingLabel={!!label ? label : t('heading')}
          tourBookingNumber={!!numberBooking ? numberBooking : 0}
          backgroundImage={!!backgroundImage ? backgroundImage : ''}
        />
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(TourHeading);
