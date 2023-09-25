import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import CommonStyles from 'components/CommonStyles';
import WrapperGeneral from './WrapperGeneral/WrapperGeneral';
import Banner from './Banner/Banner';
import Links from './Links/Links';
import Time from './Time/Time';
import { HotDeal, RequestCreateHotDeal } from 'modules/hotDeal/hotDeal.interface';
import { BannerStatus, BannerType } from 'constants/common';
import HotDealrModel from 'models/hotDeal.model';
import hotDealServices from 'modules/hotDeal/hotDeal.services';
import tourGuideServices from 'modules/tourGuide/tourGuide.services';
import { useGet } from 'stores/useStore';
import cachedKeys from 'constants/cachedKeys';
import { showError, showSuccess } from 'helpers/toast';
import { useTranslations } from 'next-intl';
import { isEmpty, isObject } from 'lodash';
import useGetDetailHotDeal from 'modules/hotDeal/hooks/useGetDetailHotDeal';
import CommonStylesClient from 'components/Client/CommonStylesClient';

interface ContentAddHotDeal {
  hotDeal?: HotDeal;
  toggle: () => void;
}

export interface FormValuesHotDeal {
  name?: string;
  bannerType?: BannerType;
  bannerId?: string;
  description?: string;
  bannerUrl?: string;
  from?: string;
  to?: string;
  deepLinkApp?: string;
  webLink?: string;
  status?: BannerStatus;
  [key: string]: string | BannerType | undefined | BannerStatus;
}

export default function Content(props: ContentAddHotDeal) {
  //! State
  const { hotDeal, toggle } = props;
  const t = useTranslations();
  const refetchListHotDeal = useGet(cachedKeys.refetchListHotDeal);
  const isEdit = !isEmpty(hotDeal);

  const { data: dataDetailVendor, isLoading } = useGetDetailHotDeal(
    Number(hotDeal?.id),
    !!hotDeal?.id
  );

  const initialValues = HotDealrModel.parseInitialValues(dataDetailVendor?.data?.data);
  //! Function
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('Validation.empty', { name: t('HotDeal.name') })),
    bannerType: Yup.string().required(t('Validation.empty', { name: t('HotDeal.bannerType') })),
    bannerId: Yup.string().required(t('Validation.empty', { name: t('HotDeal.bannerId') })),
    description: Yup.string().required(t('Validation.empty', { name: t('HotDeal.description') })),
    bannerUrl: Yup.string().required(t('Validation.empty', { name: t('HotDeal.bannerUrl') })),
    from: Yup.date().required(t('Validation.empty', { name: t('HotDeal.startDate') })),
    to: Yup.date()
      .required(t('Validation.empty', { name: t('HotDeal.endDate') }))
      .test('from-to', t('HotDeal.compareToFrom'), function (to) {
        const from = this.parent.from;
        if (!from || !to) return true;
        return from <= to;
      }),
    deepLinkApp: Yup.string().required(t('Validation.empty', { name: t('HotDeal.deepLinkApp') })),
    webLink: Yup.string().required(t('Validation.empty', { name: t('HotDeal.webLink') })),
  });

  const onSubmit = async (
    values: FormValuesHotDeal,
    helpersFormik: FormikHelpers<FormValuesHotDeal>
  ) => {
    try {
      helpersFormik.setSubmitting(true);
      const fileBanner = values?.bannerUrl;
      let banner;
      if (!!fileBanner && isObject(fileBanner)) {
        const body = new FormData();
        body.append('file', fileBanner);
        const response = await tourGuideServices.uploadFile(body);
        banner = response.data?.data?.uri;
      }
      if (isEdit) {
        const requestPayloadUpdate: Partial<RequestCreateHotDeal> = {};
        for (const key in initialValues) {
          if (initialValues[key] !== values[key]) {
            requestPayloadUpdate[key] = values[key];
          }
        }
        const requestPayload: Partial<RequestCreateHotDeal> = {
          ...requestPayloadUpdate,
          bannerUrl: values?.bannerUrl !== banner ? banner : undefined,
        };

        const response = await hotDealServices.updateHotDeal({
          id: hotDeal?.id,
          body: requestPayload,
        });
        if (response.status === 200 || response.status === 201) {
          refetchListHotDeal && (await refetchListHotDeal());
          showSuccess(t('HotDeal.editHotDealSuccessfully'));
        }
        toggle();
        return;
      }

      const requestPayload = HotDealrModel.parseBodyToRequest(values, banner);
      const response = await hotDealServices.createHotDeal(requestPayload);

      if (response.status === 200 || response.status === 201) {
        refetchListHotDeal && (await refetchListHotDeal());
        showSuccess(t('HotDeal.createHotDealSuccessfully'));
      }
      toggle();
    } catch (error) {
      showError(error);
    } finally {
      helpersFormik.setSubmitting(false);
    }
  };
  if (isLoading) {
    return <CommonStylesClient.Loading />;
  }
  //! Render
  return (
    <CommonStyles.Box sx={{ flex: '1' }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur
        validateOnChange
        onSubmit={onSubmit}
        enableReinitialize
      >
        {(props) => {
          return (
            <Form>
              <CommonStyles.Box>
                <WrapperGeneral hotDeal={hotDeal} />
                <Banner />
                <Time />
                <Links />
              </CommonStyles.Box>
              <CommonStyles.FormikDebug />
            </Form>
          );
        }}
      </Formik>
    </CommonStyles.Box>
  );
}
