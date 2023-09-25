import React, { useEffect, useState } from 'react';
import { FastField, Form, Formik, FormikHelpers, getIn } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { useTheme } from '@mui/material';
import moment from 'moment';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import CustomFields from 'components/CustomFields';
import CommonIcons from 'components/Client/CommonIcons';
import { useTranslations } from 'next-intl';
import { useGet } from 'stores/useStore';
import { Vendor } from 'modules/vendor/vendor.interface';
import cachedKeys from 'constants/cachedKeys';
import useAuth from 'hooks/useAuth';
import { showError } from 'helpers/toast';
import reservationVendorServices from 'modules/reservationVendor/reservationVendor.services';
import pageUrls from 'constants/pageUrls';
import queryString from 'query-string';
import { convertStringToDateTime, formatPrice, removeAMPM } from 'helpers/common';

interface BookPlacesProps {}

interface FormBookPlacesValues {
  checkInDate?: Date | null;
  timeSlot?: Date | null;
}

interface PeopleNumberI {
  onChange: (value: number) => void;
}

interface PriceI {
  price: number;
}

interface PriceProvisionalI {
  price: number;
  numberPeople: number;
}

const CheckInDate = () => {
  const theme = useTheme();

  return (
    <CommonStylesClient.Box
      sx={{
        padding: '0.75rem 0.875rem',
        background: theme.colors?.client.lightGray,
        borderRadius: '1rem',
        display: 'flex',
        flexDirection: 'row',
        gap: '0.5rem',
        postion: 'relative',
        svg: {
          marginTop: '4px',
        },
      }}
    >
      <CommonIcons.IconCalendarBlack />
      <FastField
        disablePast
        name='checkInDate'
        component={CustomFields.DatePickerField}
        sxContainer={{
          input: {
            padding: '0 !important',
            fontSize: '0.875rem',
            fontWeight: 500,
            lineHeight: '1.4rem',
            letterSpacing: '0.56px',
            color: theme.colors?.client?.midBlack,
            [':hover']: {
              cursor: 'pointer',
            },
            marginTop: '5px',
          },
          fieldset: {
            border: '0',
          },
          ['.MuiFormHelperText-root']: {
            position: 'absolute',
            width: 300,
            top: 34,
            left: '-27px',
            margin: 0,
          },
        }}
        isMobileDatePicker
      />
    </CommonStylesClient.Box>
  );
};

const TimeRange = () => {
  const theme = useTheme();

  return (
    <CommonStylesClient.Box
      sx={{
        padding: '0.75rem 0.875rem',
        background: theme.colors?.client.lightGray,
        borderRadius: '1rem',
        display: 'flex',
        flexDirection: 'row',
        gap: '0.5rem',
        postion: 'relative',
        svg: {
          marginTop: '4px',
        },
      }}
    >
      <FastField
        name='timeSlot'
        component={CustomFields.TimePickerField}
        ampm={false}
        sxContainer={{
          input: {
            padding: '0 !important',
            fontSize: '0.875rem',
            fontWeight: 500,
            lineHeight: '1.4rem',
            letterSpacing: '0.56px',
            color: theme.colors?.client?.midBlack,
            [':hover']: {
              cursor: 'pointer',
            },
            marginTop: '5px',
          },
          fieldset: {
            border: '0',
          },
          ['.MuiFormHelperText-root']: {
            position: 'absolute',
            width: 300,
            top: 37,
            left: '-13px',
            margin: 0,
          },
        }}
      />
    </CommonStylesClient.Box>
  );
};

const PeopleNumber = (props: PeopleNumberI) => {
  //! State
  const { onChange } = props;
  const theme = useTheme();
  const [count, setCount] = useState<number>(1);

  //! Function
  const handleIncrease = () => {
    setCount((prev) => {
      return prev + 1;
    });
  };

  const handleDecrease = () => {
    setCount((prev) => {
      if (prev === 1) {
        return 1;
      }
      return prev - 1;
    });
  };

  //! Effect
  useEffect(() => {
    onChange(count);
  }, [count]);

  return (
    <CommonStylesClient.Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: '1.5625rem',
        border: `1px solid ${theme.colors?.client.lightGray}`,
        borderRadius: '3rem',
        width: '100%',
        height: 44,
        padding: '4px  0 0 4px',
        alignItems: 'center',
      }}
    >
      <CommonStylesClient.Box sx={{ cursor: 'pointer' }} onClick={handleDecrease}>
        <CommonIcons.IconMinus />
      </CommonStylesClient.Box>

      <CommonStylesClient.Box>
        <CommonStylesClient.Typography
          type='pcHeading4'
          sx={{ color: theme.colors?.client?.black }}
        >
          {count}
        </CommonStylesClient.Typography>
      </CommonStylesClient.Box>

      <CommonStylesClient.Box sx={{ cursor: 'pointer' }} onClick={handleIncrease}>
        <CommonIcons.IconPlus />
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

const Price = (props: PriceI) => {
  const { price } = props;
  const t = useTranslations('TourDetailPage');
  const theme = useTheme();

  return (
    <CommonStylesClient.Box sx={{ display: 'flex', gap: '4px', flexDirection: 'column' }}>
      <CommonStylesClient.Typography type='title16' sx={{ color: theme.colors?.client.darkGray }}>
        {t('fromPrice')}
      </CommonStylesClient.Typography>

      <CommonStylesClient.Box
        sx={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', alignItems: 'flex-end' }}
      >
        <CommonStylesClient.Typography
          type='pcHeading3'
          sx={{ color: theme.colors?.client.coBaltBlue }}
        >
          {formatPrice(Number(price))}
        </CommonStylesClient.Typography>
        <CommonStylesClient.Typography
          type='title16'
          sx={{ color: theme.colors?.client?.darkGray }}
        >{`/${t('people')}`}</CommonStylesClient.Typography>
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

const PriceProvisional = (props: PriceProvisionalI) => {
  //! State
  const { price, numberPeople } = props;
  const t = useTranslations('TourDetailPage');
  const theme = useTheme();

  //! Function
  const priceWithNumberPeople = () => {
    return (
      <CommonStylesClient.Typography type='text14' sx={{ color: theme.colors?.client.darkGray }}>
        {`${formatPrice(Number(price))} x ${numberPeople} ${t('people')}`}
      </CommonStylesClient.Typography>
    );
  };

  const renderPriceProvisional = () => {
    const resultPrice = Number(numberPeople) * Number(price);
    return (
      <CommonStylesClient.Typography type='pcHeading5' sx={{ color: theme.colors?.client?.black }}>
        {formatPrice(Number(resultPrice))}
      </CommonStylesClient.Typography>
    );
  };
  //! Render
  return (
    <CommonStylesClient.Box sx={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
      <CommonStylesClient.Typography type='mobiHeading3'>
        {t('priceProvisional')}
      </CommonStylesClient.Typography>

      <CommonStylesClient.Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {priceWithNumberPeople()}
        {renderPriceProvisional()}
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

const BookPlaces = (props: BookPlacesProps) => {
  //! State
  const theme = useTheme();
  const route = useRouter();
  const t = useTranslations();
  const auth = useAuth();

  const isLogged = auth?.isLogged;

  const detailOfPlaces: Vendor = useGet(cachedKeys.detailPlaces);
  const price = detailOfPlaces?.bookingPrice || 0;
  const vendorId = detailOfPlaces?.id;
  const [numberPeople, setNumberPeople] = useState<number>(1);
  const initialValues = {
    checkInDate: new Date(),
    timeSlot: new Date(),
  };

  // const startServeTime = convertStringToDateTime(
  //   removeAMPM(detailOfPlaces?.startServeTime || '00:00')
  // );
  // const endServeTime = convertStringToDateTime(removeAMPM(detailOfPlaces?.endServeTime || '00:00'));

  //! Function
  const onChangeNumberPeople = (value: number) => {
    setNumberPeople(value);
  };

  const onSubmit = async (values: FormBookPlacesValues) => {
    if (!isLogged) {
      showError(t('Validation.login'));
      return;
    }
    var checkinDate = moment(values?.checkInDate)
      .utc()
      .toDate();
    const timeSlot = moment(values?.timeSlot, 'HH:mm');
    checkinDate.setHours(timeSlot.hour());
    checkinDate.setMinutes(timeSlot.minute());
    checkinDate.setSeconds(0);
    const time = moment(checkinDate).format('YYYY-MM-DD HH:mm:ss');

    const bodyParsed = {
      vendorId: Number(vendorId),
      time: time,
      totalCustomer: numberPeople,
    };
    try {
      const response = await reservationVendorServices.createBookingTour(bodyParsed);
      if (response) {
        const vendorBookingId = response?.data?.data?.id;
        
        route.push(
          `${pageUrls.WaitingAcceptBook}?${queryString.stringify({
            vendorBookingId: vendorBookingId,
            redirectMyBookingVendor: price === 0 ? true : false
          })}`
        );
      }
    } catch (error) {
      showError(error);
    }
  };

  //! Render
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        checkInDate: Yup.string().required(
          t('Validation.empty', { name: t(`TourDetailPage.checkInSelect`) })
        ),
        // timeSlot: Yup.date()
        //   .required(t('Validation.empty', { name: t(`PlacesDetail.timeSlot`) }))
        //   .min(new Date(startServeTime), t('Validation.minmaxtimeServePlaces'))
        //   .max(new Date(endServeTime), t('Validation.minmaxtimeServePlaces')),
        // .test('min_end_time', t('Validation.minmaxtimeServePlaces'), function (value) {
        //   const { timeSlot } = this.parent
        //   if (moment(endServeTime).format('ddd MMM DD YYYY') === moment(timeSlot).format('ddd MMM DD YYYY')) {
        //     return moment(value, 'HH:mm').isSameOrBefore(moment(endServeTime, 'HH:mm'))
        //   }
        //   if (moment(startServeTime).format('ddd MMM DD YYYY') === moment(timeSlot).format('ddd MMM DD YYYY')) {
        //     return moment(value, 'HH:mm').isSameOrAfter(moment(startServeTime, 'HH:mm'))
        //   } else {
        //     return true
        //   }
        // }),
      })}
      validateOnBlur
      validateOnChange
      onSubmit={onSubmit}
    >
      {(propsFormik) => {
        return (
          <Form>
            <CommonStylesClient.Box
              sx={{
                padding: '1.5rem',
                border: `1px solid #E9EBED`,
                borderRadius: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
              }}
            >
              {/* Price */}
              <Price price={price} />

              {/* Form */}
              <CommonStylesClient.Box
                sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
              >
                {/* Check In Date */}
                <CommonStylesClient.Box
                  sx={{ display: 'flex', gap: '0.5rem', flexDirection: 'column', width: 173 }}
                >
                  <CommonStylesClient.Typography
                    type='mobiHeading4'
                    sx={{ color: theme.colors?.client?.midBlack }}
                  >
                    {t('TourDetailPage.checkInSelect')}
                  </CommonStylesClient.Typography>
                  <CheckInDate />
                </CommonStylesClient.Box>

                {/* Number People */}
                <CommonStylesClient.Box
                  sx={{
                    display: 'flex',
                    gap: '0.5rem',
                    flexDirection: 'column',
                    width: 139,
                  }}
                >
                  <CommonStylesClient.Typography
                    type='mobiHeading4'
                    sx={{ color: theme.colors?.client?.midBlack }}
                  >
                    {t('TourDetailPage.numberPeople')}
                  </CommonStylesClient.Typography>
                  <PeopleNumber onChange={onChangeNumberPeople} />
                </CommonStylesClient.Box>

                {/* Time Slot */}
                <CommonStylesClient.Box
                  sx={{
                    display: 'flex',
                    gap: '0.5rem',
                    flexDirection: 'column',
                    width: 173,
                  }}
                >
                  <CommonStylesClient.Typography
                    type='mobiHeading4'
                    sx={{ color: theme.colors?.client?.midBlack }}
                  >
                    {t('TourDetailPage.timeRange')}
                  </CommonStylesClient.Typography>
                  <TimeRange />
                </CommonStylesClient.Box>
              </CommonStylesClient.Box>

              {/* Price Provisional */}
              <PriceProvisional price={price} numberPeople={numberPeople} />

              {/* Button */}
              <CommonStylesClient.Button
                sx={{
                  textTransform: 'capitalize',
                  background: theme.colors?.client?.coBaltBlue,
                  borderRadius: '1rem',
                  padding: '1rem 2rem',
                }}
                type='submit'
              >
                <CommonStylesClient.Typography
                  type='title16'
                  sx={{ color: theme.colors?.client.white, fontWeight: 700 }}
                >
                  {t('PlacesDetail.bookPlaces')}
                </CommonStylesClient.Typography>
              </CommonStylesClient.Button>
            </CommonStylesClient.Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default React.memo(BookPlaces);
