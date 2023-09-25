import React from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from '@mui/material';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import { MAX_WIDTH_CONTAINER } from 'constants/common';
import CommonIcons from 'components/Client/CommonIcons';
import { useGet } from 'stores/useStore';
import { TourBooking } from 'modules/customers/customer.interface';
import moment from 'moment';
import TourInformation from '../PaymentContainer/Components/TourInformation';
import { useRouter } from 'next/navigation';
import pageUrls from 'constants/pageUrls';
import queryString from 'query-string';
import cachedKeys from 'constants/cachedKeys';
import TourguideInformation from '../PaymentContainer/Components/TourguideInformation';
import { formatPrice } from 'helpers/common';

interface PaymentFailProps {}

interface FieldLabelWithValues {
  label: string;
  value: string | React.ReactNode;
}

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

const FieldLabelWithValues = (props: FieldLabelWithValues) => {
  const { label = '', value } = props;
  const theme = useTheme();
  return (
    <CommonStylesClient.Box
      sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}
    >
      <CommonStylesClient.Typography type='text16' sx={{ color: theme.colors?.client?.darkGray }}>
        {label}
      </CommonStylesClient.Typography>

      <CommonStylesClient.Typography type='title16' sx={{ color: theme.colors?.client?.black }}>
        {value}
      </CommonStylesClient.Typography>
    </CommonStylesClient.Box>
  );
};

const PaymentFail = (props: PaymentFailProps) => {
  //! State
  const t = useTranslations('PaymentPage');
  const theme = useTheme();
  const router = useRouter();
  //! Function
  const detailOfTourBooking = useGet(cachedKeys.detailOfTourBooking) as TourBooking;
  const tourBookingId = useGet(cachedKeys.tourBookingId);

  const price = detailOfTourBooking?.price || 0;
  const startTime = detailOfTourBooking?.startTime || '';

  // Tour Infomation
  const nameTour = detailOfTourBooking?.Tours?.name || '';
  const imageTour = detailOfTourBooking?.Tours?.thumbnail || '';
  const locationTour = detailOfTourBooking?.Tours?.Area?.name || '';
  const rateTour = detailOfTourBooking?.Tours?.avgRate || 0;
  const priceTour = detailOfTourBooking?.Tours?.priceForAdult || 0;

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

  const handleExploreMore = () => {
    return router.push(`${pageUrls.Homepage}`);
  };

  const handlePayment = () => {
    const bodeParsed = {
      tourId: tourBookingId,
    };

    const hrefParsed = `${pageUrls.Payment}?${queryString.stringify(bodeParsed)}`;

    router.push(hrefParsed);
  };
  //! Render
  return (
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
      <CommonStylesClient.Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '1.5rem',
          marginBottom: '2.5rem',
          svg: {
            width: 150,
            height: 150,
          },
        }}
      >
        <CommonIcons.IconCautionYellow />
        <CommonStylesClient.Typography type='pcHeading2'>
          {t('paymentFailTitle')}
        </CommonStylesClient.Typography>
        <CommonStylesClient.Typography type='text16'>
          {t('paymentFailSubTitle')}
        </CommonStylesClient.Typography>
      </CommonStylesClient.Box>

      <CommonStylesClient.Box>
        <CommonStylesClient.Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <CommonStylesClient.Box
            sx={{ width: 728, display: 'flex', gap: '1rem', flexDirection: 'column' }}
          >
            <TourInformation
              name={nameTour}
              imageTour={imageTour}
              location={locationTour}
              rate={rateTour}
              price={priceTour}
            />
            <Divider />
            <FieldLabelWithValues label={t('checkInDate')} value={checkInDate} />
            <FieldLabelWithValues
              label={t('numberPeople')}
              value={
                <CommonStylesClient.Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
                >
                  <CommonStylesClient.Typography
                    type='text16'
                    sx={{ color: theme.colors?.client?.darkGray }}
                  >
                    {`${totalAdult} ${t('adult')}`}
                  </CommonStylesClient.Typography>
                  <CommonStylesClient.Typography
                    type='text16'
                    sx={{ color: theme.colors?.client?.darkGray }}
                  >
                    {`${totalChildren} ${t('children')}`}
                  </CommonStylesClient.Typography>
                </CommonStylesClient.Box>
              }
            />
            <TourguideInformation
              name={nameTourGuide}
              avatar={avatarTourGuide}
              email={emailTourGuide}
              rate={rateTourGuide}
              readOnly
            />{' '}
          </CommonStylesClient.Box>
          {/*  */}
          <CommonStylesClient.Box
            sx={{
              width: 384,
              border: `1px solid #E9EBED`,
              padding: '1.5rem',
              borderRadius: '1rem',
            }}
          >
            <CommonStylesClient.Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <CommonStylesClient.Typography
                type='pcHeading4'
                sx={{ color: theme.colors?.client?.black }}
              >
                {t('paymentInformation')}
              </CommonStylesClient.Typography>

              <FieldLabelWithValues label={t('paymentPrice')} value={formatPrice(Number(price))} />

              <FieldLabelWithValues label={t('paymentMethod')} value={`VNPay`} />

              <FieldLabelWithValues
                label={t('paymentTime')}
                value={moment(startTime).format('HH:MM - DD/MM/YYYY')}
              />

              <FieldLabelWithValues
                label={t('paymentStatus')}
                value={
                  <CommonStylesClient.Typography
                    type='text16'
                    sx={{ color: theme.colors?.client?.red }}
                  >
                    {t('fail')}
                  </CommonStylesClient.Typography>
                }
              />

              <Divider />

              <CommonStylesClient.Button
                sx={{
                  background: theme.colors?.client?.coBaltBlue,
                  border: 'none',
                  boxShadow: 'none',
                  borderRadius: '1rem',
                  [':hover']: { background: theme.colors?.client?.coBaltBlue },
                }}
                onClick={handleExploreMore}
              >
                <CommonStylesClient.Typography
                  type='mobiHeading4'
                  sx={{ color: theme.colors?.client?.white, padding: '0.5rem 1rem' }}
                >
                  {t('paymentExploreMore')}
                </CommonStylesClient.Typography>
              </CommonStylesClient.Button>

              <CommonStylesClient.Button
                sx={{
                  background: theme.colors?.client?.gray,
                  border: 'none',
                  boxShadow: 'none',
                  borderRadius: '1rem',
                  [':hover']: { background: theme.colors?.client?.gray },
                }}
                onClick={handlePayment}
              >
                <CommonStylesClient.Typography
                  type='mobiHeading4'
                  sx={{ color: theme.colors?.client?.black, padding: '0.5rem 1rem' }}
                >
                  {t('title')}
                </CommonStylesClient.Typography>
              </CommonStylesClient.Button>
            </CommonStylesClient.Box>
          </CommonStylesClient.Box>
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(PaymentFail);
