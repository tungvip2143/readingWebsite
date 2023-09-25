import React from 'react';
import { useTranslations } from 'next-intl';
import { Form, Formik, FormikHelpers, FormikValues } from 'formik';
import * as Yup from 'yup';

import CommonStyles from 'components/CommonStyles';

import HeadingTextForm from './Components/HeadingTextForm';
import NewPasswordForm from './Components/NewPasswordForm';
import { EMAIL_REGEX } from 'constants/common';

export interface FormNewPasswordEmailValues {
  password: string;
  confirmPassword: string;
  email: string;
}

interface DialogNewPasswordEmailProps {
  isOpen: boolean;
  toggle: () => void;
  onSubmitChangePassword: (
    values: FormNewPasswordEmailValues & FormikValues,
    helpers: FormikHelpers<FormNewPasswordEmailValues & FormikValues>
  ) => void;
  email: string;
}

const DialogNewPasswordEmail = (props: DialogNewPasswordEmailProps) => {
  //! State
  const { isOpen, toggle, onSubmitChangePassword, email = '' } = props;
  const t = useTranslations();

  const initalValuesSignUp: FormNewPasswordEmailValues = {
    email: email || '',
    password: '',
    confirmPassword: '',
  };

  const validationSchemaSignUp = Yup.object().shape({
    email: Yup.string()
      .required(t('Validation.empty', { name: t('SignUp.email') }))
      .matches(EMAIL_REGEX, t('Validation.emailFormat')),
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

export default React.memo(DialogNewPasswordEmail);
