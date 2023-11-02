import React from 'react';
import { useTranslations } from 'next-intl';
import { Form, Formik, FormikHelpers, FormikValues } from 'formik';
import * as Yup from 'yup';

import CommonStyles from 'components/CommonStyles';
import { EMAIL_REGEX, Method } from 'constants/common';

import LoginForm from './Components/LoginForm';
import OtherLogin from './Components/OtherLogin';
import DontHaveAccountText from './Components/DontHaveAccountText';
import HeadingTextForm from './Components/HeadingTextForm';
import { parsePhoneNumber } from 'helpers/phoneNumberFormat';

export interface FormLoginValues {
  phoneNumber: string;
  password: string;
  phoneCode: string;
  saveLogin: boolean;
  method?: Method;
  email: string;
}

interface DialogLoginProps {
  isOpen: boolean;
  toggle: () => void;
  onClickSignUp?: () => void;
  onClickForgotPassword?: () => void;
  onSubmitLogin: (
    values: FormLoginValues & FormikValues,
    helpers: FormikHelpers<FormLoginValues & FormikValues>
  ) => void;
  onClickLoginGoogle?: () => void;
  onClickLoginFacebook?: () => void;
}

const DialogLogin = (props: DialogLoginProps) => {
  //! State
  const {
    isOpen,
    toggle,
    onClickSignUp,
    onSubmitLogin,
    onClickForgotPassword = () => {},
    onClickLoginGoogle = () => {},
    onClickLoginFacebook = () => {},
  } = props;
  const t = useTranslations();

  const initalValuesLogin: FormLoginValues = {
    phoneNumber: '',
    password: '',
    phoneCode: 'VN',
    saveLogin: false,
    email: '',
    method: Method.EMAIL,
  };

  const validationSchemaLogin = Yup.object().shape({
    method: Yup.string(),

    phoneCode: Yup.string().when('method', ([method]) => {
      return method === Method.PHONE
        ? Yup.string().required(t('Validation.empty', { name: t('Articles.phonePrefix') }))
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
            .required(t('Validation.empty', { name: t('Articles.email') }))
            .matches(EMAIL_REGEX, t('Validation.emailFormat'))
        : Yup.string();
    }),

    password: Yup.string().required(t('Validation.empty', { name: t(`Login.password`) })),
  });

  //! Function

  //! Effect

  //! Render
  return (
    <Formik
      initialValues={initalValuesLogin}
      validationSchema={validationSchemaLogin}
      onSubmit={onSubmitLogin}
    >
      {({ isSubmitting }) => {
        return (
          <CommonStyles.Dialog
            showCloseIcon
            content={
              <Form>
                <HeadingTextForm />

                <LoginForm
                  loading={isSubmitting}
                  onClickForgotPassword={() => onClickForgotPassword()}
                />

                <OtherLogin
                  onClickGoogle={() => onClickLoginGoogle()}
                  onClickFacebook={() => onClickLoginFacebook()}
                />

                <DontHaveAccountText onClickLoginText={() => onClickSignUp && onClickSignUp()} />
                <CommonStyles.FormikDebug />
              </Form>
            }
            open={isOpen}
            toggle={toggle}
            disableClickOutside={false}
            sx={{
              ['.MuiPaper-root']: {
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

export default React.memo(DialogLogin);
