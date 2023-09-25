import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import CommonStyles from 'components/CommonStyles';
import WrapperGeneral from './Content/WrapperGeneral/WrapperGeneral';
import MediaVendor from './Content/Media';
import { isEmpty } from 'lodash';
import { showError, showSuccess } from 'helpers/toast';
import { useTranslations } from 'next-intl';
import { AllQueryKeys, useGet } from 'stores/useStore';
import cachedKeys from 'constants/cachedKeys';
import { VendorStatus } from 'constants/common';
import { RequestCreateVendor, RequestServing, Vendor } from 'modules/vendor/vendor.interface';
import useGetDetailVendor from 'modules/vendor/hooks/useGetDetailVendor';
import vendorServices from 'modules/vendor/vendor.services';
import Price from './Content/Price';
import ServeTime from './Content/ServeTime';
import RentedATable from './Content/RentedATable';
import ToTalSlot from './Content/ToTalSlot';
import TourModel from 'models/tour.model';
import VendorModel from 'models/vendor.model';
import { Media } from 'interfaces/common';
import { parsePhoneNumber } from 'helpers/phoneNumberFormat';

interface ContentAddVendor {
  vendor?: Vendor;
  toggle: () => void;
}
export interface IMedia {
  url: File | string;
  content: string;
}
export interface FormValuesVendor {
  name?: string;
  description?: string;
  media?: Media[];
  fullAddress?: string;
  status?: VendorStatus;
  vendorTypes?: number[];
  provinceCode?: string;
  phone?: string;
  email?: string;
  phoneCode?: string;
  districtCode?: string;
  wardCode?: string;
  bookingPrice?: number;
  minPrice?: number;
  maxPrice?: number;
  servings?: RequestServing;
  isVerify?: boolean;
  totalSlot?: number;
  type?: string[];
  [key: string]:
    | string
    | string[]
    | Media[]
    | VendorStatus
    | number
    | boolean
    | undefined
    | number[]
    | RequestServing;
}

export default function Content(props: ContentAddVendor) {
  //! State
  const t = useTranslations();
  const { vendor, toggle } = props;
  const isEdit = !isEmpty(vendor);

  const { data: dataDetailVendor, isLoading: loadingDetailVendor } = useGetDetailVendor(
    Number(vendor?.id),
    !!vendor?.id
  );
  const refetchListVendor = useGet(cachedKeys.refetchListVendor as AllQueryKeys);

  //! Function

  const initialValues = VendorModel.parseInitialValues(dataDetailVendor);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('Validation.empty', { name: t('Vendor.name') })),
    vendorTypes: Yup.array().min(1, t('Validation.empty', { name: t('Vendor.typeVendor') })),
    description: Yup.string().required(
      t('Validation.empty', { name: t('Vendor.descriptionVendor') })
    ),
    fullAddress: Yup.string().required(t('Validation.empty', { name: t('Vendor.fullAddress') })),
    provinceCode: Yup.string().required(t('Validation.empty', { name: t('Vendor.provinceCode') })),
    email: Yup.string()
      .required(t('Validation.empty', { name: t(`Vendor.emailLabel`) }))
      .email(t('Validation.emailFormat')),
    phone: Yup.string()
      .required(t('Validation.empty', { name: t('LocalFriend.phone') }))
      .matches(/^[0-9]{9,12}$/, t('Validation.validPhone'))
      .test('phoneIsValid', t('Validation.formatPhoneByCountry'), function (value) {
        const { phoneCode } = this.parent;
        const { isValidated } = parsePhoneNumber(value, phoneCode);
        return isValidated;
      }),
    phoneCode: Yup.string().required(t('Validation.empty', { name: t('Vendor.phoneCode') })),
    wardCode: Yup.string().required(t('Validation.empty', { name: t('Vendor.wardCode') })),
    districtCode: Yup.string().required(t('Validation.empty', { name: t('Vendor.districtCode') })),
    bookingPrice: Yup.number()
      .min(0)
      .required(t('Validation.empty', { name: t('Vendor.bookingPrice') })),
    minPrice: Yup.number()
      .required(t('Validation.empty', { name: t('Vendor.minPrice') }))
      .min(0),
    maxPrice: Yup.number()
      .min(0)
      .required(t('Validation.empty', { name: t('Vendor.maxPrice') }))
      .test('is-greater', t('Vendor.comparePrice'), function (value) {
        const inputValueMinPrice = this.parent.minPrice;
        return value >= inputValueMinPrice;
      }),
    totalSlot: Yup.number()
      .min(1)
      .required(t('Validation.empty', { name: t('Vendor.totalSlot') })),
    // servings: Yup.array().min(1, t('Validation.empty', { name: t('Vendor.serveTime') })),
    media: Yup.array().min(1, t('Validation.empty', { name: t('Vendor.imageVideo') })),
  });
  const onSubmit = async (
    values: FormValuesVendor,
    helpersFormik: FormikHelpers<FormValuesVendor>
  ) => {
    try {
      helpersFormik.setSubmitting(true);
      const { media, status } = values;

      if (isEdit) {
        const mediaParsed = await VendorModel.uploadMedia(media || []);

        const requestPayloadUpdate: Partial<FormValuesVendor> = {};
        for (const key in initialValues) {
          if (initialValues[key] !== values[key]) {
            requestPayloadUpdate[key] = values[key];
          }
        }

        const requestPayload = VendorModel.parseBodyToRequestUpdate(
          requestPayloadUpdate,
          mediaParsed,
          status
        );
        const response = await vendorServices.updateVendor({
          body: requestPayload as RequestCreateVendor,
          id: Number(vendor?.id),
        });

        if (response.status === 200 || response.status === 201) {
          refetchListVendor && (await refetchListVendor());
          showSuccess(t('Vendor.editVendorSuccessfully'));
        }

        toggle();
        return;
      }
      const mediaParsed = await TourModel.uploadMedia(media || []);
      const parsedBody = VendorModel.parseBodyToRequestAdd(values, mediaParsed);
      const response = await vendorServices.createVendor(parsedBody);

      if (response.status === 200 || response.status === 201) {
        refetchListVendor && (await refetchListVendor());
        showSuccess(t('Vendor.createVendorSuccessfully'));
      }

      toggle();
    } catch (error) {
      showError(error);
    } finally {
      helpersFormik.setSubmitting(false);
    }
  };
  if (loadingDetailVendor) {
    return <CommonStyles.Loading />;
  }
  //! Render
  return (
    <CommonStyles.Box sx={{ flex: '1' }}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur
        validateOnChange
        onSubmit={onSubmit}
      >
        {(props) => {
          return (
            <Form>
              <CommonStyles.Box>
                <WrapperGeneral vendor={vendor} />
                <ServeTime isEdit={isEdit} />
                <Price />
                <MediaVendor isEdit={isEdit} />
                <ToTalSlot />
                <RentedATable />
                {/* <CommonStyles.FormikDebug /> */}
              </CommonStyles.Box>
              <CommonStyles.FormikDebug />
            </Form>
          );
        }}
      </Formik>
    </CommonStyles.Box>
  );
}
