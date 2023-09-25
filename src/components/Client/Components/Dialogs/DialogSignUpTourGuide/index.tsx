import React from 'react';
import { useTranslations } from 'next-intl';
import { Form, Formik, FormikHelpers, FormikValues } from 'formik';
import * as Yup from 'yup';

import CommonStyles from 'components/CommonStyles';
import { EMAIL_REGEX, PHONE_REGEX } from 'constants/common';

import SignUpForm from './Components/SignUpForm';
import OtherLogin from './Components/OtherLogin';
import DontHaveAccountText from './Components/DontHaveAccountText';
import HeadingTextForm from './Components/HeadingTextForm';
import { parsePhoneNumber } from 'helpers/phoneNumberFormat';
import { isEmpty } from 'lodash';

export interface FormSignUpValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  phoneCode: string;
  acceptTerm: boolean;
  email: string;
  gender: string;
}

interface DialogSignUpTourGuideProps {
  isOpen: boolean;
  toggle: () => void;
  onClickSignIn?: () => void;
  onSubmitSignUp: (
    values: FormSignUpValues & FormikValues,
    helpers: FormikHelpers<FormSignUpValues & FormikValues>
  ) => void;
  onClickLoginGoogle?: () => void;
  onClickLoginFacebook?: () => void;
}

const DialogSignUpTourGuide = (props: DialogSignUpTourGuideProps) => {
  //! State
  const {
    isOpen,
    toggle,
    onClickSignIn,
    onSubmitSignUp,
    onClickLoginGoogle = () => {},
    onClickLoginFacebook = () => {},
  } = props;
  const t = useTranslations();

  const initalValuesSignUp: FormSignUpValues = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    phoneCode: 'VN',
    acceptTerm: false,
    email: '',
    gender: '',
  };

  const validationSchemaSignUp = Yup.object().shape({
    firstName: Yup.string().required(
      t('Validation.empty', {
        name: `${t(`SignUp.firstNamePlaceholder`)}`,
      })
    ),
    lastName: Yup.string().required(
      t('Validation.empty', {
        name: `${t(`SignUp.lastNamePlaceholder`)}`,
      })
    ),
    gender: Yup.string().required(t('Validation.empty', { name: t('SignUp.gender') })),
    phoneNumber: Yup.string()
      .required(t('Validation.empty', { name: t(`SignUp.phoneNumber`) }))
      .matches(/^[0-9]{9,12}$/, t('Validation.validPhone'))
      .test('phoneIsValid', t('Validation.formatPhoneByCountry'), function (value) {
        const { phoneCode } = this.parent;
        const { isValidated } = parsePhoneNumber(value, phoneCode);
        return isValidated;
      }),
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
    acceptTerm: Yup.boolean().oneOf(
      [true],
      t('Validation.accept', { name: t(`SignUp.termAndCondition`) })
    ),
  });

  //! Function

  //! Effect

  //! Render
  return (
    <Formik
      initialValues={initalValuesSignUp}
      validationSchema={validationSchemaSignUp}
      onSubmit={onSubmitSignUp}
      enableReinitialize
    >
      {({ isSubmitting }) => {
        return (
          <CommonStyles.Dialog
            showCloseIcon
            content={
              <Form>
                <HeadingTextForm />

                <SignUpForm loading={isSubmitting} />

                <OtherLogin
                  onClickGoogle={() => onClickLoginGoogle()}
                  onClickFacebook={() => onClickLoginFacebook()}
                />

                <DontHaveAccountText onClickLoginText={() => onClickSignIn && onClickSignIn()} />
              </Form>
            }
            open={isOpen}
            toggle={toggle}
            disableClickOutside={false}
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

export default React.memo(DialogSignUpTourGuide);
