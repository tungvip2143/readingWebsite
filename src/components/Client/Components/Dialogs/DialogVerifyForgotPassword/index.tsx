import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Form, Formik, FormikHelpers, FormikValues } from 'formik';
import * as Yup from 'yup';

import CommonStyles from 'components/CommonStyles';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { useTheme } from '@mui/material';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { isEmpty } from 'lodash';

export interface FormVerifyValues {
  otp: string;
  isSubmitting?: boolean;
}

interface DialogVerifyForgotPasswordProps {
  isOpen: boolean;
  toggle: () => void;
  phoneNumber: number | string;
  email: string;
  onSubmitVerify: (
    values: FormVerifyValues & FormikValues,
    helpers: FormikHelpers<FormVerifyValues & FormikValues>
  ) => void;
  onSubmitReSendOTP?: () => void;
}

const DialogVerifyForgotPassword = (props: DialogVerifyForgotPasswordProps) => {
  //! State
  const {
    isOpen,
    toggle,
    onSubmitVerify,
    phoneNumber = '',
    email = '',
    onSubmitReSendOTP = () => {},
  } = props;
  const t = useTranslations();
  const theme = useTheme();
  const isEmail = !isEmpty(email);
  const [timeLeft, setTimeLeft] = useState(60);

  const initalValues: FormVerifyValues = {
    otp: '',
  };

  const validationSchema = Yup.object().shape({
    otp: Yup.string().required(
      t('Validation.empty', {
        name: `${t(`SignUp.verifyTitle`)}`,
      })
    ),
  });

  //! Function
  const handleClickResendOTP = () => {
    onSubmitReSendOTP();
    setTimeLeft(60);
  };

  //! Effect
  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(0);
    }

    // exit early when we reach 0
    if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  //! Render
  return (
    <Formik
      initialValues={initalValues}
      onSubmit={onSubmitVerify}
      validationSchema={validationSchema}
    >
      {(propsFormik) => {
        const { values, setFieldValue, setSubmitting, isSubmitting, resetForm } = propsFormik;
        return (
          <CommonStyles.Dialog
            content={
              <Form>
                <CommonStylesClient.Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <CommonStylesClient.Typography
                    type='pcHeading3'
                    sx={{ color: theme.colors?.client?.grayScale }}
                  >
                    {t('SignUp.verifyTitle')}
                  </CommonStylesClient.Typography>

                  <CommonStylesClient.Typography
                    type='text14'
                    sx={{ color: theme.colors?.client?.darkGray }}
                  >
                    {isEmail
                      ? t('SignUp.verifySubtitleEmail', { email: email })
                      : t('SignUp.verifySubtitle', { phone: phoneNumber })}
                  </CommonStylesClient.Typography>

                  <CommonStylesClient.Box
                    sx={{
                      '.MuiOtpInput-Box': {
                        display: 'flex',
                        gap: '22px',
                        flexDirection: 'row',
                      },
                      '.MuiOtpInput-TextField': {
                        width: 64,
                        height: 64,
                        '.MuiInputBase-root': {
                          width: '100%',
                          height: '100%',
                          borderRadius: '1rem',
                        },
                      },
                    }}
                  >
                    <MuiOtpInput
                      length={4}
                      value={values?.otp}
                      onChange={(value: string) => {
                        setFieldValue('otp', value);
                        setSubmitting(true);
                      }}
                      onComplete={(value: string) => {
                        setFieldValue('otp', value);
                        setSubmitting(false);
                      }}
                    />
                  </CommonStylesClient.Box>

                  <CommonStylesClient.Button
                    sx={{
                      background: theme.colors?.client?.coBaltBlue,
                      width: '100%',
                      borderRadius: '1rem',
                      padding: '1rem 5.4375rem',
                      textTransform: 'capitalize',
                      letterSpacing: '0.64px',
                    }}
                    disabled={isSubmitting}
                    type='submit'
                  >
                    <CommonStylesClient.Typography
                      type='mobiHeading3'
                      sx={{ color: theme.colors?.client?.white }}
                    >
                      {t('SignUp.verifySubmit')}
                    </CommonStylesClient.Typography>
                  </CommonStylesClient.Button>

                  <CommonStylesClient.Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                    }}
                  >
                    <CommonStylesClient.Typography
                      type='text14'
                      sx={{ color: theme.colors?.client?.darkGray }}
                    >
                      {t('SignUp.reSendTOPTitle', { second: `${timeLeft}s` })}
                    </CommonStylesClient.Typography>

                    {timeLeft === 0 && (
                      <CommonStylesClient.Typography
                        type='title16'
                        sx={{
                          color: theme.colors?.client?.coBaltBlue,
                          fontWeight: 'bold',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          handleClickResendOTP();
                          resetForm();
                        }}
                      >
                        {t('SignUp.reSendOTP')}
                      </CommonStylesClient.Typography>
                    )}
                  </CommonStylesClient.Box>
                </CommonStylesClient.Box>
              </Form>
            }
            open={isOpen}
            toggle={toggle}
            disableClickOutside={true}
            isDetail
            sx={{
              ['.MuiPaper-root']: {
                width: 500,
                borderRadius: '1.5rem',
                margin: 0,
                padding: '3rem',
              },
            }}
            styleContent={{
              padding: 0,
            }}
          />
        );
      }}
    </Formik>
  );
};

export default React.memo(DialogVerifyForgotPassword);
