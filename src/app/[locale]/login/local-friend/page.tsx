'use client';

import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import CommonStyles from 'components/CommonStyles';
import { ProviderSocial, Method, Roles, EMAIL_REGEX, OTPAction } from 'constants/common';
import LoginForm from 'components/Client/Components/Dialogs/DialogLogin/Components/LoginForm';
import OtherLogin from 'components/Client/Components/Dialogs/DialogLogin/Components/OtherLogin';
import DontHaveAccountText from 'components/Client/Components/Dialogs/DialogLogin/Components/DontHaveAccountText';
import HeadingTextForm from 'components/Client/Components/Dialogs/DialogLogin/Components/HeadingTextForm';
import { FormLoginValues } from 'components/Client/Components/Dialogs/DialogLogin';
import useAuth from 'hooks/useAuth';
import { showError, showSuccess } from 'helpers/toast';
import { useRouter } from 'next/navigation';
import pageUrls from 'constants/pageUrls';
import useToggleDialog from 'hooks/useToggleDialog';
import DialogSignUp, { FormSignUpValues } from 'components/Client/Components/Dialogs/DialogSignUp';
import { RequestSignUp } from 'modules/signUp/signUp.interface';
import DialogVerify from 'components/Client/Components/Dialogs/DialogVerify';
import { RequestVerifyRegisterCustomer } from 'modules/verifyRegisterCustomer/verifyRegisterCustomer.interface';
import { useTheme } from '@mui/material';
import Loading from 'components/CommonStyles/Loading';
import { parsePhoneNumber } from 'helpers/phoneNumberFormat';
import LoginModel from 'models/login.model';
import DialogNewPassword from 'components/Client/Components/Dialogs/DialogNewPassword';
import DialogVerifyForgotPassword from 'components/Client/Components/Dialogs/DialogVerifyForgotPassword';
import DialogForgotPassword, {
  FormForgotPasswordValues,
} from 'components/Client/Components/Dialogs/DialogForgotPassword';
import {
  RequestChangePassword,
  RequestChangePasswordEmail,
  RequestForgotPassword,
  RequestResendOTP,
  RequestVerifyForgotPassword,
} from 'modules/forgotPassword/forgotPassword.interface';
import SignUpModel from 'models/signup.model';
import VerifySignupModel from 'models/verifySignup.model';
import ForgotPasswordModel from 'models/forgotPassword.model';
import VerifyForgotPasswordModel from 'models/verifyForgotPassword.model';
import ChangePasswordModel from 'models/changePassword.model';
import { useGet } from 'stores/useStore';
import cachedKeys from 'constants/cachedKeys';
import DialogSignUpTourGuide from 'components/Client/Components/Dialogs/DialogSignUpTourGuide';
import { isEmpty } from 'lodash';
import DialogNewPasswordEmail from 'components/Client/Components/Dialogs/DialogNewPasswordEmail';
import ChangePasswordEmailModel from 'models/changePasswordEmail.model';
import ReSendOTPdModel from 'models/resendOTP.model';

interface LoginLocalFriendProps {}

const LoginLocalFriend = (props: LoginLocalFriendProps) => {
  //! State
  const t = useTranslations();
  const theme = useTheme();
  const auth = useAuth();
  const router = useRouter();
  const [signUpForm, setSignUpForm] = React.useState<FormSignUpValues | null>(null);
  const [forgotPasswordForm, setForgotPasswordForm] =
    React.useState<FormForgotPasswordValues | null>(null);

  const phoneNumberSignup = signUpForm?.phoneNumber || '';
  const phoneNumberForgotPasword = forgotPasswordForm?.phoneNumber || '';
  const phoneCodeForgotPasword = forgotPasswordForm?.phoneCode || '';
  const emailForgotPassword = forgotPasswordForm?.email || '';

  const {
    shouldRender: shouldRenderSignUpDialog,
    open: openSignUpDialog,
    toggle: toggleSignUpDialog,
  } = useToggleDialog();

  const {
    shouldRender: shouldRenderVerify,
    open: openVerifyDialog,
    toggle: toggleVerifyDialog,
  } = useToggleDialog();

  //! Forgot Password
  const {
    shouldRender: shouldRenderForgotPasswordDialog,
    open: openForgotPasswordDialog,
    toggle: toggleForgotPasswordDialog,
  } = useToggleDialog();

  const {
    shouldRender: shouldRenderVerifyForgotPasswordDialog,
    open: openVerifyForgotPasswordDialog,
    toggle: toggleVerifyForgotPasswordDialog,
  } = useToggleDialog();

  const {
    shouldRender: shouldRenderNewPasswordDialog,
    open: openNewPasswordDialog,
    toggle: toggleNewPasswordDialog,
  } = useToggleDialog();

  const {
    shouldRender: shouldRenderNewPasswordEmailDialog,
    open: openNewPasswordEmailDialog,
    toggle: toggleNewPasswordEmailDialog,
  } = useToggleDialog();

  const initalValuesLogin: FormLoginValues = {
    phoneNumber: '',
    password: '',
    phoneCode: 'VN',
    saveLogin: false,
    email: '',
    method: Method.PHONE,
  };

  const validationSchemaLogin = Yup.object().shape({
    method: Yup.string(),

    phoneCode: Yup.string().when('method', ([method]) => {
      return method === Method.PHONE
        ? Yup.string().required(t('Validation.empty', { name: t('LocalFriend.phonePrefix') }))
        : Yup.string();
    }),
    phoneNumber: Yup.string().when('method', ([method]) => {
      return method === Method.PHONE
        ? Yup.string()
            .required(t('Validation.empty', { name: t(`Login.phoneNumber`) }))
            .test('phoneIsValid', t('Validation.formatPhoneByCountry'), function (value) {
              const { phoneCode } = this.parent;
              const { isValidated } = parsePhoneNumber(value, phoneCode);
              return isValidated;
            })
        : Yup.string();
    }),

    email: Yup.string().when('method', ([method]) => {
      return method === Method.EMAIL
        ? Yup.string()
            .required(t('Validation.empty', { name: t('LocalFriend.email') }))
            .matches(EMAIL_REGEX, t('Validation.emailFormat'))
        : Yup.string();
    }),

    password: Yup.string().required(t('Validation.empty', { name: t(`Login.password`) })),
  });

  const role = auth?.user?.userType;
  const isLogining = auth?.isLogining;
  const isLogged = auth?.isLogged;

  //! Function
  useEffect(() => {
    // Check to redirect to the page with corresponding role
    if (isLogged && !!role) {
      const redirectHandler = new Map<Roles, () => void>();
      redirectHandler.set(Roles.ADMIN, () => router.push(pageUrls.Admin));
      redirectHandler.set(Roles.TOUR_GUIDE, () => router.push(pageUrls.LocalFriend.Home));
      redirectHandler.set(Roles.CUSTOMER, () => router.push(pageUrls.Homepage));
      redirectHandler.set(Roles.VENDOR, () => router.push(pageUrls.Vendor.Home));
      redirectHandler.get(role)?.();
    }
  }, [isLogged, role]);

  if (!isLogining && isLogged) {
    return (
      <CommonStyles.Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: theme.colors?.bgwhite,
        }}
      >
        <Loading />
      </CommonStyles.Box>
    );
  }
  const onSubmitLogin = (
    values: FormLoginValues,
    helpersFormik: FormikHelpers<FormLoginValues>
  ) => {
    (async () => {
      try {
        helpersFormik.setSubmitting(true);
        const requestPayload = LoginModel.parseBodyToRequest(values);
        await auth?.signInRoleTourGuide(requestPayload);
        router.push(pageUrls.LocalFriend.Home);
      } catch (error) {
        showError(error);
      } finally {
        helpersFormik.setSubmitting(false);
      }
    })();
  };

  const onSubmitLoginGoogle = () => {
    (async () => {
      try {
        const body = {
          role: Roles.TOUR_GUIDE,
          provider: ProviderSocial.GOOGLE,
        };
        await auth?.signInGoogle(body);
        router.push(pageUrls.LocalFriend.Home);
      } catch (error) {
        showError(error);
      }
    })();
  };

  const onSubmitLogiFacebook = () => {
    (async () => {
      try {
        const body = {
          role: Roles.TOUR_GUIDE,
          provider: ProviderSocial.FACEBOOK,
        };
        await auth?.signInFacebook(body);
        router.push(pageUrls.LocalFriend.Home);
      } catch (error) {
        showError(error);
      }
    })();
  };

  //! Render
  return (
    <CommonStyles.Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        backgroundColor: theme.colors?.client.blackBackdropDialog,
      }}
    >
      <CommonStyles.Box
        sx={{
          width: '37.5rem',
          boxShadow: `0rem 0.6875rem 0.9375rem -0.4375rem ${theme.colors?.client.blackBoxShadowDark}, 0rem 1.5rem 2.375rem 0.1875rem ${theme.colors?.client.blackBoxShadowLighter}, 0rem 0.5625rem 2.875rem 0.5rem ${theme.colors?.client.blackBoxShadowLight}`,
          borderRadius: '1.5rem',
          padding: '3rem',
          backgroundColor: theme.colors?.white,
        }}
      >
        {shouldRenderSignUpDialog && (
          <DialogSignUpTourGuide
            isOpen={openSignUpDialog}
            toggle={toggleSignUpDialog}
            onClickSignIn={() => {
              toggleSignUpDialog();
            }}
            onSubmitSignUp={async (values, helpersFormik) => {
              try {
                helpersFormik.setSubmitting(true);
                const body: RequestSignUp = {
                  firstName: values.firstName,
                  lastName: values.lastName,
                  phone: values.phoneNumber,
                  password: values.password,
                  confirmPassword: values.confirmPassword,
                  phoneCode: values.phoneCode,
                  acceptTerm: values.acceptTerm,
                  email: values.email,
                  gender: values?.gender,
                };
                const requestPayload = SignUpModel.parseBodyToRequest(body);

                //! Call API SignUp
                //! If Done -> turn off signUpDialog -> turn on verifyDialog
                await auth.signUpRoleTourGuide(requestPayload);
                setSignUpForm(values);
                toggleSignUpDialog();
                toggleVerifyDialog();
              } catch (error) {
                showError(error);
              } finally {
                helpersFormik.setSubmitting(false);
              }
            }}
            onClickLoginGoogle={onSubmitLoginGoogle}
            onClickLoginFacebook={onSubmitLogiFacebook}
          />
        )}
        {shouldRenderVerify && (
          <DialogVerify
            isOpen={openVerifyDialog}
            toggle={toggleVerifyDialog}
            phoneNumber={phoneNumberSignup}
            onSubmitVerify={async (values, helpersFormik) => {
              try {
                helpersFormik.setSubmitting(true);
                const phoneNumberValues = signUpForm?.phoneNumber || '';
                const phonePrefix = signUpForm?.phoneCode || '';
                const email = signUpForm?.email || '';
                const otp = values?.otp || '';

                const body: RequestVerifyRegisterCustomer = {
                  phoneCode: phonePrefix || '',
                  otp: otp,
                  phone: phoneNumberValues,
                  email: email,
                };

                const requestPayload = VerifySignupModel.parseBodyToRequest(body);

                await auth.verifyRegisterTourGuide(requestPayload);
                showSuccess(t('SignUp.success'));
                toggleVerifyDialog();
              } catch (error) {
                showError(error);
              } finally {
                helpersFormik.setSubmitting(false);
              }
            }}
            onSubmitReSendOTP={() => {
              (async () => {
                try {
                  const body: RequestResendOTP = {
                    action: OTPAction.TOUR_GUIDE_REGISTER,
                    role: Roles.TOUR_GUIDE,
                    method: isEmpty(signUpForm?.phoneNumber) ? Method.EMAIL : Method.PHONE,
                    phone: signUpForm?.phoneNumber || '',
                    phoneCode: signUpForm?.phoneCode || '',
                    email: signUpForm?.email || '',
                  };
                  const requestPayload = ReSendOTPdModel.parseBodyToRequest(body);
                  //! Call API SignUp
                  //! If Done -> turn off signUpDialog -> turn on verifyDialog
                  await auth.resendOTP(requestPayload);
                  showSuccess(t('SignUp.reSendSuccess'));
                } catch (error) {
                  showError(error);
                }
              })();
            }}
          />
        )}

        {/* ForgotPassword */}
        {shouldRenderForgotPasswordDialog && (
          <DialogForgotPassword
            isOpen={openForgotPasswordDialog}
            toggle={toggleForgotPasswordDialog}
            onSubmitForgotPassword={(values, helpersFormik) => {
              (async () => {
                try {
                  helpersFormik.setSubmitting(true);
                  const phoneNumberValues = values?.phoneNumber;
                  const phonePrefix = values?.phoneCode;
                  const email = values?.email;
                  const method = isEmpty(email) ? Method.PHONE : Method.EMAIL;

                  const body: RequestForgotPassword = {
                    phone: phoneNumberValues,
                    phoneCode: phonePrefix,
                    email: email,
                    role: Roles.TOUR_GUIDE,
                    method: method,
                  };
                  //! Call API SignUp
                  //! If Done -> turn off signUpDialog -> turn on verifyDialog
                  const requestPayload = ForgotPasswordModel.parseBodyToRequest(body);
                  await auth.forgotPassword(requestPayload);
                  toggleVerifyForgotPasswordDialog();
                  toggleForgotPasswordDialog();
                  setForgotPasswordForm(values);
                } catch (error) {
                  showError(error);
                } finally {
                  helpersFormik.setSubmitting(false);
                }
              })();
            }}
          />
        )}
        {shouldRenderVerifyForgotPasswordDialog && (
          <DialogVerifyForgotPassword
            isOpen={openVerifyForgotPasswordDialog}
            toggle={toggleVerifyForgotPasswordDialog}
            phoneNumber={phoneNumberForgotPasword}
            email={emailForgotPassword}
            onSubmitVerify={async (values, helpersFormik) => {
              try {
                helpersFormik.setSubmitting(true);
                const phoneNumberValues = phoneNumberForgotPasword || '';
                const phonePrefix = phoneCodeForgotPasword || '';
                const email = emailForgotPassword || '';
                const isEmail = !isEmpty(email);
                const body: RequestVerifyForgotPassword = {
                  phoneCode: phonePrefix,
                  role: Roles.TOUR_GUIDE,
                  otp: values.otp,
                  phone: phoneNumberValues,
                  email: email,
                };

                const requestPayload = VerifyForgotPasswordModel.parseBodyToRequest(body);
                await auth.verifyForgotPassword(requestPayload);
                showSuccess(t('ForgotPassword.successVerify'));
                toggleVerifyForgotPasswordDialog();
                if (isEmail) {
                  toggleNewPasswordEmailDialog();
                  return;
                }
                toggleNewPasswordDialog();
              } catch (error) {
                showError(error);
              } finally {
                helpersFormik.setSubmitting(false);
              }
            }}
            onSubmitReSendOTP={() => {
              (async () => {
                try {
                  const phoneNumberValues = phoneNumberForgotPasword;
                  const phonePrefix = phoneCodeForgotPasword;
                  const email = emailForgotPassword;
                  const method = isEmpty(email) ? Method.PHONE : Method.EMAIL;

                  const body: RequestResendOTP = {
                    action: OTPAction.FORGOT_PASSWORD,
                    role: Roles.TOUR_GUIDE,
                    method: method,
                    phone: phoneNumberValues,
                    phoneCode: phonePrefix,
                    email: email,
                  };
                  const requestPayload = ReSendOTPdModel.parseBodyToRequest(body);
                  //! Call API SignUp
                  //! If Done -> turn off signUpDialog -> turn on verifyDialog
                  await auth.resendOTP(requestPayload);
                  showSuccess(t('SignUp.reSendSuccess'));
                } catch (error) {
                  showError(error);
                }
              })();
            }}
          />
        )}
        {shouldRenderNewPasswordDialog && (
          <DialogNewPassword
            isOpen={openNewPasswordDialog}
            toggle={toggleNewPasswordDialog}
            phoneNumber={phoneNumberForgotPasword}
            phoneCode={phoneCodeForgotPasword}
            onSubmitChangePassword={async (values, helpersFormik) => {
              try {
                helpersFormik.setSubmitting(true);
                const body: RequestChangePassword = {
                  phone: values.phoneNumber,
                  password: values.password,
                  confirmPassword: values.confirmPassword,
                  phoneCode: values.phoneCode,
                  role: Roles.TOUR_GUIDE,
                };

                const requestPayload = ChangePasswordModel.parseBodyToRequest(body);
                await auth.changePassword(requestPayload);
                showSuccess(t('ForgotPassword.success'));
                toggleNewPasswordDialog();
              } catch (error) {
                showError(error);
              } finally {
                helpersFormik.setSubmitting(false);
              }
            }}
          />
        )}
        {shouldRenderNewPasswordEmailDialog && (
          <DialogNewPasswordEmail
            isOpen={openNewPasswordEmailDialog}
            toggle={toggleNewPasswordEmailDialog}
            email={emailForgotPassword}
            onSubmitChangePassword={async (values, helpersFormik) => {
              try {
                helpersFormik.setSubmitting(true);

                const body: RequestChangePasswordEmail = {
                  email: values.email,
                  password: values.password,
                  confirmPassword: values.confirmPassword,
                  role: Roles.TOUR_GUIDE,
                };

                const requestPayload = ChangePasswordEmailModel.parseBodyToRequest(body);
                await auth.changePasswordEmail(requestPayload);
                showSuccess(t('ForgotPassword.success'));
                toggleNewPasswordEmailDialog();
              } catch (error) {
                showError(error);
              } finally {
                helpersFormik.setSubmitting(false);
              }
            }}
          />
        )}

        <Formik
          initialValues={initalValuesLogin}
          validationSchema={validationSchemaLogin}
          onSubmit={onSubmitLogin}
        >
          {({ isSubmitting }) => {
            return (
              <Form>
                <HeadingTextForm />

                <LoginForm
                  loading={isSubmitting}
                  onClickForgotPassword={toggleForgotPasswordDialog}
                />

                <OtherLogin
                  onClickGoogle={onSubmitLoginGoogle}
                  onClickFacebook={onSubmitLogiFacebook}
                />

                <DontHaveAccountText onClickLoginText={() => toggleSignUpDialog()} />
                {/* <CommonStyles.FormikDebug /> */}
              </Form>
            );
          }}
        </Formik>
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default LoginLocalFriend;
