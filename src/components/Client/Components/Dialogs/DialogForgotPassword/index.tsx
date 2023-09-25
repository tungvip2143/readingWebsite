import React from 'react';
import { useTranslations } from 'next-intl';
import { Form, Formik, FormikHelpers, FormikValues } from 'formik';
import * as Yup from 'yup';

import CommonStyles from 'components/CommonStyles';

import ForgotPasswordForm from './Components/ForgotPasswordForm';
import HeadingTextForm from './Components/HeadingTextForm';
import { parsePhoneNumber } from 'helpers/phoneNumberFormat';
import { EMAIL_REGEX, Method } from 'constants/common';

export interface FormForgotPasswordValues {
  phoneNumber: string;
  phoneCode: string;
  email: string;
  method?: Method;
}

interface DialogForgotPasswordProps {
  isOpen: boolean;
  toggle: () => void;
  onSubmitForgotPassword: (
    values: FormForgotPasswordValues & FormikValues,
    helpers: FormikHelpers<FormForgotPasswordValues & FormikValues>
  ) => void;
}

const DialogForgotPassword = (props: DialogForgotPasswordProps) => {
  //! State
  const { isOpen, toggle, onSubmitForgotPassword } = props;
  const t = useTranslations();

  const initalValuesLogin = {
    phoneNumber: '',
    phoneCode: 'VN',
    method: Method.EMAIL,
    email: '',
  };

  const validationSchemaForgotPassword = Yup.object().shape({
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
  });

  //! Function

  //! Effect

  //! Render
  return (
    <Formik
      initialValues={initalValuesLogin}
      validationSchema={validationSchemaForgotPassword}
      onSubmit={onSubmitForgotPassword}
    >
      {({ isSubmitting }) => {
        return (
          <CommonStyles.Dialog
            showCloseIcon
            content={
              <Form>
                <HeadingTextForm />

                <ForgotPasswordForm loading={isSubmitting} />
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

export default React.memo(DialogForgotPassword);
