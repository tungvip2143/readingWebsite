import React from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from '@mui/material';

import useAuth from 'hooks/useAuth';
import { useGet } from 'stores/useStore';
import cachedKeys from 'constants/cachedKeys';
import { ReservationVendor } from 'modules/reservationVendor/reservationVendor.interface';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import CustomerInformation from 'components/Client/PaymentPage/PaymentContainer/Components/CustomerInformation';
import VendorInformation from './VendorInformation';
import CheckInAndTotalCustomer from './CheckInAndTotalCustomer';
import moment from 'moment';
import Payment from 'components/Client/PaymentPage/PaymentContainer/Components/Payment';

interface PaymentBookVendorProps {}

const Divider = () => {
  const theme = useTheme();
  return (
    <CommonStylesClient.Box
      sx={{
        width: '100%',
        height: '1px',
        marginTop: '0.5rem',
        marginBottom: '0.5rem',
        background: theme.colors?.client?.midGray,
      }}
    />
  );
};

const PaymentBookVendor = (props: PaymentBookVendorProps) => {
  //! State
  const theme = useTheme();
  const auth = useAuth();
  const t = useTranslations('WaitingAcceptBookPage');

  const detailOfReservationVendor = useGet(
    cachedKeys.detailOfReservationVendor
  ) as ReservationVendor;
  const vendorBookingId = useGet(cachedKeys.vendorBookingId);

  // Vendor
  const nameVendor = detailOfReservationVendor.Vendor?.name || '';
  const imageVendor = detailOfReservationVendor?.Vendor?.thumbnail || '';
  const priceVendor = detailOfReservationVendor?.Vendor?.bookingPrice || 0;
  const dayVendor = `${detailOfReservationVendor?.Vendor?.startServeDay} - ${detailOfReservationVendor?.Vendor?.endServeDay}`;
  const timeVendor = `${detailOfReservationVendor?.Vendor?.startServeTime} - ${detailOfReservationVendor?.Vendor?.endServeTime}`;

  // Customer
  const nameCustomer = `${auth?.user?.firstName} ${auth?.user?.lastName}` || '';
  const phoneCustomer = `0${auth?.user?.phone}` || '';

  // CheckIn TotalCustomer
  const checkInDate = moment(detailOfReservationVendor?.time).format('DD/MM/YYYY - HH:mm');
  const totalCustomer = detailOfReservationVendor?.totalCustomer || 0;
  const totalPrice = detailOfReservationVendor?.totalPrice || 0;

  const price = detailOfReservationVendor?.price || 0;
  const vendorSystemCommission = detailOfReservationVendor?.vendorSystemCommission || 0;
  const vendorSystemPrice = detailOfReservationVendor?.vendorSystemPrice || 0;

  const priceService = (price * vendorSystemCommission) / 100;

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        margin: '2rem 0',
      }}
    >
      <CommonStylesClient.Box
        sx={{ width: 728, display: 'flex', gap: '2rem', flexDirection: 'column' }}
      >
        {/* Vendor */}
        <VendorInformation
          name={nameVendor}
          imageVendor={imageVendor}
          day={dayVendor}
          time={timeVendor}
          price={priceVendor}
        />
        <Divider />
        {/* Customer */}
        <CustomerInformation name={nameCustomer} phone={phoneCustomer} />
        <Divider />
        <CheckInAndTotalCustomer checkInDate={checkInDate} totalCustomer={totalCustomer} />
      </CommonStylesClient.Box>

      {/*  */}
      <CommonStylesClient.Box
        sx={{ width: 384, border: `1px solid #E9EBED`, padding: '1.5rem', borderRadius: '1rem' }}
      >
        <Payment
          priceProvisional={price}
          priceService={priceService}
          priceFixedService={vendorSystemPrice}
          priceTotal={totalPrice}
          id={vendorBookingId}
          isPaymentVendor
        />
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(PaymentBookVendor);
