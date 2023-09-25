import CommonStyles from 'components/CommonStyles';
import React from 'react';
import { useTheme } from '@mui/material';
import { useFormikContext } from 'formik';
import { useTranslations } from 'next-intl';
import { useGet } from 'stores/useStore';
import cachedKeys from 'constants/cachedKeys';
import { BannerStatus } from 'constants/common';
import useToggleDialog from 'hooks/useToggleDialog';
import { showError, showSuccess } from 'helpers/toast';
import DialogConfirm from 'components/DialogConfirm';
import { isEmpty } from 'lodash';
import { convertToDate } from 'helpers/common';
import { RequestDeleteHotDeal } from 'modules/hotDeal/hotDeal.interface';
import { FormValuesHotDeal } from '../../Content';
import { HotDeal } from 'modules/hotDeal/hotDeal.interface';
import hotDealServices from 'modules/hotDeal/hotDeal.services';

interface ActionsProps {
  hotDeal?: HotDeal;
}

const Actions = (props: ActionsProps) => {
  //! State
  const { hotDeal } = props;
  const isEdit = !isEmpty(hotDeal);
  const theme = useTheme();
  const t = useTranslations();
  const { handleSubmit, resetForm, setFieldValue, isSubmitting, values } =
    useFormikContext<FormValuesHotDeal>();

  const {
    shouldRender: shouldRenderDelete,
    open: openDelete,
    toggle: toggleDelete,
  } = useToggleDialog();

  const refetchListHotDeal = useGet(cachedKeys.refetchListHotDeal);

  //! Function
  const handleSaveAsDraft = () => {
    setFieldValue('status', BannerStatus.DRAFT);
    handleSubmit();
  };
  const handlePublish = () => {
    setFieldValue('status', BannerStatus.PUBLISH);
    handleSubmit();
  };

  const handleDelete = async () => {
    try {
      const response = await hotDealServices.deleteHotDeal(
        hotDeal?.id as unknown as RequestDeleteHotDeal
      );
      //! After delete successfully;
      if (response.status === 200 || response.status === 201) {
        refetchListHotDeal && (await refetchListHotDeal());
        showSuccess(t('HotDeal.deleteHotDealSuccessfully'));
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
          title={t('HotDeal.dialogDeleteTitle')}
          content={t('HotDeal.dialogDeleteContent')}
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
              {t('HotDeal.status')}
            </CommonStyles.Typography>
            {isEdit ? (
              <CommonStyles.Badge
                label={hotDeal.status}
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
              {isEdit ? convertToDate(hotDeal?.createdAt ?? '') : '-----'}
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
              loading={values.status === BannerStatus.DRAFT && isSubmitting}
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
              onClick={() => handlePublish()}
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
