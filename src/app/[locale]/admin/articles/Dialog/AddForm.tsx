import React from 'react';
import { Form, Formik } from 'formik';
import { useTheme } from '@mui/material';
import CommonStyles from 'components/CommonStyles';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import FormAddArticle from './component/FormAddArticle';
import { useTranslations } from 'next-intl';

import { TourGuideInfoStatus, modalAction } from 'constants/common';
import useGetDetailTourGuide from 'modules/tourGuide/hooks/useGetDetailTourGuide';
import { showError } from 'helpers/toast';
import TourGuideModel from 'models/tour-guide.model';
import { useGet } from 'stores/useStore';
import cachedKeys from 'constants/cachedKeys';
import { MediaItem, TourGuideDocRequest } from 'modules/tourGuide/tourGuide.interface';

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

const AddForm = (props: Props) => {
  //! State
  const { idTourGuide, actionStatus, toggleAddform } = props;
  const { data, isLoading } = useGetDetailTourGuide(idTourGuide || 0, !!idTourGuide);

  const theme = useTheme();
  const t = useTranslations();
  const router = useRouter();
  const refetchListTourGuide = useGet(cachedKeys.refetchListTourGuide);

  const isCreate = actionStatus === modalAction.CREATE;
  const isDetail = actionStatus === modalAction.DETAILS;
  const isUpdate = !!data?.draft;

  const initialValues = TourGuideModel.parseInitialValues(data);

  //! Validate
  const validationAddFormSchema = Yup.object().shape({});

  //! Function

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

        try {
          if (isCreate) {
            // const response = await tourGuideServices.createTourGuide(requestPayload);
            // refetchListTourGuide && refetchListTourGuide();

            // if (response?.status === 200 || response?.status === 201) {
            //   showSuccess(t('Common.success'));
            //   toggleAddform && toggleAddform();
            // }
            return;
          }
          if (isDetail && !!idTourGuide) {
            // const response = await tourGuideServices.updateTourGuide({
            //   id: idTourGuide,
            //   body: requestPayloadUpdate,
            // });
            // refetchListTourGuide && refetchListTourGuide();
            // if (response?.status === 200 || response?.status === 201) {
            //   showSuccess(t('Common.success'));
            //   toggleAddform && toggleAddform();
            // }
            return;
          }
          if (isUpdate && !!idTourGuide) {
            // const response = await tourGuideServices.accpetDraftTourGuide({
            //   id: idTourGuide,
            //   body: {
            //     status: values?.status,
            //     note: values?.draft?.note,
            //   },
            // });
            // refetchListTourGuide && refetchListTourGuide();
            // if (response?.status === 200 || response?.status === 201) {
            //   showSuccess(t('Common.success'));
            //   toggleAddform && toggleAddform();
            // }
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
                <FormAddArticle actionStatus={actionStatus} />
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
