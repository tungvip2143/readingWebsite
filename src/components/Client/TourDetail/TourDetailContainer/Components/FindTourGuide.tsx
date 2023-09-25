import React, { useEffect, useState } from 'react';
import { FastField, Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import pageUrls from 'constants/pageUrls';
import queryString from 'query-string';
import * as Yup from 'yup';
import { useTheme } from '@mui/material';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import CustomFields from 'components/CustomFields';
import CommonIcons from 'components/Client/CommonIcons';
import { useTranslations } from 'next-intl';
import { useGet } from 'stores/useStore';
import { Tour } from 'modules/tour/tour.interface';
import { showError, showSuccess } from 'helpers/toast';
import bookingTourServices from 'modules/bookingTour/bookingTour.services';
import moment from 'moment';
import useAuth from 'hooks/useAuth';
import cachedKeys from 'constants/cachedKeys';
import { formatPrice, totalPriceTour } from 'helpers/common';

interface FindTourGuideProps {}

interface FormFindTourGuideValues {
  totalChildren?: number;
  totalAdult?: number;
  checkInDate?: Date | null;
}

interface ChooseNumberPeople {
  onChange: (value: number) => void;
  disableDecrease?: boolean;
  disableIncrease?: boolean;
  minCount?: number;
}

interface PriceI {
  price: number;
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
        textAlign: 'center',
        justifyContent: 'center',
        input: {
          width: 92,
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

const ChooseNumberPeople = (props: ChooseNumberPeople) => {
  //! State
  const {
    onChange,
    disableDecrease = false,
    disableIncrease = false,
    minCount,
  } = props;
  const theme = useTheme();
  const t = useTranslations();
  const [count, setCount] = useState<number>(0);

  //! Function
  const handleIncrease = () => {
    if (disableIncrease) {
      return null;
    }
    setCount((prev) => {
      return prev + 1;
    });
  };

  const handleDecrease = () => {
    if (disableDecrease) {
      return null;
    }
    setCount((prev) => {
      if (prev === 0) {
        return 0;
      }
      return prev - 1;
    });
  };

  //! Effect
  useEffect(() => {
    onChange(count);
  }, [count]);

  useEffect(() => {
    if (minCount) {
      setCount(minCount);
      return
    }
    setCount(0)
  }, [minCount]);

  const NumberField = () => {
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
        <CommonStylesClient.Box
          sx={{
            cursor: disableDecrease ? 'not-allowed' : 'pointer',
            svg: {
              filter: disableDecrease ? 'grayscale(1)' : 'none',
            },
          }}
          onClick={handleDecrease}
        >
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

        <CommonStylesClient.Box
          sx={{
            cursor: disableIncrease ? 'not-allowed' : 'pointer',
            svg: {
              filter: disableIncrease ? 'grayscale(1)' : 'none',
            },
          }}
          onClick={handleIncrease}
        >
          <CommonIcons.IconPlus />
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>
    );
  };
  return (
    <CommonStylesClient.Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <CommonStylesClient.Box
        sx={{
          display: 'flex',
          gap: '1rem',
          flexDirection: 'column',
          width: 139,
        }}
      >
        <NumberField />
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

const FindTourGuide = (props: FindTourGuideProps) => {
  //! State
  const theme = useTheme();
  const route = useRouter();
  const auth = useAuth();
  const t = useTranslations();
  const isLogged = auth?.isLogged;
  const detailOfTourData: Tour = useGet(cachedKeys.detailTour);
  const priceForAdult = detailOfTourData?.priceForAdult || 0;
  const priceForChildren = detailOfTourData?.priceForChildren || 0;
  const minCustomer = detailOfTourData?.minCustomer || 0;
  const maxCustomer = detailOfTourData?.maxCustomer || 0;
  const fixCost = detailOfTourData?.fixCost || 0;
  const tourId = detailOfTourData?.id;
  const initialValues = {
    checkInDate: new Date(),
  };

  //! Function
  const onSubmit = async (
    values: FormFindTourGuideValues,
    helpersFormik: FormikHelpers<FormFindTourGuideValues>
  ) => {
    if (!isLogged) {
      showError(t('Validation.login'));
      return;
    }
    const bodyParsed = {
      totalChildren: values?.totalChildren || 0,
      totalAdult: values?.totalAdult || 0,
      startTime: moment(values?.checkInDate).format('YYYY-MM-DD') || '',
    };
    try {
      helpersFormik.setSubmitting(true);
      const response = await bookingTourServices.createBookingTour({
        id: tourId,
        body: bodyParsed,
      });
      if (response) {
        const tourBookingId = response?.data?.data?.id;
        route.push(`${pageUrls.FindTourGuide}?${queryString.stringify({ tourId: tourBookingId, redirectMyBookingTour: true })}`);
      }
    } catch (error) {
      showError(error);
    } finally {
      helpersFormik.setSubmitting(true);
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
      })}
      validateOnBlur
      validateOnChange
      onSubmit={onSubmit}
    >
      {(propsFormik) => {
        const { totalAdult, totalChildren } = propsFormik.values;
        const totalPeople = Number(totalAdult) + Number(totalChildren);
        const disableMinPeople = Number(totalPeople) === Number(minCustomer);
        const disabledMaxPeople = Number(totalPeople) === Number(maxCustomer);
        const minAdult = Number(totalChildren) >= 1 && (Number(totalAdult) === 1)
        // TotalPrice recipe:
        // TourPrice = FixCost + (PriceForAdult * TotalAdult) + (PriceForChildren * TotalChildren)
        // CommissionApp = TourPrice * 0.05 + 50.000 VNĐ
        // VAT = CommissionApp * 0.05
        // TotalTourPrice = TourPrice + CommissionApp + VAT
        const priceTour = Number(totalPriceTour(fixCost, priceForAdult, priceForChildren, Number(totalAdult), Number(totalChildren)))
        const totalPriceProvisional = priceTour/totalPeople
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
              <Price price={totalPriceProvisional} />

              {/* Form */}
              <CommonStylesClient.Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'column',
                  gap: '2rem',
                }}
              >
                {/* Check In Date */}
                <CommonStylesClient.Box
                  sx={{ display: 'flex', gap: '1rem', flexDirection: 'column', width: '100%' }}
                >
                  <CommonStylesClient.Typography
                    type='mobiHeading4'
                    sx={{ color: theme.colors?.client?.midBlack }}
                  >
                    {t('TourDetailPage.checkInSelect')}
                  </CommonStylesClient.Typography>
                  <CheckInDate />
                </CommonStylesClient.Box>

                {/* Price For Adult */}
                <CommonStylesClient.Box
                  sx={{
                    display: 'flex',
                    gap: '1rem',
                    flexDirection: 'column',
                    width: '100%',
                  }}
                >
                  <CommonStylesClient.Typography
                    type='mobiHeading4'
                    sx={{ color: theme.colors?.client?.midBlack }}
                  >
                    {t('TourDetailPage.adultTitle')}
                  </CommonStylesClient.Typography>
                  {/*  */}
                  <ChooseNumberPeople
                    disableDecrease={disableMinPeople || minAdult}
                    disableIncrease={disabledMaxPeople}
                    minCount={minCustomer}
                    onChange={(value) => {
                      propsFormik.setFieldValue('totalAdult', value);
                    }}
                  />
                </CommonStylesClient.Box>

                {/* Price For Children */}
                <CommonStylesClient.Box
                  sx={{
                    display: 'flex',
                    gap: '1rem',
                    flexDirection: 'column',
                    width: '100%',
                  }}
                >
                  <CommonStylesClient.Box
                    sx={{
                      display: 'flex',
                      gap: '4px',
                      flexDirection: 'column',
                      width: '100%',
                    }}
                  >
                    <CommonStylesClient.Typography
                      type='mobiHeading4'
                      sx={{ color: theme.colors?.client?.midBlack }}
                    >
                      {t('TourDetailPage.childrenTitle')}
                    </CommonStylesClient.Typography>

                    <CommonStylesClient.Typography
                      type='text12'
                      sx={{ color: theme.colors?.client?.midBlack }}
                    >
                      {t('TourDetailPage.childrenSubTitle')}
                    </CommonStylesClient.Typography>
                  </CommonStylesClient.Box>
                  {/*  */}
                  <ChooseNumberPeople
                    disableDecrease={disableMinPeople}
                    disableIncrease={disabledMaxPeople}
                    onChange={(value) => {
                      propsFormik.setFieldValue('totalChildren', value);
                    }}
                  />
                </CommonStylesClient.Box>
              </CommonStylesClient.Box>

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
                  {t('TourDetailPage.findLocalFriend')}
                </CommonStylesClient.Typography>
              </CommonStylesClient.Button>
            </CommonStylesClient.Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default React.memo(FindTourGuide);
