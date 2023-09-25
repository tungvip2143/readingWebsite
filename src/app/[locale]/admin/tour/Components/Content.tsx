import React, { useMemo } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import CommonStyles from 'components/CommonStyles';
import WrapperGeneral from './Content/WrapperGeneral/WrapperGeneral';
import Media from './Content/Media';
import Address from './Content/Address';
import Price from './Content/Price';
import Category from './Content/Category';
import {
  Category as CategoryI,
  RequestDetailTour,
  Schedules,
  Tour,
} from 'modules/tour/tour.interface';
import { cloneDeep, isEmpty } from 'lodash';
import tourServices from 'modules/tour/tour.services';
import useGetDetailTour from 'modules/tour/hooks/useGetDetailTour';
import { showError, showSuccess } from 'helpers/toast';
import { useTranslations } from 'next-intl';
import { AllQueryKeys, useGet } from 'stores/useStore';
import cachedKeys from 'constants/cachedKeys';
import { TourStatus, TypeFile } from 'constants/common';
import { TourCategory } from 'modules/tour-category/tour-category.interface';
import useGetListTourCategory from 'modules/tour-category/hooks/useGetListTourCategory';
import TourModel from 'models/tour.model';
import { Media as IMedia, SelectOption } from 'interfaces/common';
import useConstants from 'hooks/useConstants';
import NumberCustomer from './Content/NumberCustomer';

interface ContentAddTour {
  tour?: Tour;
  toggle: () => void;
}

export interface FormValuesTour {
  name?: string;
  language?: SelectOption[];
  description?: string;
  include?: string[] | null;
  exclude?: string[] | null;
  media?: IMedia[];
  areaId?: number | string;
  numberOfDays?: number;
  numberOfNights?: number;
  schedules?: Schedules[];
  priceForAdult?: number | null;
  priceForChildren?: number | null;
  defaultNumberCustomer?: number | null;
  allowApplyCoupon?: boolean;
  allowCancel?: boolean;
  allowCancelTime?: number;
  categories?: CategoryI[] | number[];
  status?: TourStatus;
  fixCost?: number;
  maxCustomer?: number;
  minCustomer?: number;
  [key: `category_${number}`]: boolean;
}

export default function Content(props: ContentAddTour) {
  //! State
  const t = useTranslations();
  const { tour, toggle } = props;
  const isEdit = !isEmpty(tour);

  const { optionsChangeLanguage } = useConstants();

  const {
    data: resDetailTour,
    isLoading,
    refetch: refetchDetailTour,
  } = useGetDetailTour(tour?.id as unknown as RequestDetailTour, !!tour?.id);

  const refetchListTour = useGet(cachedKeys.refetchListTour as AllQueryKeys);

  const { data: resTourCategory, isLoading: isLoadingTourCategory } = useGetListTourCategory();

  const convertedCategory = useMemo(() => {
    const nextTourCategory = cloneDeep(resTourCategory);

    return nextTourCategory.reduce(
      (
        acc: {
          [key: `category_${number}`]: boolean;
        },
        cur: TourCategory
      ) => {
        const foundCategory = (resDetailTour?.categories || [])?.find(
          (elm) => elm.categoryId === cur.id
        );
        if (foundCategory) {
          acc[`category_${cur.id}`] = true;
        } else {
          acc[`category_${cur.id}`] = false;
        }

        return acc;
      },
      {}
    );
  }, [resTourCategory, resDetailTour?.categories]);

  const parseLanguage = optionsChangeLanguage.filter((el) => {
    if (resDetailTour?.language?.includes(el.value)) {
      return el;
    }
  });

  const initialValues: FormValuesTour = {
    name: isEdit ? resDetailTour?.name : '',
    language: isEdit ? parseLanguage : [],
    description: isEdit ? resDetailTour?.description : '',
    include: isEdit ? resDetailTour?.include : [''],
    exclude: isEdit ? resDetailTour?.exclude : [''],
    media: isEdit
      ? resDetailTour?.Gallery?.[0]?.Media?.map((el, index) => ({ ...el, order: index }))
      : [],
    areaId: isEdit ? resDetailTour?.areaId : 'default',
    numberOfDays: isEdit ? resDetailTour?.numberOfDays : 0,
    numberOfNights: isEdit ? +((resDetailTour?.numberOfDays || 0) - 1) : 0,
    schedules: isEdit ? resDetailTour?.schedules : [{ title: '', description: '' }],
    priceForAdult: isEdit ? resDetailTour?.priceForAdult : 0,
    priceForChildren: isEdit ? resDetailTour?.priceForChildren : 0,
    allowApplyCoupon: isEdit ? resDetailTour?.allowApplyCoupon : false,
    allowCancel: isEdit ? resDetailTour?.allowCancel : false,
    allowCancelTime: isEdit ? resDetailTour?.allowCancelTime : 0,
    categories: isEdit ? resDetailTour?.categories : [],
    ...convertedCategory,
    status: TourStatus.PUBLISH,
    maxCustomer: isEdit ? resDetailTour?.maxCustomer : 0,
    minCustomer: isEdit ? resDetailTour?.minCustomer : 1,
    fixCost: isEdit ? resDetailTour?.fixCost : 0,
    defaultNumberCustomer: isEdit ? resDetailTour?.defaultNumberCustomer : 0,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('Validation.empty', { name: t('Tour.name') })),
    language: Yup.array()
      .min(1, t('Tour.needToSelectAtLeast1Language'))
      .required(t('Validation.empty', { name: t('Tour.language') })),
    description: Yup.string().required(t('Validation.empty', { name: t('Tour.description') })),
    areaId: Yup.number()
      .typeError(t('Validation.empty', { name: t('Tour.province') }))
      .required(t('Validation.empty', { name: t('Tour.province') })),
    priceForAdult: Yup.number()
      .typeError(t('Validation.mustBeANumberAndGreaterThan0', { name: t('Tour.priceForAdults') }))
      .test(
        'isNumberAndGreaterThan0',
        t('Validation.mustBeANumberAndGreaterThan0', { name: t('Tour.priceForAdults') }),
        function (value) {
          const nextValue = Number(value);
          if (nextValue < 0) {
            return false;
          }

          return true;
        }
      )
      .required(t('Validation.empty', { name: t('Tour.priceForAdults') })),
    priceForChildren: Yup.number()
      .typeError(t('Validation.mustBeANumberAndGreaterThan0', { name: t('Tour.priceForChildren') }))
      .test(
        'isNumberAndGreaterThan0',
        t('Validation.mustBeANumberAndGreaterThan0', { name: t('Tour.priceForChildren') }),
        function (value) {
          const nextValue = Number(value);
          if (nextValue < 0) {
            return false;
          }

          return true;
        }
      )
      .test(
        'priceForChildrenLessThanPriceForAdults',
        t('Tour.priceForChildrenLessThanPriceForAdult'),
        function (value) {
          const { priceForAdult } = this.parent;
          const priceForChildren = Number(value);
          if (priceForChildren > priceForAdult) {
            return false;
          }

          return true;
        }
      )
      .required(t('Validation.empty', { name: t('Tour.priceForChildren') })),
    allowApplyCoupon: Yup.boolean().required(
      t('Validation.empty', { name: t('Tour.allowApplyCoupon') })
    ),
    allowCancel: Yup.boolean().required(t('Validation.empty', { name: t('Tour.allowRefund') })),
    media: Yup.array()
      .of(
        Yup.object().test(
          'checkEmpty',
          t('Validation.empty', { name: t('Tour.imageAndDescription') }),
          function (value) {
            const { url, content } = value as IMedia;
            if (!url || !content) {
              return false;
            }
            return true;
          }
        )
      )
      .test('checkType', t('Tour.onlyOneVideoAllowed'), function (value) {
        const videoCount =
          value?.filter((item: IMedia) => item?.type === TypeFile.VIDEO).length || 0;

        // Check if there's exactly one "video" type in the array
        return videoCount <= 1;
      })
      .min(3, t('Tour.needUploadAtLeast3Pictures')),
    include: Yup.array().of(
      Yup.string().required(t('Validation.empty', { name: t('Tour.include') }))
    ),
    exclude: Yup.array().of(
      Yup.string().required(t('Validation.empty', { name: t('Tour.exclude') }))
    ),
    schedules: Yup.array()
      .of(
        Yup.object().shape({
          title: Yup.string().required(t('Validation.empty', { name: t('Tour.titleSchedules') })),
          description: Yup.string().required(
            t('Validation.empty', { name: t('Tour.descriptionSchedules') })
          ),
        })
      )
      .min(1, t('Validation.empty', { name: t('Tour.detailsOfServicesAndSchedules') })),
    numberOfDays: Yup.number()
      .typeError(t('Validation.mustBeANumberAndGreaterThan0', { name: t('Tour.duration') }))
      .test(
        'isNumberAndGreaterThan0',
        t('Validation.mustBeANumberGT0', { name: t('Tour.duration') }),
        function (value) {
          const nextValue = Number(value);
          if (nextValue <= 0) {
            return false;
          }

          return true;
        }
      )
      .required(t('Validation.empty', { name: t('Tour.duration') })),
    allowCancelTime: Yup.number()
      .typeError(
        t('Validation.mustBeANumberAndGreaterThan0', { name: t('Tour.timeAllowToCancel') })
      )
      .test(
        'isNumberAndGreaterThan0',
        t('Validation.mustBeANumberAndGreaterThan0', { name: t('Tour.timeAllowToCancel') }),
        function (value) {
          const nextValue = Number(value);
          if (nextValue < 0) {
            return false;
          }

          return true;
        }
      )
      .required(t('Validation.empty', { name: t('Tour.timeAllowToCancel') })),
    maxCustomer: Yup.number()
      .min(1)
      .required(t('Validation.empty', { name: t('Tour.maxCustomer') }))
      .test('is-greater', t('Tour.compareCustomer'), function (value) {
        const inputValueMinCustomer = this.parent.minCustomer;
        return value > inputValueMinCustomer;
      }),
    minCustomer: Yup.number()
      .min(1)
      .required(t('Validation.empty', { name: t('Tour.minCustomer') })),
    defaultNumberCustomer: Yup.number()
      .min(1)
      .required(t('Validation.empty', { name: t('Tour.defaultCustomer') })),
    fixCost: Yup.number()
      .min(1)
      .required(t('Validation.empty', { name: t('Tour.systemPrice') })),
  });

  //! Function
  const onSubmit = async (values: FormValuesTour, helpersFormik: FormikHelpers<FormValuesTour>) => {
    try {
      helpersFormik.setSubmitting(true);
      const { media } = values;
      const parsedBody = TourModel.parseBodyToRequest(values);

      if (parsedBody.categories?.length === 0) {
        showError(t('Tour.needToSelectAtLeast1Category'));
        return;
      }

      if (isEdit) {
        const mediaParsed = await TourModel.uploadMedia(media || []);

        await tourServices.editTour({
          id: Number(tour?.id),
          body: {
            ...parsedBody,
            media: mediaParsed || [],
          },
        });

        refetchDetailTour && (await refetchDetailTour());
        refetchListTour && refetchListTour();
        showSuccess(t('Tour.editTourSuccessfully'));
        return;
      }

      const mediaParsed = await TourModel.uploadMedia(media || []);
      await tourServices.createTour({
        ...parsedBody,
        media: mediaParsed,
      });

      refetchListTour && (await refetchListTour());
      showSuccess(t('Tour.createTourSuccessfully'));
      toggle();
    } catch (error) {
      showError(error);
    } finally {
      helpersFormik.setSubmitting(false);
    }
  };

  //! Render
  if (isLoading) {
    return (
      <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CommonStyles.Loading />
      </CommonStyles.Box>
    );
  }

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
                <WrapperGeneral tour={tour} />
                <Media isEdit={isEdit} />
                <Address />
                <NumberCustomer />
                <Price />
                <Category />
              </CommonStyles.Box>
              <CommonStyles.FormikDebug />
            </Form>
          );
        }}
      </Formik>
    </CommonStyles.Box>
  );
}
