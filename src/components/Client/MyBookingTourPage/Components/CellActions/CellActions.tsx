import CommonStyles from 'components/CommonStyles';
import useToggleDialog from 'hooks/useToggleDialog';
import React, { useState } from 'react';
import DialogConfirm from 'components/DialogConfirm';
import { useTranslations } from 'next-intl';
import CommonIcons from 'components/CommonIcons';
import { List, ListItem, ListItemButton, useTheme } from '@mui/material';
// import DialogViewDetails from '../Dialog/DialogViewDetails';
import cachedKeys from 'constants/cachedKeys';
import { useGet } from 'stores/useStore';
import { showError, showSuccess } from 'helpers/toast';
import { MyTourBooking } from 'modules/myTourBooking/myTourBooking.interface';
import MyTourBookingServices from 'modules/myTourBooking/myTourBooking.services';
import { useRouter } from 'next/navigation';
import pageUrls from 'constants/pageUrls';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { StatusMyBookingTour } from 'constants/common';
import queryString from 'query-string';
import DialogReviewTourOrTourguide from '../Dialog/DialogReviewTourOrTourguide';

interface ICellActions {
  myBookingTour: MyTourBooking;
}

const CellActions = (props: ICellActions) => {
  //! State
  const t = useTranslations();
  const theme = useTheme();
  const router = useRouter();
  const { myBookingTour } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const {
    shouldRender: shouldRenderDelete,
    open: openDelete,
    toggle: toggleDelete,
  } = useToggleDialog();

  const {
    shouldRender: shouldRenderReview,
    open: openReview,
    toggle: toggleReview,
  } = useToggleDialog();

  const refetchListMyBookingTour = useGet(cachedKeys.refetchListMyBookingTour);

  const isSuccessfully = myBookingTour?.status === StatusMyBookingTour.SUCCESSFULLY;
  const isMatched = myBookingTour?.status === StatusMyBookingTour.MATCHED;
  const isNew = myBookingTour?.status === StatusMyBookingTour.NEW;
  const isApplied = myBookingTour?.status === StatusMyBookingTour.APPLIED;
  const isExpiredCanceled = myBookingTour?.status === StatusMyBookingTour.EXPIRED_PAYMENT;
  const isCustomerCanceled = myBookingTour?.status === StatusMyBookingTour.CUSTOMER_CANCELED;
  const isTourGuideCanceled = myBookingTour?.status === StatusMyBookingTour.TOUR_GUIDE_CANCELED;

  //! Function
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      const response = await MyTourBookingServices.deleteMyTourBooking({ id: myBookingTour?.id });
      if (response.status === 200 || response.status === 201) {
        showSuccess(t('Common.success'));
        toggleDelete();
        handleClose();
        await refetchListMyBookingTour();
      }
    } catch (error) {
      showError(error);
    }
  };

  const handleNavigate = () => {
    if (isNew || isApplied) {
      return router.push(
        `${pageUrls.FindTourGuide}?${queryString.stringify({ tourId: myBookingTour?.id })}`
      );
    }
    if (isMatched) {
      return router.push(
        `${pageUrls.Payment}?${queryString.stringify({ tourId: myBookingTour?.id })}`
      );
    }
    if (isSuccessfully) {
      toggleReview();
      return;
    }
    return null;
  };

  const renderContentButton = () => {
    if (isNew || isApplied) {
      return (
        <ListItemButton onClick={() => handleNavigate()}>
          {t('MyBookingTour.findTourGuide')}
        </ListItemButton>
      );
    }
    if (isMatched) {
      return (
        <ListItemButton onClick={() => handleNavigate()}>
          {t('MyBookingTour.payment')}
        </ListItemButton>
      );
    }
    if (isSuccessfully) {
      return (
        <ListItemButton onClick={() => handleNavigate()}>
          {t('MyBookingTour.review')}
        </ListItemButton>
      );
    }
    return undefined;
  };

  const renderThreedotAction = () => {
    if (isExpiredCanceled || isCustomerCanceled || isTourGuideCanceled) {
      return undefined;
    }
    return (
      <CommonStylesClient.Button isIconButton onClick={handleOpen}>
        <CommonIcons.MoreVertIcon />
      </CommonStylesClient.Button>
    );
  };

  //! Render
  return (
    <>
      {shouldRenderReview && (
        <DialogReviewTourOrTourguide
          open={openReview}
          myBookingTour={myBookingTour}
          toggle={toggleReview}
        />
      )}
      {shouldRenderDelete && (
        <DialogConfirm
          open={openDelete}
          toggle={toggleDelete}
          title={t('MyBookingTour.dialogDeleteTitle')}
          content={t('MyBookingTour.dialogDeleteContent')}
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
      <CommonStylesClient.Button isIconButton onClick={handleOpen}>
        {renderThreedotAction()}
      </CommonStylesClient.Button>
      <CommonStyles.PopoverMui
        verticalTop
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
      >
        <ListItem disablePadding>{renderContentButton()}</ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={toggleDelete}>{t('MyBookingTour.cancel')}</ListItemButton>
        </ListItem>
      </CommonStyles.PopoverMui>
    </>
  );
};

export default CellActions;
