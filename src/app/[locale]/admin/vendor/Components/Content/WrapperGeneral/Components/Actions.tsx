import CommonStyles from 'components/CommonStyles';
import React from 'react';
import { useTheme } from '@mui/material';
import { useFormikContext } from 'formik';
import { useTranslations } from 'next-intl';
import { AllQueryKeys, useGet } from 'stores/useStore';
import cachedKeys from 'constants/cachedKeys';
import { VendorStatus } from 'constants/common';
import useToggleDialog from 'hooks/useToggleDialog';
import { showError, showSuccess } from 'helpers/toast';
import DialogConfirm from 'components/DialogConfirm';
import { isEmpty } from 'lodash';
import { FormValuesVendor } from '../../../Content';
import { convertToDate } from 'helpers/common';
import { RequestDeleteVendor, Vendor } from 'modules/vendor/vendor.interface';
import vendorServices from 'modules/vendor/vendor.services';

interface ActionsProps {
  vendor?: Vendor;
}

const Actions = (props: ActionsProps) => {
  //! State
  const { vendor } = props;
  const isEdit = !isEmpty(vendor);
  const theme = useTheme();
  const t = useTranslations();
  const { handleSubmit, resetForm, setFieldValue, isSubmitting, values } =
    useFormikContext<FormValuesVendor>();

  const {
    shouldRender: shouldRenderDelete,
    open: openDelete,
    toggle: toggleDelete,
  } = useToggleDialog();

  const refetchListVendor = useGet(cachedKeys.refetchListVendor as AllQueryKeys);

  //! Function
  const handleSaveAsDraft = () => {
    setFieldValue('status', VendorStatus.DRAFT);
    handleSubmit();
  };

  const handleDelete = async () => {
    try {
      const response = await vendorServices.deleteVendor(
        vendor?.id as unknown as RequestDeleteVendor
      );
      //! After delete successfully;
      if (response.status === 200 || response.status === 201) {
        refetchListVendor && (await refetchListVendor());
        showSuccess(t('Vendor.deleteVendorSuccessfully'));
        toggleDelete();
      }
    } catch (error) {
      showError(error);
    }
  };

  //! Render
  return (
    <>
      {shouldRenderDelete && (
        <DialogConfirm
          open={openDelete}
          toggle={toggleDelete}
          title={t('Vendor.dialogDeleteTitle')}
          content={t('Vendor.dialogDeleteContent')}
          footer={
            <>
              <CommonStyles.Button
                variant='text'
                onClick={toggleDelete}
                sx={{ marginRight: '0.625rem' }}
              >
                {t('Common.cancel')}
              </CommonStyles.Button>
              <CommonStyles.Button type='button' onClick={handleDelete}>
                {t('Common.ok')}
              </CommonStyles.Button>
            </>
          }
        />
      )}

      <CommonStyles.Box
        sx={{
          width: '25%',
          padding: '2rem 1rem',
          border: `0.0625rem solid ${theme.colors?.bgneutral200}`,
          borderRadius: '0.25rem',
        }}
      >
        <CommonStyles.Typography
          variant='h2'
          sx={{
            fontSize: '1.125rem',
            color: theme.colors?.custom?.textGrey,
            fontWeight: 500,
            marginBottom: '1rem',
          }}
        >
          {t('Tour.publish')}
        </CommonStyles.Typography>

        <CommonStyles.Box
          sx={{
            marginBottom: '2rem',
          }}
        >
          <CommonStyles.Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
            }}
          >
            <CommonStyles.Typography
              variant='h4'
              sx={{ fontSize: '0.875rem', color: theme.colors?.custom?.textGreyDark }}
            >
              {t('Vendor.status')}
            </CommonStyles.Typography>
            {isEdit ? (
              <CommonStyles.Badge
                label={vendor.status}
                category='purple'
                sx={{ fontSize: '0.75rem', borderRadius: '0.875rem', padding: '0.375rem 0.5rem' }}
              />
            ) : (
              <CommonStyles.Box
                sx={{
                  fontSize: '0.875rem',
                  color: theme.colors?.custom?.textBlack,
                  fontWeight: 'bold',
                }}
              >
                -----
              </CommonStyles.Box>
            )}
          </CommonStyles.Box>

          <CommonStyles.Box
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <CommonStyles.Typography
              variant='h4'
              sx={{ fontSize: '0.875rem', color: theme.colors?.custom?.textGreyDark }}
            >
              {t('Tour.publish')}
            </CommonStyles.Typography>
            <CommonStyles.Typography
              variant='h4'
              sx={{
                fontSize: '0.875rem',
                color: theme.colors?.custom?.textBlack,
                fontWeight: 'bold',
              }}
            >
              {isEdit
                ? vendor?.status === VendorStatus.OPEN
                  ? convertToDate(vendor?.createdAt ?? '')
                  : '-----'
                : '-----'}
            </CommonStyles.Typography>
          </CommonStyles.Box>
        </CommonStyles.Box>

        <CommonStyles.Box>
          <CommonStyles.Box sx={{ width: '100%', marginBottom: '1rem' }}>
            <CommonStyles.Button
              sx={{
                width: '100%',
                color: theme.colors?.bgneutral600,
                backgroundColor: theme.colors?.bgneutral200,
                fontSize: '0.875rem',
                '&:hover': {
                  backgroundColor: theme.colors?.bgneutral200,
                  opacity: 0.6,
                },
              }}
            >
              {t('Tour.preview')}
            </CommonStyles.Button>
          </CommonStyles.Box>

          <CommonStyles.Box sx={{ width: '100%', marginBottom: '1rem' }}>
            <CommonStyles.Button
              sx={{
                width: '100%',
                fontSize: '0.875rem',
                color: theme.colors?.primary700,
                backgroundColor: theme.colors?.primary150,
                '&:hover': {
                  backgroundColor: theme.colors?.primary150,
                  opacity: 0.6,
                },
              }}
              loading={values.status === VendorStatus.DRAFT && isSubmitting}
              onClick={() => handleSaveAsDraft()}
            >
              {t('Tour.saveAsDraft')}
            </CommonStyles.Button>
          </CommonStyles.Box>

          <CommonStyles.Box sx={{ width: '100%', marginBottom: '1rem' }}>
            <CommonStyles.Button
              sx={{
                fontSize: '0.875rem',
                color: theme.colors?.white,
                backgroundColor: theme.colors?.primary500,
                width: '100%',
                '&:hover': {
                  backgroundColor: theme.colors?.primary500,
                  opacity: 0.6,
                },
              }}
              loading={isSubmitting}
              type='submit'
            >
              {t('Tour.publish')}
            </CommonStyles.Button>
          </CommonStyles.Box>

          <CommonStyles.Box sx={{ width: '100%' }}>
            <CommonStyles.Button
              sx={{
                fontSize: '0.875rem',
                color: theme.colors?.white,
                backgroundColor: theme.colors?.orange500,
                width: '100%',
                '&:hover': {
                  backgroundColor: theme.colors?.orange500,
                  opacity: 0.6,
                },
              }}
              onClick={isEdit ? toggleDelete : () => resetForm()}
            >
              {isEdit ? t('Tour.delete') : t('Common.reset')}
            </CommonStyles.Button>
          </CommonStyles.Box>
        </CommonStyles.Box>
      </CommonStyles.Box>
    </>
  );
};

export default React.memo(Actions);
