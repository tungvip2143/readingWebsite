'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import PlacesHeading from 'components/Client/PlacesPage/PlacesHeading';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { MAX_WIDTH_CONTAINER } from 'constants/common';
import PlacesContainer from 'components/Client/PlacesPage/PlacesContainer';
import useGetReservationSuccessfulCount from 'modules/reservationVendor/hooks/useGetReservationSuccessfulCount';

type Props = {};

interface CategoryInformation {
  label: string;
  numberBooking: number;
  backgroundImage: string;
}

export default function TourPage(props: Props) {
  const t = useTranslations();
  const searchParams = useSearchParams();

  const { data: resReservationSuccessfulCount } = useGetReservationSuccessfulCount();

  return (
    <CommonStylesClient.Box>
      <PlacesHeading
        label={t('PlacesPage.heading')}
        numberBooking={Number(resReservationSuccessfulCount || 0)}
      />
      <CommonStylesClient.Box
        sx={{
          padding: {
            width: '100%',
            maxWidth: MAX_WIDTH_CONTAINER,
            margin: '0 auto',
          },
        }}
      >
        <PlacesContainer />
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
}
