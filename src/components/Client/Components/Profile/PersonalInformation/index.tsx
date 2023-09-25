import CommonStylesClient from 'components/Client/CommonStylesClient';
import React from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useTranslations } from 'next-intl';
import { useTheme } from '@mui/material';
import TourGuideInformation from './TourGuideInformation';
import EmergencyContact from './EmergencyContact';
import License from './License';
import UploadFiles from './UploadFiles';
import useGetProfile from 'modules/profileLocalFriend/hooks/useGetProfileLocalFriend';
import { showError, showSuccess } from 'helpers/toast';
import profileLocalFriendServices from 'modules/profileLocalFriend/profileLocalFriend.services';
import { AllQueryKeys, useGet } from 'stores/useStore';
import cachedKeys from 'constants/cachedKeys';
import tourGuideServices from 'modules/tourGuide/tourGuide.services';
import UploadImageServices from 'modules/uploadImage/upload-image.services';
import ProfileLocalFriendModel from 'models/profileLocalFriend.model';
import CommonStyles from 'components/CommonStyles';
import { cloneDeep, isEmpty, isEqual, isObject, isString } from 'lodash';
import Payment from './Payment';
import { MediaItem, TourGuideDocRequest } from 'modules/tourGuide/tourGuide.interface';
import useAuth from 'hooks/useAuth';
import UploadCID from './UploadCID';
import NoteReasonDisapproval from './NoteReasonDisapproval';

interface PersonalInformationProps {}

export interface FormVerifyProfile {
  firstName?: string;
  lastName?: string;
  gender?: string;
  dateOfBirth?: string;
  description?: string;
  email?: string;
  phone?: string;
  phoneCode?: string;
  phoneEmergency?: string;
  phoneEmergencyCode?: string;
  cid?: string;
  nameEmergency?: string;
  relationShip?: string;
  bio?: string;
  provinceCity?: number[];
  residenceAccordingToPermanentAddress?: string;
  currentResidence?: string;
  checkLicense?: string;
  filesUpload?: MediaItem[];
  avatar?: string;
  bankName?: string;
  accountNumber?: string;
  beneficiaryName?: string;
  citizenIdCardImage?: TourGuideDocRequest[];
  note: string;
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

  const refetchProfileLocalFriend = useGet(cachedKeys.refetchProfileLocalFriend as AllQueryKeys);

  const initialValues = ProfileLocalFriendModel.parseInitialValues(dataProfile);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(t('Validation.empty', { name: t('Profile.firstName') })),
    lastName: Yup.string().required(t('Validation.empty', { name: t('Profile.lastName') })),
    cid: Yup.string()
      .required(t('Validation.empty', { name: t('Profile.cid') }))
      .matches(/^[0-9]{12}$/, t('Validation.validCid')),
    // residenceAccordingToPermanentAddress: Yup.string().required(
    //   t('Validation.empty', { name: t('Profile.residenceByPermanentAddress') })
    // ),
    dateOfBirth: Yup.string().required(t('Validation.empty', { name: t('Profile.dateOfBirth') })),
    gender: Yup.string().required(t('Validation.empty', { name: t('Profile.gender') })),
    // checkLicense: Yup.boolean().required(t('Validation.empty', { name: t('Profile.license') })),
    phone: Yup.string()
      .required(t('Validation.empty', { name: t('Profile.phone') }))
      .matches(/^[0-9]{10,12}$/, t('Validation.validPhone')),
    // currentResidence: Yup.string().required(
    //   t('Validation.empty', { name: t('Profile.currentResidence') })
    // ),
    phoneCode: Yup.string().required(t('Validation.empty', { name: t('LocalFriend.phonePrefix') })),
    // phoneEmergencyCode: Yup.string().required(
    //   t('Validation.empty', { name: t('LocalFriend.phonePrefix') })
    // ),
    provinceCity: Yup.array().min(1, t('Validation.empty', { name: t('Profile.tourDestination') })),
    // nameEmergency: Yup.string().required(t('Validation.empty', { name: t('Profile.fullname') })),
    // phoneEmergency: Yup.string()
    //   .required(t('Validation.empty', { name: t('Profile.phone') }))
    //   .matches(/^[0-9]{10,12}$/, t('Validation.validPhone')),
    // relationship: Yup.string().required(t('Validation.empty', { name: t('Profile.relationship') })),
    avatar: Yup.string().required(t('Validation.empty', { name: t('LocalFriend.avatar') })),
    // accountNumber: Yup.string()
    //   .required(t('Validation.empty', { name: t('LocalFriend.accountNumber') }))
    //   .matches(/^[0-9]{8,15}$/, t('Validation.accountBank')),
    // beneficiaryName: Yup.string().required(
    //   t('Validation.empty', { name: t('LocalFriend.beneficiaryName') })
    // ),
    // bankName: Yup.string().required(t('Validation.empty', { name: t('LocalFriend.bankName') })),
    email: Yup.string()
      .required(t('Validation.empty', { name: t('Profile.email') }))
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, t('Validation.emailFormat')),
    // bio: Yup.string().required(t('Validation.empty', { name: t('Profile.bio') })),
    citizenIdCardImage: Yup.array()
      .min(2, t('LocalFriend.citizenIdCardImageValidate'))
      .required(t('Validation.empty', { name: t('LocalFriend.citizenIdCardImage') })),
    // filesUpload: Yup.array()
    //   .of(
    //     Yup.object()
    //       .test(
    //         'checkEmpty',
    //         t('Validation.empty', { name: t('Profile.files') }),
    //         function (value) {
    //           const { url } = value as any;
    //           if (!url) {
    //             return false;
    //           }
    //           return true;
    //         }
    //       )
    //       .test('validateSize', t('Profile.validateFileSize'), function (value) {
    //         const { url } = value as any;
    //         const fileSize = url.size;
    //         if (fileSize / Math.pow(10, 6) > 15) {
    //           return false;
    //         }
    //         return true;
    //       })
    //   )
    //   .min(1, t('Validation.empty', { name: t('Profile.files') })),
  });

  //! Function
  const onSubmit = async (
    values: FormVerifyProfile,
    helpersFormik: FormikHelpers<FormVerifyProfile>
  ) => {
    const fileAvatar = values?.avatar;
    const fileImageTourGuide = values?.filesUpload;
    const fileImageCitizenIdCard = values?.citizenIdCardImage;
    const noHaveChanges = isEqual(initialValues?.filesUpload, fileImageTourGuide);
    const noHaveChangesUploadCID = isEqual(
      initialValues?.citizenIdCardImage,
      fileImageCitizenIdCard
    );
    let result: MediaItem[] | undefined = [];
    let resultCID: TourGuideDocRequest[] | undefined = [];

    if (noHaveChanges) {
      result = initialValues?.filesUpload;
    } else {
      result = cloneDeep(fileImageTourGuide);
    }
    if (noHaveChangesUploadCID) {
      resultCID = initialValues?.citizenIdCardImage;
    } else {
      resultCID = cloneDeep(fileImageCitizenIdCard);
    }
    try {
      helpersFormik.setSubmitting(true);

      let avatar = '';
      let imageTourGuide: string[] = [];
      let citizenIdCardImage: TourGuideDocRequest[] = [];

      if (!!fileAvatar && isObject(fileAvatar)) {
        const body = new FormData();
        body.append('file', fileAvatar!);
        const response = await tourGuideServices.uploadFile(body);
        avatar = response.data?.data?.uri;
      }
      if (!!result && !isEmpty(result)) {
        for (let i = 0; i < result.length; i++) {
          const item = result[i];
          if (isString(item?.url)) {
            imageTourGuide.push(item?.url?.split('9000/')[1]);
          }
          if (isObject(item?.url)) {
            const body = new FormData();
            body.append('files', item?.url);
            const response = await UploadImageServices.uploadMultipleImage(body);
            response.data?.data?.data.forEach((item) => {
              imageTourGuide.push(item?.uri);
            });
          }
        }
      }
      if (!!resultCID && !isEmpty(resultCID)) {
        for (let i = 0; i < resultCID.length; i++) {
          const item = resultCID[i];
          if (isString(item?.url)) {
            citizenIdCardImage.push({ ...item, url: item?.url.split('9000/')[1] });
          }
          if (isObject(item?.url)) {
            const body = new FormData();
            body.append('files', item?.url || '');
            const response = await UploadImageServices.uploadMultipleImage(body);
            response.data?.data?.data.forEach((item) => {
              citizenIdCardImage.push({ url: item?.uri, fileType: item?.fileType });
            });
          }
        }
      }
      const requestPayload = ProfileLocalFriendModel.parseBodyToRequest(
        values,
        avatar,
        imageTourGuide,
        citizenIdCardImage
      );
      const response = await profileLocalFriendServices.updateProfileTourGuide({
        body: requestPayload,
      });
      if (response.status === 200 || response.status === 201) {
        refetchProfileLocalFriend && (await refetchProfileLocalFriend());
        showSuccess(t('Profile.updateProfileLocalFriendSuccessfully'));
      }
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
        {({ values, errors, resetForm, isSubmitting }) => {
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
              <CommonStylesClient.Divider
                sx={{ marginBottom: '2rem', color: theme.colors?.client.midGray }}
                variant='fullWidth'
              />

              <EmergencyContact />
              <CommonStylesClient.Divider
                sx={{ marginBottom: '2rem', color: theme.colors?.client.midGray }}
                variant='fullWidth'
              />

              <License />

              <CommonStylesClient.Divider
                sx={{ marginBottom: '2rem', color: theme.colors?.client.midGray }}
                variant='fullWidth'
              />
              <UploadFiles />

              <CommonStylesClient.Divider
                sx={{ marginBottom: '2rem', color: theme.colors?.client.midGray }}
                variant='fullWidth'
              />
              <Payment />

              <CommonStylesClient.Divider
                sx={{ marginBottom: '2rem', color: theme.colors?.client.midGray }}
                variant='fullWidth'
              />
              <UploadCID />

              <CommonStylesClient.Divider
                sx={{ marginBottom: '2rem', color: theme.colors?.client.midGray }}
                variant='fullWidth'
              />
              <NoteReasonDisapproval />

              <CommonStylesClient.Divider
                sx={{ marginBottom: '2rem', mt: 2, color: theme.colors?.client.midGray }}
                variant='fullWidth'
              />
              <CommonStylesClient.Box>
                <CommonStylesClient.Button
                  type='submit'
                  variant='contained'
                  sx={{
                    backgroundColor: theme.colors?.client.coBaltBlue,
                    borderRadius: '1rem',
                    padding: '1rem 2.5rem',
                    color: theme.colors?.white,
                    fontSize: '1rem',
                    fontWeight: 700,
                    letterSpacing: '0.04rem',
                    textTransform: 'capitalize',
                    marginRight: '1.5rem',
                    boxShadow: 'none',
                    '&:hover': {
                      boxShadow: 'none',
                      backgroundColor: theme.colors?.client.coBaltBlue,
                    },
                  }}
                  loading={isSubmitting}
                >
                  {t('Common.submit')}
                </CommonStylesClient.Button>
                <CommonStylesClient.Button
                  variant='contained'
                  sx={{
                    backgroundColor: theme.colors?.white,
                    borderRadius: '1rem',
                    padding: '1rem 2.5rem',
                    color: theme.colors?.client.coBaltBlue,
                    fontSize: '1rem',
                    fontWeight: 700,
                    letterSpacing: '0.04rem',
                    textTransform: 'capitalize',
                    border: `0.063rem solid ${theme.colors?.client.coBaltBlue}`,
                    boxShadow: 'none',
                    '&:hover': {
                      boxShadow: 'none',
                      backgroundColor: theme.colors?.white,
                    },
                  }}
                  onClick={() => {
                    resetForm();
                  }}
                >
                  {t('Common.cancel')}
                </CommonStylesClient.Button>
              </CommonStylesClient.Box>
              <CommonStyles.FormikDebug />
            </Form>
          );
        }}
      </Formik>
    </CommonStylesClient.Box>
  );
};

export default React.memo(PersonalInformation);
