import React, { useCallback, useState } from 'react';
import { Form, Formik, FormikValues } from 'formik';
import { Grid, useTheme } from '@mui/material';
import CommonStyles from 'components/CommonStyles';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import ProfileDetail from './component/ProfileDetail';
import { useTranslations } from 'next-intl';
import ApprovalForm from './component/StatusCard/ApprovalForm';
import SubmitForm from './component/StatusCard/SubmitForm';
import Payment from './component/Payment';
import Orders from './component/Orders';
import { EMAIL_REGEX, TourGuideInfoStatus, TourGuideTabs, modalAction } from 'constants/common';
import useGetDetailTourGuide from 'modules/tourGuide/hooks/useGetDetailTourGuide';
import tourGuideServices from 'modules/tourGuide/tourGuide.services';
import { showError, showSuccess } from 'helpers/toast';
import TourGuideModel from 'models/tour-guide.model';
import { useGet } from 'stores/useStore';
import cachedKeys from 'constants/cachedKeys';
import {
  MediaItem,
  RequestCreateTourGuide,
  TourGuideDocRequest,
} from 'modules/tourGuide/tourGuide.interface';
import { parsePhoneNumber } from 'helpers/phoneNumberFormat';
import UploadImageServices from 'modules/uploadImage/upload-image.services';
import { createPortal } from 'react-dom';
import { isEmpty, isEqual } from 'lodash';
import ProfileUpdate from './component/ProfileUpdate';
import { Media } from 'interfaces/common';

interface Props {
  idTourGuide?: number;
  actionStatus?: string;
  toggleAddform?: () => void;
}

export interface FormTourGuideValues {
  firstName: string;
  lastName: string;
  cid?: string;
  description?: string;
  residenceAccordingToPermanentAddress?: string;
  date_of_birth?: Date | null;
  phone?: string;
  currentResidence?: string;
  provinceCity?: number[];
  nameEmergency?: string;
  phoneEmergency?: string;
  relationship?: string;
  avatar?: string;
  imgTourGuide?: MediaItem[];
  citizenIdCardImage?: TourGuideDocRequest[];
  ratingTourGuide?: string | number;
  isActive?: boolean;
  checkLicense?: string;
  bankName?: string;
  accountNumber?: string;
  beneficiaryName?: string;
  email?: string;
  gender?: string;
  paymentMethodStatus?: string;
  status?: TourGuideInfoStatus;
  phoneEmergencyPrefix: string;
  phoneTourGuidePrefix: string;
  draft: Omit<FormTourGuideValues, 'draft'> & {
    note: string;
  };
  [key: string]:
    | string
    | string[]
    // | number[]
    | number
    | Date
    | boolean
    | TourGuideInfoStatus
    | null
    | undefined
    | MediaItem[]
    | TourGuideDocRequest[]
    | number[]
    | Omit<FormTourGuideValues, 'draft'>;
}

export const listTabDetail = [
  {
    label: 'LocalFriend.profileDetail',
    value: TourGuideTabs.Profile,
  },
  {
    label: 'LocalFriend.payment',
    value: TourGuideTabs.Payment,
  },
  {
    label: 'LocalFriend.orders',
    value: TourGuideTabs.Orders,
  },
];

export const listTabUpdate = [
  {
    label: 'LocalFriend.profileDetail',
    value: TourGuideTabs.Profile,
  },
  {
    label: 'LocalFriend.payment',
    value: TourGuideTabs.Payment,
  },
  {
    label: 'LocalFriend.orders',
    value: TourGuideTabs.Orders,
  },
  {
    label: 'LocalFriend.profileUpdate',
    value: TourGuideTabs.ProfileUpdate,
  },
];

export const listCreateTourGuide = [
  {
    label: 'LocalFriend.profileDetail',
    value: TourGuideTabs.Profile,
  },
  {
    label: 'LocalFriend.payment',
    value: TourGuideTabs.Payment,
  },
];

const AddForm = (props: Props) => {
  //! State
  const { idTourGuide, actionStatus, toggleAddform } = props;
  const { data, isLoading } = useGetDetailTourGuide(idTourGuide || 0, !!idTourGuide);

  const theme = useTheme();
  const t = useTranslations();
  const router = useRouter();
  const refetchListTourGuide = useGet(cachedKeys.refetchListTourGuide);
  const [filters, setFilters] = useState({ status: Number(TourGuideTabs.Profile) });

  const isProfileTab = filters.status === TourGuideTabs.Profile;
  const isPaymentTab = filters.status === TourGuideTabs.Payment;
  const isOrdersTab = filters.status === TourGuideTabs.Orders;
  const isProfileUpdate = filters.status === TourGuideTabs.ProfileUpdate;

  const isCreate = actionStatus === modalAction.CREATE;
  const isDetail = actionStatus === modalAction.DETAILS;
  const isUpdate = !!data?.draft;

  const listTabs = () => {
    if (isCreate) {
      return listCreateTourGuide;
    }
    if (isDetail && !isUpdate) {
      return listTabDetail;
    }
    if (isDetail && isUpdate) {
      return listTabUpdate;
    }
    return;
  };

  const onClickStatus = (name: string, value: number) => () => {
    setFilters((prev: any) => {
      router.push(`${window.location.pathname}?tab=${value}`);
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const listItem = listTabs()?.map((item) => {
    return {
      isActive: filters?.status === item?.value,
      label: t(`${item?.label}` as any),
      onClick: onClickStatus('status', item?.value),
    };
  });

  const dataDraft = data?.draft ? JSON?.parse(data?.draft) : undefined;
  const initialValues = TourGuideModel.parseInitialValues(data, dataDraft);

  //! Validate
  const validationAddFormSchema = Yup.object().shape({
    // firstName: Yup.string().required(t('Validation.empty', { name: t('LocalFriend.firstName') })),
    // lastName: Yup.string().required(t('Validation.empty', { name: t('LocalFriend.lastName') })),
    // cid: Yup.string()
    //   .required(t('Validation.empty', { name: 'Citizen ID card' }))
    //   .matches(/^[0-9]{12}$/, t('Validation.validCid')),
    // residenceAccordingToPermanentAddress: Yup.string().required(
    //   t('Validation.empty', { name: t('LocalFriend.residenceAccordingToPermanentAddress') })
    // ),
    // date_of_birth: Yup.date().required(t('Validation.empty', { name: t('LocalFriend.date') })),
    // gender: Yup.string().required(t('Validation.empty', { name: t('LocalFriend.gender') })),
    // checkLicense: Yup.string().required(t('Validation.empty', { name: t('LocalFriend.license') })),
    // currentResidence: Yup.string().required(
    //   t('Validation.empty', { name: t('LocalFriend.currentResidence') })
    // ),
    // phoneTourGuidePrefix: Yup.string().required(
    //   t('Validation.empty', { name: t('LocalFriend.phonePrefix') })
    // ),
    // phone: Yup.string()
    //   .required(t('Validation.empty', { name: t('LocalFriend.phone') }))
    //   // .matches(/^[0-9]{9,12}$/, t('Validation.validPhone'))
    //   .test('phoneIsValid', t('Validation.formatPhoneByCountry'), function (value) {
    //     const { phoneTourGuidePrefix } = this.parent;
    //     const { isValidated } = parsePhoneNumber(value, phoneTourGuidePrefix);
    //     return isValidated;
    //   }),
    // provinceCity: Yup.array().min(
    //   1,
    //   t('Validation.empty', { name: t('LocalFriend.provinceCity') })
    // ),
    // citizenIdCardImage: Yup.array()
    //   .min(2, t('LocalFriend.citizenIdCardImageValidate'))
    //   .required(t('Validation.empty', { name: t('LocalFriend.citizenIdCardImage') })),
    // provinceCity: Yup.string().required(
    //   t('Validation.empty', { name: t('LocalFriend.provinceCity') })
    // ),
    // nameEmergency: Yup.string().required(t('Validation.empty', { name: t('LocalFriend.name') })),
    // phoneEmergency: Yup.string()
    //   .required(t('Validation.empty', { name: t('LocalFriend.phone') }))
    //   .matches(/^[0-9]{9,12}$/, t('Validation.validPhone')),
    // relationship: Yup.string().required(
    //   t('Validation.empty', { name: t('LocalFriend.relationship') })
    // ),
    // avatar: Yup.string().required(t('Validation.empty', { name: t('LocalFriend.avatar') })),
    // imgTourGuide: Yup.string().required(
    //   t('Validation.empty', { name: t('LocalFriend.actualPortraitPhotoAtTheTimeOfRegistration') })
    // ),
    // bankName: Yup.string().required(t('Validation.empty', { name: t('LocalFriend.bankName') })),
    // accountNumber: Yup.string()
    //   .required(t('Validation.empty', { name: t('LocalFriend.accountNumber') }))
    //   .matches(/^[0-9]{8,15}$/, t('Validation.accountBank')),
    // beneficiaryName: Yup.string().required(
    //   t('Validation.empty', { name: t('LocalFriend.beneficiaryName') })
    // ),
    // email: Yup.string()
    //   .required(t('Validation.empty', { name: t('LocalFriend.email') }))
    //   .matches(EMAIL_REGEX, t('Validation.emailFormat')),
  });

  //! Function
  const renderTab = () => {
    const fullname = `${data?.firstName} ${data?.lastName}`;
    return (
      <Grid container>
        <Grid item xs={4}>
          {isDetail && (
            <CommonStyles.Typography
              sx={{
                fontSize: '2rem',
                lineHeight: '3rem',
                color: theme?.colors?.bgneutral900,
                fontWeight: 'bold',
              }}
            >
              {fullname}
            </CommonStyles.Typography>
          )}
        </Grid>
        <Grid item xs={8}>
          <CommonStyles.Tabs listItem={listItem} />
        </Grid>
      </Grid>
    );
  };

  const renderTabContents = useCallback(() => {
    switch (filters.status) {
      case TourGuideTabs.Profile:
        return <ProfileDetail actionStatus={actionStatus} />;
      case TourGuideTabs.ProfileUpdate:
        return <ProfileUpdate />;
      case TourGuideTabs.Payment:
        return <Payment actionStatus={actionStatus} />;
      case TourGuideTabs.Orders:
        const parent_form = document.getElementById('parent_form');
        if (parent_form) {
          return createPortal(<Orders idTourGuide={idTourGuide} />, parent_form);
        }
      // return <Orders idTourGuide={idTourGuide} />;

      default:
        return <>Coming Soon ...</>;
    }
  }, [filters]);

  const renderStatusCard = () => {
    if (isOrdersTab) return undefined;

    if (isCreate) {
      return <SubmitForm toggle={toggleAddform} />;
    }

    return <ApprovalForm data={data} isUpdate={isProfileUpdate} />;
  };

  //! Render
  if (isLoading) {
    return <CommonStyles.Loading />;
  }
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationAddFormSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        const fileAvatar = values?.avatar;
        const fileImageTourGuide = values?.imgTourGuide;
        const fileImageCitizenIdCard = values?.citizenIdCardImage;

        try {
          if (isCreate) {
            let avatar = '';
            let imageTourGuide: string[] = [];
            let citizenIdCardImage: TourGuideDocRequest[] = [];

            if (!!fileAvatar) {
              const body = new FormData();
              body.append('file', fileAvatar!);
              const response = await tourGuideServices.uploadFile(body);
              avatar = response.data?.data?.uri;
            }

            if (fileImageTourGuide && !isEmpty(fileImageTourGuide)) {
              const body = new FormData();
              for (const file of fileImageTourGuide) {
                body.append('files', file?.url);
              }
              const response = await UploadImageServices.uploadMultipleImage(body);
              imageTourGuide = response.data?.data?.data?.map((item) => item?.uri);
            }

            if (fileImageCitizenIdCard && !isEmpty(fileImageCitizenIdCard)) {
              const body = new FormData();
              for (const file of fileImageCitizenIdCard) {
                body.append('files', file?.url || '');
              }
              const response = await UploadImageServices.uploadMultipleImage(body);
              citizenIdCardImage = response.data?.data?.data?.map((item) => ({
                url: item?.uri,
                fileType: item?.fileType,
                content: 'string',
              }));
            }
            const requestPayload = TourGuideModel.parseBodyToRequest(
              values,
              avatar,
              imageTourGuide,
              citizenIdCardImage
            );
            const response = await tourGuideServices.createTourGuide(requestPayload);
            refetchListTourGuide && refetchListTourGuide();

            if (response?.status === 200 || response?.status === 201) {
              showSuccess(t('Common.success'));
              toggleAddform && toggleAddform();
            }
            return;
          }
          if (isDetail && !!idTourGuide && isProfileTab) {
            let requestPayloadUpdate: Partial<RequestCreateTourGuide> = {};
            for (const key in initialValues) {
              if (initialValues[key] !== values[key] && !isEqual(initialValues[key], values[key])) {
                requestPayloadUpdate[key] = values[key];
              }
            }

            const response = await tourGuideServices.updateTourGuide({
              id: idTourGuide,
              body: requestPayloadUpdate,
            });
            refetchListTourGuide && refetchListTourGuide();
            if (response?.status === 200 || response?.status === 201) {
              showSuccess(t('Common.success'));
              toggleAddform && toggleAddform();
            }
            return;
          }
          if (isUpdate && !!idTourGuide) {
            const response = await tourGuideServices.accpetDraftTourGuide({
              id: idTourGuide,
              body: {
                status: values?.status,
                note: values?.draft?.note,
              },
            });
            refetchListTourGuide && refetchListTourGuide();
            if (response?.status === 200 || response?.status === 201) {
              showSuccess(t('Common.success'));
              toggleAddform && toggleAddform();
            }
            return;
          }
        } catch (error) {
          showError(error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {() => {
        return (
          <CommonStyles.Box id='parent_form'>
            <Form>
              <CommonStyles.Box>
                {renderTab()}
                <CommonStyles.Divider variant='middle' />
                <Grid container sx={{ flexWrap: 'nowrap' }} columnGap={2}>
                  <Grid item xs={isOrdersTab ? 12 : 9.5}>
                    {renderTabContents()}
                  </Grid>
                  {(isPaymentTab || isProfileTab || isProfileUpdate) && (
                    <CommonStyles.Divider variant='middle' orientation='vertical' flexItem />
                  )}

                  {(isPaymentTab || isProfileTab || isProfileUpdate) && (
                    <Grid item xs={2.5} sx={{ width: '100%' }}>
                      {renderStatusCard()}
                    </Grid>
                  )}
                </Grid>
              </CommonStyles.Box>
              <CommonStyles.FormikDebug />
            </Form>
          </CommonStyles.Box>
        );
      }}
    </Formik>
  );
};
export default React.memo(AddForm);
