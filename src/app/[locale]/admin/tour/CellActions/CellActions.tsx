import CommonStyles from 'components/CommonStyles';
import useToggleDialog from 'hooks/useToggleDialog';
import React from 'react';
import DialogCreateTour from '../Dialog/DialogCreateTour';
import DialogConfirm from 'components/DialogConfirm';
import { useTranslations } from 'next-intl';
import { RequestDeleteTour, Tour } from 'modules/tour/tour.interface';
import CommonIcons from 'components/CommonIcons';
import { useTheme } from '@mui/material';
import tourServices from 'modules/tour/tour.services';
import { showError, showSuccess } from 'helpers/toast';
import { AllQueryKeys, useGet } from 'stores/useStore';
import cachedKeys from 'constants/cachedKeys';
import DialogAcceptTourGuide from '../Dialog/DialogShowTourguide';
import DialogShowService from '../Dialog/DialogShowService';
import DialogShowTourGuide from '../Dialog/DialogShowTourguide';

interface ICellActions {
  tour: Tour;
}

const CellActions = (props: ICellActions) => {
  //! State
  const t = useTranslations();
  const theme = useTheme();
  const { tour } = props;
  const refetchListTour = useGet(cachedKeys.refetchListTour as AllQueryKeys);

  const { shouldRender: shouldRenderEdit, open: openEdit, toggle: toggleEdit } = useToggleDialog();
  const {
    shouldRender: shouldRenderDelete,
    open: openDelete,
    toggle: toggleDelete,
  } = useToggleDialog();

  const {
    shouldRender: shouldRenderShowTourguides,
    open: openShowTourguides,
    toggle: toggleShowTourguides,
  } = useToggleDialog();

  const {
    shouldRender: shouldRenderShowService,
    open: openShowService,
    toggle: toggleShowService,
  } = useToggleDialog();

  //! Function
  const handleEdit = () => {
    toggleEdit();
  };

  const handleDelete = async () => {
    try {
      const response = await tourServices.deleteTour(tour?.id as unknown as RequestDeleteTour);
      //! After delete successfully;
      refetchListTour && (await refetchListTour());
      showSuccess(t('Tour.deleteTourSuccessfully'));
      toggleDelete();
    } catch (error) {
      showError(error);
    }
  };

  //! Render
  return (
    <>
      {shouldRenderEdit && <DialogCreateTour isOpen={openEdit} toggle={toggleEdit} tour={tour} />}
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

      {shouldRenderShowTourguides && (
        <DialogShowTourGuide
          isOpen={openShowTourguides}
          toggle={toggleShowTourguides}
          tour={tour}
        />
      )}

      {shouldRenderShowService && (
        <DialogShowService isOpen={openShowService} toggle={toggleShowService} tour={tour} />
      )}

      <CommonStyles.Box sx={{ display: 'flex', gap: 1 }}>
        <CommonStyles.Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '0.5rem 0.75rem',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: theme.colors?.custom?.greyBackground,
              borderRadius: '0.625rem',
            },
          }}
        >
          <CommonIcons.EditIcon onClick={handleEdit} sx={{ color: theme.colors?.success450 }} />
        </CommonStyles.Box>
        <CommonStyles.Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '0.5rem 0.75rem',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: theme.colors?.custom?.greyBackground,
              borderRadius: '0.625rem',
            },
          }}
        >
          <CommonIcons.DeleteIcon onClick={toggleDelete} sx={{ color: theme.colors?.red500 }} />
        </CommonStyles.Box>

        <CommonStyles.Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '0.5rem 0.75rem',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: theme.colors?.custom?.greyBackground,
              borderRadius: '0.625rem',
            },
          }}
        >
          <CommonIcons.PeopleIcon
            onClick={toggleShowTourguides}
            sx={{ color: theme?.colors?.secondary500 }}
          />
        </CommonStyles.Box>

        <CommonStyles.Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '0.5rem 0.75rem',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: theme.colors?.custom?.greyBackground,
              borderRadius: '0.625rem',
            },
          }}
        >
          <CommonIcons.AddBoxIcon
            onClick={toggleShowService}
            sx={{ color: theme.colors?.primary500 }}
          />
        </CommonStyles.Box>
      </CommonStyles.Box>
    </>
  );
};

export default CellActions;
