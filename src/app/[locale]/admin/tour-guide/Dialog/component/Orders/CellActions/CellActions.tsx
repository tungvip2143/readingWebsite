import CommonStyles from 'components/CommonStyles';
import useToggleDialog from 'hooks/useToggleDialog';
import React from 'react';
import DialogConfirm from 'components/DialogConfirm';
import { useTranslations } from 'next-intl';
import { TourGuide } from 'modules/tour-guide/tour-guide.interface';
import CommonIcons from 'components/CommonIcons';
import { useTheme } from '@mui/material';

interface ICellActions {
  tourGuide: any;
}

const CellActions = (props: ICellActions) => {
  //! State
  const t = useTranslations();
  const theme = useTheme();
  const { tourGuide } = props;

  const {
    shouldRender: shouldRenderDelete,
    open: openDelete,
    toggle: toggleDelete,
  } = useToggleDialog();

  //! Function

  const handleDelete = () => {
    toggleDelete();
  };

  //! Render
  return (
    <>
      {shouldRenderDelete && (
        <DialogConfirm
          open={openDelete}
          toggle={toggleDelete}
          title={t('Tour.dialogDeleteTitle')}
          content={t('Tour.dialogDeleteContent')}
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
          <CommonIcons.EditIcon onClick={toggleDelete} sx={{ color: theme.colors?.primary500 }} />
        </CommonStyles.Box>
      </CommonStyles.Box>
    </>
  );
};

export default CellActions;
