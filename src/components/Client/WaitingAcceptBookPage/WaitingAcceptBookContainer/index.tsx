import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTheme } from '@mui/material';

import { useGet } from 'stores/useStore';
import cachedKeys from 'constants/cachedKeys';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { ReservationVendor } from 'modules/reservationVendor/reservationVendor.interface';
import { PaymentStatus, VendorBookingStatus } from 'constants/common';
import CheckingBook from './Components/CheckingBook';
import MatchedBook from './Components/MatchedBook';
import CancelBook from './Components/CancelBook';
import pageUrls from 'constants/pageUrls';
import BookInformation from './Components/BookInformation';
import PaymentBookVendor from './Components/PaymentBookVendor';
import { paymentStatus } from 'helpers/common';
import queryString from 'query-string';
import transactionBookServices from 'modules/transactionBook/transactionBook.services';
import { showError } from 'helpers/toast';

interface WaitingAcceptBookContainerProps {}

const StepBooking = {
  DEFAULT: 0,
  WAITING_CONFIRM: 1,
  PAYMENT: 2,
};

const WaitingAcceptBookContainer = (props: WaitingAcceptBookContainerProps) => {
  //! State
  const [statusPayment, setStatusPayment] = useState(PaymentStatus.PROCESSING);

  const [doneStep, setDoneStep] = useState<number>(StepBooking.DEFAULT);
  const router = useRouter();
  const searchParams = useSearchParams();
  const theme = useTheme();
  const vendorBookingId = useGet(cachedKeys.vendorBookingId);
  const t = useTranslations('WaitingAcceptBookPage');

  const detailOfReservationVendor = useGet(
    cachedKeys.detailOfReservationVendor
  ) as ReservationVendor;

  const status = detailOfReservationVendor?.status;
  const vnpTransactionStatus = searchParams.get('vnp_TransactionStatus');
  // Hoàn thành step đợi
  const hasDoneStepWaitingConfirm = doneStep === StepBooking.WAITING_CONFIRM;
  const hasDonePayment = doneStep === StepBooking.PAYMENT;
  // Người dùng đang đợi/đã bị chấp nhận/ đã bị từ chối book bàn
  const isWaitingConfirmBooking = status === VendorBookingStatus.PENDING;
  const isAcceptedBooking = status === VendorBookingStatus.MATCHED;
  const isDeniedBooking = status === VendorBookingStatus.CANCELED;

  //! Function
  const handleClickButton = () => {
    if (isAcceptedBooking) {
      return setDoneStep(StepBooking.WAITING_CONFIRM);
    }
    if (isDeniedBooking) {
      return router.push(`${pageUrls.Homepage}`);
    }
  };

  const handleClickExploreMore = () => {
    return router.push(`${pageUrls.Homepage}`);
  };

  const renderImageWithStatus = () => {
    if (!hasDoneStepWaitingConfirm) {
      if (statusPayment === PaymentStatus.SUCCESS) {
        return <MatchedBook isPayment />;
      }
      if (statusPayment === PaymentStatus.FAIL) {
        return <CancelBook isPayment />;
      }
      if (isWaitingConfirmBooking) {
        return <CheckingBook />;
      }
      if (isAcceptedBooking) {
        return <MatchedBook />;
      }
      if (isDeniedBooking) {
        return <CancelBook />;
      }
    }
    return <CheckingBook isPayment />;
  };

  const renderTitleStepWithStatus = () => {
    switch (status) {
      case VendorBookingStatus.PENDING:
        return t('watiingConfirm');
      case VendorBookingStatus.MATCHED:
        return t('matched');
      case VendorBookingStatus.CANCELED:
        return t('cancel');
      default:
        return t('watiingConfirm');
    }
  };

  const renderTitleButtonWithStatus = () => {
    if (isAcceptedBooking) {
      return t('payment');
    }
    if (isDeniedBooking) {
      return t('exploreMore');
    }
    return t('exploreMore');
  };

  const renderComponentWithStep = () => {
    if (hasDoneStepWaitingConfirm) {
      return <PaymentBookVendor />;
    }
    if (hasDonePayment) {
      return (
        <CommonStylesClient.Button
          sx={{
            background: theme.colors?.client?.gray,
            border: 'none',
            boxShadow: 'none',
            borderRadius: '1rem',
            [':hover']: {
              background: theme.colors?.client?.gray,
            },
          }}
          onClick={handleClickExploreMore}
        >
          <CommonStylesClient.Typography
            type='mobiHeading4'
            sx={{
              color: theme.colors?.client?.black,
              padding: '0.5rem 1rem',
            }}
          >
            {t('exploreMore')}
          </CommonStylesClient.Typography>
        </CommonStylesClient.Button>
      );
    }
    return (
      <BookInformation
        onClickButton={handleClickButton}
        labelButton={renderTitleButtonWithStatus()}
        isShowButton={!isWaitingConfirmBooking}
      />
    );
  };

  //! Effect
  useEffect(() => {
    if (statusPayment === PaymentStatus.SUCCESS) {
      return setDoneStep(StepBooking.PAYMENT);
    }
  }, [statusPayment]);

  useEffect(() => {
    if (vnpTransactionStatus && vendorBookingId) {
      const queryParams = queryString.parse(window.location.search.slice(1));
      delete queryParams['vendorBookingId'];
      const vnPayParams = queryString.stringify(queryParams);
      const callPayment = async () => {
        try {
          const response = await transactionBookServices.paymentVendor({
            vendorBookingId: vendorBookingId,
            vnPayParam: vnPayParams,
          });
          if (response) {
            setStatusPayment(paymentStatus(response?.data?.data?.code));
          }
        } catch (error) {
          setStatusPayment(paymentStatus('02'));
          showError(error);
        }
      };
      callPayment();
    }
  }, [vnpTransactionStatus,vendorBookingId]);
  //! Render

  const steps = [`${renderTitleStepWithStatus()}`, `${t('payment')}`];

  return (
    <CommonStylesClient.Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      {renderImageWithStatus()}

      <CommonStylesClient.Box sx={{ width: '100%' }}>
        <Stepper activeStep={doneStep} alternativeLabel>
          {steps.map((label: string) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </CommonStylesClient.Box>

      {renderComponentWithStep()}
    </CommonStylesClient.Box>
  );
};

export default React.memo(WaitingAcceptBookContainer);
