import React from 'react';
import { useTheme } from '@mui/material';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import queryString from 'query-string';

import { useGet } from 'stores/useStore';
import Payment from './Components/Payment';
import { TourBooking } from 'modules/customers/customer.interface';
import useAuth from 'hooks/useAuth';
import TourInformation from './Components/TourInformation';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import CustomerInformation from './Components/CustomerInformation';
import CheckInAndPeopleNumber from './Components/CheckInAndPeopleNumber';
import TourguideInformation from './Components/TourguideInformation';
import cachedKeys from 'constants/cachedKeys';
import pageUrls from 'constants/pageUrls';

interface PaymentContainerProps {}

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

const PaymentContainer = (props: PaymentContainerProps) => {
  //! State
  const loadingOfTourBookingDetail = useGet(cachedKeys.loadingOfTourBookingDetail);
  const detailOfTourBooking = useGet(cachedKeys.detailOfTourBooking) as TourBooking;
  const tourBookingId = useGet(cachedKeys.tourBookingId);
  const auth = useAuth();
  const price = detailOfTourBooking?.price || 0;
  const totalPrice = detailOfTourBooking?.totalPrice || 0;
  const tourSystemCommistion = detailOfTourBooking?.tourSystemCommission || 0;
  const tourSystemPrice = detailOfTourBooking?.tourSystemPrice || 0;

  const priceService = (price * tourSystemCommistion) / 100;
  const route = useRouter();

  // Tour Infomation
  const nameTour = detailOfTourBooking?.Tours?.name || '';
  const imageTour = detailOfTourBooking?.Tours?.thumbnail || '';
  const locationTour = detailOfTourBooking?.Tours?.Area?.name || '';
  const rateTour = detailOfTourBooking?.Tours?.avgRate || 0;
  const priceTour = detailOfTourBooking?.Tours?.priceForAdult || 0;

  // Customer
  const nameCustomer = `${auth?.user?.firstName} ${auth?.user?.lastName}` || '';
  const phoneCustomer = `0${auth?.user?.phone}` || '';

  // CheckIn and Number
  const checkInDate = moment(detailOfTourBooking?.startTime).format('DD/MM/YYYY') || '';
  const totalAdult = detailOfTourBooking?.totalAdult || 0;
  const totalChildren = detailOfTourBooking?.totalChildren || 0;

  // Tour Guide
  const avatarTourGuide = detailOfTourBooking?.TourGuide?.avatar || '';
  const nameTourGuide =
    `${detailOfTourBooking?.TourGuide?.firstName} ${detailOfTourBooking?.TourGuide?.lastName}` ||
    '';
  const emailTourGuide = `0${detailOfTourBooking?.TourGuide?.phone}` || '';
  const rateTourGuide = detailOfTourBooking?.TourGuide?.avgRate || 0;

  //! Function
  const handleChangeTourGuide = () => {
    return route.push(
      `${pageUrls.FindTourGuide}?${queryString.stringify({ tourId: tourBookingId })}`
    );
  };

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}
    >
      <CommonStylesClient.Box
        sx={{ width: 728, display: 'flex', gap: '2rem', flexDirection: 'column' }}
      >
        {/* Tour */}
        <TourInformation
          name={nameTour}
          imageTour={imageTour}
          location={locationTour}
          rate={rateTour}
          price={priceTour}
        />
        <Divider />
        {/* Customer */}
        <CustomerInformation name={nameCustomer} phone={phoneCustomer} />
        <Divider />
        {/* Checkin Date & Number */}
        <CheckInAndPeopleNumber
          checkInDate={checkInDate}
          totalAdult={totalAdult}
          totalChildren={totalChildren}
        />
        <Divider />
        <TourguideInformation
          name={nameTourGuide}
          avatar={avatarTourGuide}
          email={emailTourGuide}
          rate={rateTourGuide}
          handleChangeTourGuide={handleChangeTourGuide}
        />
      </CommonStylesClient.Box>
      {/*  */}
      <CommonStylesClient.Box
        sx={{ width: 384, border: `1px solid #E9EBED`, padding: '1.5rem', borderRadius: '1rem' }}
      >
        <Payment
          priceProvisional={price}
          priceService={priceService}
          priceFixedService={tourSystemPrice}
          priceTotal={totalPrice}
          id={tourBookingId}
        />
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(PaymentContainer);
