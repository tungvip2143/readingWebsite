import React from 'react';
import { useTranslations } from 'next-intl';

import Heading from 'components/Client/Components/Heading';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { MAX_WIDTH_CONTAINER } from 'constants/common';

interface PlacesHeadingProps {
  label: string;
  numberBooking: number;
  backgroundImage?: string;
}

const PlacesHeading = (props: PlacesHeadingProps) => {
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
        background: `url('${backgroundImage}')`,
      }}
    >
      <CommonStylesClient.Box
        sx={{
          paddingTop: '60px',
          padding: {
            width: '100%',
            maxWidth: MAX_WIDTH_CONTAINER,
            margin: '0 auto',
          },
        }}
      >
        <Heading
          headingLabel={!!label ? label : t('heading')}
          tourBookingNumber={!!numberBooking ? numberBooking : 0}
        />
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(PlacesHeading);
