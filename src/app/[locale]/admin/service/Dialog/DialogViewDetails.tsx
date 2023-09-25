import React, { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { FastField, Form, Formik, FormikHelpers } from 'formik';
import { useTheme } from '@mui/material';
import * as Yup from 'yup';

import CommonStyles from 'components/CommonStyles';
import CustomFields from 'components/CustomFields';
import { PHONE_REGEX } from 'constants/common';
import useGetDetailService from 'modules/service/hooks/useGetDetailService';
import { Product } from 'modules/service/service.interface';
import { showError, showSuccess } from 'helpers/toast';

interface IProps {
  isOpen: boolean;
  toggle: () => void;
  data?: Product;
}

interface FormValuesService {
  name: string;
  serviceType: string;
  paymentMethods: string;
  location: string;
  phoneNumber: string;
  email: string;
}

const DialogViewDetails = (props: IProps) => {
  //! State
  const t = useTranslations();
  const theme = useTheme();
  const { isOpen, toggle, data } = props;
  const isEdit = !!data;
  const { data: dataDetail, isLoading: loadingDetail } = useGetDetailService(
    data?.id || '',
    isEdit
  );

  const initialValues: FormValuesService = useMemo(() => {
    return {
      name: dataDetail?.brand || '',
      serviceType: '',
      paymentMethods: '',
      location: dataDetail?.brand || '',
      phoneNumber: '',
      email: '',
    };
  }, [dataDetail]);

  //! Function
  const renderContent = () => {
    const onSubmit = (values: FormValuesService, propsFormik: FormikHelpers<FormValuesService>) => {
      (async () => {
        const { setSubmitting } = propsFormik;
        const { email, name } = values;
        try {
          setSubmitting(true);
          showSuccess('Success');
          toggle();
        } catch (error) {
          showError(error);
        } finally {
          setSubmitting(false);
        }
      })();
    };

    return (
      <Formik
        enableReinitialize={isEdit}
        validationSchema={Yup.object().shape({
          name: Yup.string().required(t('Validation.empty', { name: t(`Service.nameLabel`) })),
          serviceType: Yup.string().required(
            t('Validation.empty', { name: t(`Service.serviceTypeLabel`) })
          ),
          paymentMethods: Yup.string().required(
            t('Validation.empty', { name: t(`Service.paymentMethodsLabel`) })
          ),
          location: Yup.string().required(
            t('Validation.empty', { name: t(`Service.locationLabel`) })
          ),
          phoneNumber: Yup.string()
            .required(t('Validation.empty', { name: t(`Service.phoneNumberLabel`) }))
            .matches(PHONE_REGEX, t('Validation.validPhone')),
          email: Yup.string()
            .required(t('Validation.empty', { name: t(`Service.emailLabel`) }))
            .email(t('Validation.emailFormat')),
        })}
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {(propsFormik) => (
          <Form onSubmit={propsFormik.handleSubmit}>
            <CommonStyles.Box
              sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 2 }}
            >
              <CommonStyles.Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: 2,
                  mt: 1,
                }}
              >
                <FastField
                  component={CustomFields.TextField}
                  name='name'
                  variant='outlined'
                  label={t('Service.nameLabel')}
                  sx={{ width: '100%' }}
                  size='small'
                />
              </CommonStyles.Box>

              <CommonStyles.Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'rơư',
                  gap: 2,
                }}
              >
                <FastField
                  component={CustomFields.SelectField}
                  name='serviceType'
                  label={t('Service.serviceTypeLabel')}
                  options={[
                    {
                      label: 'Nhà Hàng',
                      value: 1,
                    },
                    {
                      label: 'Vui Chơi',
                      value: 2,
                    },
                  ]}
                  fullWidth
                  sxContainer={{ width: '100%' }}
                  size='small'
                />
                <FastField
                  component={CustomFields.SelectField}
                  name='paymentMethods'
                  label={t('Service.paymentMethodsLabel')}
                  options={[
                    {
                      label: 'Tiền mặt',
                      value: 1,
                    },
                    {
                      label: 'Chuyển tiền',
                      value: 2,
                    },
                    {
                      label: 'Bộ đội trả góp',
                      value: 3,
                    },
                  ]}
                  fullWidth
                  sxContainer={{ width: '100%' }}
                  size='small'
                />
              </CommonStyles.Box>

              <CommonStyles.Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                <FastField
                  component={CustomFields.TextField}
                  name='location'
                  variant='outlined'
                  label={t('Service.locationLabel')}
                  sx={{ width: '100%' }}
                  size='small'
                />
              </CommonStyles.Box>

              <CommonStyles.Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  gap: 2,
                }}
              >
                <FastField
                  component={CustomFields.TextField}
                  name='phoneNumber'
                  variant='outlined'
                  label={t('Service.phoneNumberLabel')}
                  sx={{ width: '100%' }}
                  size='small'
                />
                <FastField
                  component={CustomFields.TextField}
                  name='email'
                  variant='outlined'
                  label={t('Service.emailLabel')}
                  sx={{ width: '100%' }}
                  size='small'
                />
              </CommonStyles.Box>

              <CommonStyles.Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <CommonStyles.Button
                  variant='outlined'
                  sx={{
                    color: theme.colors?.danger450,
                    border: `1px solid ${theme.colors?.danger500}`,
                    [`:hover`]: { border: `1px solid ${theme.colors?.danger500}` },
                  }}
                  onClick={toggle}
                >
                  {t('Service.closeBtn')}
                </CommonStyles.Button>

                <CommonStyles.Button
                  type='submit'
                  sx={{
                    background: theme.colors?.primary500,
                    [`:hover`]: { background: theme.colors?.primary650 },
                  }}
                >
                  {isEdit ? t('Service.updateBtn') : t('Service.addBtn')}
                </CommonStyles.Button>
              </CommonStyles.Box>
            </CommonStyles.Box>
          </Form>
        )}
      </Formik>
    );
  };

  //! Render
  return (
    <CommonStyles.Dialog
      title={isEdit ? t('Service.editHeading') : t('Service.addHeading')}
      content={renderContent()}
      open={isOpen}
      toggle={toggle}
      disableClickOutside={false}
      maxWidth={'sm'}
    />
  );
};

export default React.memo(DialogViewDetails);
