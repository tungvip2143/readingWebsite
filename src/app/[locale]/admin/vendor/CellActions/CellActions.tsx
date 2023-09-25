import CommonStyles from 'components/CommonStyles';
import useToggleDialog from 'hooks/useToggleDialog';
import React from 'react';
import { useTranslations } from 'next-intl';
import CommonIcons from 'components/CommonIcons';
import { useTheme } from '@mui/material';
import { RequestDeleteVendor, Vendor } from 'modules/vendor/vendor.interface';
import DialogCreateVendor from '../Dialog/DialogCreateVendor';
import vendorServices from 'modules/vendor/vendor.services';
import { AllQueryKeys, useGet } from 'stores/useStore';
import cachedKeys from 'constants/cachedKeys';
import { showError, showSuccess } from 'helpers/toast';
import DialogConfirm from 'components/DialogConfirm';

interface ICellActions {
  vendor: Vendor;
}

const CellActions = (props: ICellActions) => {
  //! State
  const t = useTranslations();
  const { vendor } = props;
  const theme = useTheme();

  const refetchListVendor = useGet(cachedKeys.refetchListVendor as AllQueryKeys);

  const {
    shouldRender: shouldRenderDetailDialog,
    open: openDetailsDialog,
    toggle: toggleDetailsDialog,
  } = useToggleDialog();

  const {
    shouldRender: shouldRenderDelete,
    open: openDelete,
    toggle: toggleDelete,
  } = useToggleDialog();
  //! Function
  const handleDelete = async () => {
    try {
      const response = await vendorServices.deleteVendor(
        vendor?.id as unknown as RequestDeleteVendor
      );
      //! After delete successfully;
      if (response && response.status === 200) {
        refetchListVendor && (await refetchListVendor());
        showSuccess(t('Vendor.deleteVendorSuccessfully'));
        toggleDelete();
      }
    } catch (error) {
      showError(error);
    }
  };

  const handleEdit = () => {
    toggleDetailsDialog();
  };

  //! Render
  return (
    <>
      {shouldRenderDetailDialog && (
        <DialogCreateVendor
          isOpen={openDetailsDialog}
          toggle={toggleDetailsDialog}
          vendor={vendor}
        />
      )}

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
      <CommonStyles.Box sx={{ display: 'flex', gap: 1 }}>
        <CommonStyles.Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '0.5rem 0.75rem',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.04)',
              borderRadius: '0.625rem',
            },
          }}
        >
          <CommonIcons.EditIcon onClick={handleEdit} sx={{ color: theme.colors?.primary500 }} />
        </CommonStyles.Box>
        <CommonStyles.Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '0.5rem 0.75rem',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.04)',
              borderRadius: '0.625rem',
            },
          }}
        >
          <CommonIcons.DeleteIcon onClick={toggleDelete} sx={{ color: theme.colors?.red500 }} />
        </CommonStyles.Box>
      </CommonStyles.Box>
    </>
  );
};

export default React.memo(CellActions);
