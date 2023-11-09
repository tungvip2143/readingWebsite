import CommonStylesClient from 'components/Client/CommonStylesClient';
import React from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useTranslations } from 'next-intl';
import { useTheme } from '@mui/material';
import TourGuideInformation from './TourGuideInformation';
import useGetProfile from 'modules/profileLocalFriend/hooks/useGetProfileLocalFriend';
import { showError, showSuccess } from 'helpers/toast';
import cachedKeys from 'constants/cachedKeys';
import CommonStyles from 'components/CommonStyles';
import { MediaItem, TourGuideDocRequest } from 'modules/tourGuide/article.interface';
import useAuth from 'hooks/useAuth';
import ProfileBasicdModel from 'models/profileBasic.model';

interface PersonalInformationProps {}

export interface FormVerifyProfileBasic {
  firstName?: string;
  lastName?: string;
  gender?: string;
  dateOfBirth?: string;
  email?: string;
  phone?: string;
  phoneCode?: string;
  cid?: string;
  bio?: string;
  provinceCity?: number[];
  residenceAccordingToPermanentAddress?: string;
  currentResidence?: string;
  avatar?: string;
  [key: string]:
    | string
    | number
    | boolean
    | number[]
    | undefined
    | MediaItem[]
    | TourGuideDocRequest[]
    | string[];
}

const PersonalInformation = (props: PersonalInformationProps) => {
  //! State
  const t = useTranslations();
  const theme = useTheme();
  const auth = useAuth();

  const isLogged = auth.isLogged || false;
  const { data: dataProfile, isLoading: loadingProfile } = useGetProfile({
    isTrigger: !!isLogged,
    refetchKey: cachedKeys.refetchProfileLocalFriend,
  });

  const initialValues = ProfileBasicdModel.parseInitialValues(dataProfile);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(t('Validation.empty', { name: t('Profile.firstName') })),
    lastName: Yup.string().required(t('Validation.empty', { name: t('Profile.lastName') })),
    cid: Yup.string()
      .required(t('Validation.empty', { name: t('Profile.cid') }))
      .matches(/^[0-9]{12}$/, t('Validation.validCid')),

    dateOfBirth: Yup.string().required(t('Validation.empty', { name: t('Profile.dateOfBirth') })),
    gender: Yup.string().required(t('Validation.empty', { name: t('Profile.gender') })),
    phone: Yup.string()
      .required(t('Validation.empty', { name: t('Profile.phone') }))
      .matches(/^[0-9]{10,12}$/, t('Validation.validPhone')),

    phoneCode: Yup.string().required(t('Validation.empty', { name: t('Articles.phonePrefix') })),

    provinceCity: Yup.array().min(1, t('Validation.empty', { name: t('Profile.tourDestination') })),
    avatar: Yup.string().required(t('Validation.empty', { name: t('Articles.avatar') })),
    email: Yup.string()
      .required(t('Validation.empty', { name: t('Profile.email') }))
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, t('Validation.emailFormat')),
    residenceAccordingToPermanentAddress: Yup.string().required(
      t('Validation.empty', { name: t('Articles.residenceAccordingToPermanentAddress') })
    ),
    currentResidence: Yup.string().required(
      t('Validation.empty', { name: t('Articles.currentResidence') })
    ),
  });

  //! Function
  const onSubmit = async (
    values: FormVerifyProfileBasic,
    helpersFormik: FormikHelpers<FormVerifyProfileBasic>
  ) => {
    try {
    } catch (error) {
      showError(error);
    } finally {
      helpersFormik.setSubmitting(false);
    }
  };

  //! Render
  if (loadingProfile) {
    return <CommonStylesClient.Loading />;
  }
  return (
    <CommonStylesClient.Box
      sx={{
        flex: 1,
        padding: '2rem',
        backgroundColor: theme.colors?.white,
        borderRadius: '1.5rem',
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur
        validateOnChange
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ values, errors, resetForm }) => {
          return (
            <Form>
              <CommonStylesClient.Typography
                variant='h3'
                sx={{
                  color: theme.colors?.client.textPaginationBlack,
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  lineHeight: '2.1rem',
                  letterSpacing: '0.06rem',
                  marginBottom: '3rem',
                }}
              >
                {t('Profile.personalInformation')}
              </CommonStylesClient.Typography>

              <TourGuideInformation />
            </Form>
          );
        }}
      </Formik>
    </CommonStylesClient.Box>
  );
};

export default React.memo(PersonalInformation);
