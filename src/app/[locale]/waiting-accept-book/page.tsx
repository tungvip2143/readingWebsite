'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { useSave } from 'stores/useStore';
import { MAX_WIDTH_CONTAINER, VendorBookingStatus } from 'constants/common';
import cachedKeys from 'constants/cachedKeys';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import NotFound from 'components/Client/Components/NotFound';
import WaitingAcceptBookContainer from 'components/Client/WaitingAcceptBookPage/WaitingAcceptBookContainer';
import useGetDetailReservationVendor from 'modules/reservationVendor/hooks/useGetDetailReservationVendor';
import pageUrls from 'constants/pageUrls';
import { showSuccess } from 'helpers/toast';
import { useTranslations } from 'next-intl';

type Props = {};

export default function WaitingAcceptBook(props: Props) {
  const save = useSave();
  const searchParams = useSearchParams();
  const router = useRouter();
  const vendorBookingId = searchParams.get('vendorBookingId');
  const redirectMyBookingVendor = searchParams.get('redirectMyBookingVendor');
  const t = useTranslations();

  const {
    data: resDetailReservationVendor,
    isLoading: loadingReservationVendor,
    refetch: refetchReservationVendor,
  } = useGetDetailReservationVendor(Number(vendorBookingId), !!vendorBookingId);
  const status = resDetailReservationVendor?.status;

  useEffect(() => {
    if (resDetailReservationVendor) {
      save(cachedKeys.detailOfReservationVendor, resDetailReservationVendor);
      save(cachedKeys.loadingOfReservationVendor, loadingReservationVendor);
      save(cachedKeys.vendorBookingId, !!vendorBookingId ? vendorBookingId : 0);
    }
  }, [save, resDetailReservationVendor, loadingReservationVendor, vendorBookingId]);

  //! Tạm thời thế này đã
  useEffect(() => {
    const interval = setInterval(() => {
      refetchReservationVendor();
    }, 1000);

    if (status !== VendorBookingStatus.PENDING.toString()) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [refetchReservationVendor, resDetailReservationVendor]);

  useEffect(() => {
    if (redirectMyBookingVendor === 'true') {
      showSuccess(t('TourDetailPage.successFindTour'));
      setTimeout(() => {
        return router.push(pageUrls.MyBookingVendor);
      }, 5000);
    }
  }, [redirectMyBookingVendor]);

  if (!vendorBookingId) {
    return <NotFound />;
  }
  return (
    <CommonStylesClient.Box>
      <CommonStylesClient.Box
        sx={{
          padding: {
            lg: '2.5rem 0',
            width: '100%',
            maxWidth: MAX_WIDTH_CONTAINER,
            margin: '0 auto',
          },
        }}
      >
        <WaitingAcceptBookContainer />
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
}
