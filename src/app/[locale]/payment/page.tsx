'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useSave } from 'stores/useStore';
import { MAX_WIDTH_CONTAINER, PaymentStatus } from 'constants/common';
import cachedKeys from 'constants/cachedKeys';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import NotFound from 'components/Client/Components/NotFound';
import PaymentHeading from 'components/Client/PaymentPage/PaymentHeading';
import PaymentContainer from 'components/Client/PaymentPage/PaymentContainer';
import useGetDetailBookingTour from 'modules/bookingTour/hooks/useGetDetailBookingTour';
import { paymentStatus } from 'helpers/common';
import { CircularProgress } from '@mui/material';
import PaymentSuccess from 'components/Client/PaymentPage/PaymentStatus/PaymentSuccess';
import PaymentFail from 'components/Client/PaymentPage/PaymentStatus/PaymentFail';
import pageUrls from 'constants/pageUrls';
import queryString from 'query-string';
import { showError } from 'helpers/toast';
import transactionBookServices from 'modules/transactionBook/transactionBook.services';

type Props = {};

export default function PaymentPage(props: Props) {
  const [statusPayment, setStatusPayment] = useState(PaymentStatus.PROCESSING);
  const save = useSave();
  const searchParams = useSearchParams();
  const tourId = searchParams.get('tourId') || '';
  const vnpTransactionStatus = searchParams.get('vnp_TransactionStatus');
  const { data: resDetailTourBooking, isLoading: loadingDetailTourBooking } =
    useGetDetailBookingTour(tourId, !!tourId);
  //! Effect
  useEffect(() => {
    save(cachedKeys.detailOfTourBooking, resDetailTourBooking);
    save(cachedKeys.loadingOfTourBookingDetail, loadingDetailTourBooking);
    save(cachedKeys.tourBookingId, !!tourId ? tourId : 0);
    save(cachedKeys.paymentStatus, status);
  }, [save, resDetailTourBooking, loadingDetailTourBooking, tourId, status]);

  useEffect(() => {
    if (vnpTransactionStatus) {
      const queryParams = queryString.parse(window.location.search.slice(1));
      delete queryParams['tourId'];
      const vnPayParams = queryString.stringify(queryParams);
      const callPayment = async () => {
        try {
          const response = await transactionBookServices.paymentTour({
            tourBookingId: tourId,
            vnPayParam: vnPayParams,
          });
          if (response) {
            setStatusPayment(paymentStatus(response?.data?.data?.code));
          }
        } catch (error) {
          showError(error);
        }
      };
      callPayment();
    }
  }, [vnpTransactionStatus]);

  if (!tourId) {
    return <NotFound />;
  }

  if (loadingDetailTourBooking) {
    return (
      <CommonStylesClient.Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: `calc(100vh - 96px)`,
        }}
      >
        <CircularProgress />
      </CommonStylesClient.Box>
    );
  }

  if (statusPayment === PaymentStatus.SUCCESS) {
    return <PaymentSuccess />;
  }

  if (statusPayment === PaymentStatus.FAIL) {
    return <PaymentFail />;
  }

  return (
    <CommonStylesClient.Box>
      <PaymentHeading />
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
        <PaymentContainer />
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
}
