import React from 'react';
import { useTranslations } from 'next-intl';
import { Form, Formik, FormikHelpers, FormikValues } from 'formik';
import * as Yup from 'yup';

import CommonStyles from 'components/CommonStyles';

import HeadingTextForm from './Components/HeadingTextForm';
import { parsePhoneNumber } from 'helpers/phoneNumberFormat';
import NewPasswordForm from './Components/NewPasswordForm';

export interface FormNewPasswordValues {
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  phoneCode: string;
}

interface DialogNewPasswordProps {
  isOpen: boolean;
  toggle: () => void;
  onSubmitChangePassword: (
    values: FormNewPasswordValues & FormikValues,
    helpers: FormikHelpers<FormNewPasswordValues & FormikValues>
  ) => void;
  phoneNumber: string;
  phoneCode: string;
}

const DialogNewPassword = (props: DialogNewPasswordProps) => {
  //! State
  const { isOpen, toggle, onSubmitChangePassword, phoneNumber = '', phoneCode = '' } = props;
  const t = useTranslations();

  const initalValuesSignUp: FormNewPasswordValues = {
    phoneNumber: phoneNumber || '',
    password: '',
    confirmPassword: '',
    phoneCode: phoneCode || 'VN',
  };

  const validationSchemaSignUp = Yup.object().shape({
    phoneNumber: Yup.string()
      .required(t('Validation.empty', { name: t(`SignUp.phoneNumber`) }))
      .matches(/^[0-9]{9,12}$/, t('Validation.validPhone'))
      .test('phoneIsValid', t('Validation.formatPhoneByCountry'), function (value) {
        const { phoneCode } = this.parent;
        const { isValidated } = parsePhoneNumber(value, phoneCode);
        return isValidated;
      }),
    password: Yup.string()
      .required(t('Validation.empty', { name: t(`SignUp.password`) }))
      .min(8, t('Validation.validPassword'))
      .matches(/[a-zA-Z]/, t('Validation.containLatinPassword')),
    confirmPassword: Yup.string()
      .required(t('Validation.empty', { name: t(`SignUp.password`) }))
      .oneOf([Yup.ref('password'), ''], t('Validation.confirmPasswordNotMatch')),
  });

  //! Function

  //! Effect

  //! Render
  return (
    <Formik
      initialValues={initalValuesSignUp}
      validationSchema={validationSchemaSignUp}
      onSubmit={onSubmitChangePassword}
      enableReinitialize
    >
      {({ isSubmitting }) => {
        return (
          <CommonStyles.Dialog
            content={
              <Form>
                <HeadingTextForm />

                <NewPasswordForm loading={isSubmitting} />
              </Form>
            }
            open={isOpen}
            toggle={toggle}
            disableClickOutside
            isDetail
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

export default React.memo(DialogNewPassword);
