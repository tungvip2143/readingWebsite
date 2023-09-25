import CommonStyles from 'components/CommonStyles';
import useToggleDialog from 'hooks/useToggleDialog';
import React, { useState } from 'react';
import DialogConfirm from 'components/DialogConfirm';
import { useTranslations } from 'next-intl';
import { ListItem, ListItemButton, useTheme } from '@mui/material';
// import DialogViewDetails from '../Dialog/DialogViewDetails';
import cachedKeys from 'constants/cachedKeys';
import { useGet } from 'stores/useStore';
import { showError, showSuccess } from 'helpers/toast';
import { useRouter } from 'next/navigation';
import pageUrls from 'constants/pageUrls';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { StatusReservationVendor, StatusReservationVendorPayment } from 'constants/common';
import queryString from 'query-string';
import {
  RequestConfirmReservationVendor,
  ReservationVendor,
} from 'modules/reservationVendor/reservationVendor.interface';
import CommonIcons from 'components/CommonIcons';
import ReservationVendorServices from 'modules/reservationVendor/reservationVendor.services';
import DialogReviewVendor from '../Dialog/DialogReviewVendor';

interface ICellActions {
  myBookingVendor: ReservationVendor;
}

const CellActions = (props: ICellActions) => {
  //! State
  const t = useTranslations();
  const theme = useTheme();
  const router = useRouter();
  const { myBookingVendor } = props;
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

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const refetchListReservationVendor = useGet(cachedKeys.refetchListReservationVendor);

  const isSuccessfully = myBookingVendor?.status === StatusReservationVendor.SUCCESSFULLY;
  const isPending = myBookingVendor?.status === StatusReservationVendor.PENDING;
  const isWaitingCheckIn = myBookingVendor?.status === StatusReservationVendor.WAIT_FOR_CHECK_IN;
  const isCheckIn = myBookingVendor?.status === StatusReservationVendor.CHECKED_IN;
  const isMatched = myBookingVendor?.status === StatusReservationVendor.MATCHED;
  const isCanceled = myBookingVendor?.status === StatusReservationVendor.CANCELED;

  //Payemnt
  const isPaymentSuccess =
    myBookingVendor?.ReservationTransaction?.status === StatusReservationVendorPayment.SUCCESSFULLY;
  const isRefund =
    myBookingVendor?.ReservationTransaction?.status === StatusReservationVendorPayment.REFUND;
  //! Function
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (item?: ReservationVendor) => {
    if (isPending) {
      return router.push(
        `${pageUrls.WaitingAcceptBook}?${queryString.stringify({ vendorBookingId: item?.id })}`
      );
    }
    if (isMatched) {
      return router.push(
        `${pageUrls.WaitingAcceptBook}?${queryString.stringify({ vendorBookingId: item?.id })}`
      );
    }
    if (isSuccessfully) {
      toggleReview();
      return;
    }
    return null;
  };

  const renderContentButton = () => {
    if (isPending) {
      return (
        <ListItemButton onClick={() => handleNavigate(myBookingVendor)}>
          {t('MyBookingPlace.WaitAccept')}
        </ListItemButton>
      );
    }
    if (isMatched && !isPaymentSuccess) {
      return (
        <ListItemButton onClick={() => handleNavigate(myBookingVendor)}>
          {t('MyBookingPlace.payment')}
        </ListItemButton>
      );
    }
    // customer cancel and got refund
    if (isCanceled && isRefund) {
      return (
        <ListItemButton onClick={() => handleNavigate(myBookingVendor)}>
          {t('MyBookingPlace.refund')}
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

  const handleDelete = async () => {
    try {
      const response = await ReservationVendorServices.cancelReservationVendor(
        Number(myBookingVendor?.id) as unknown as RequestConfirmReservationVendor
      );
      if (response.status === 200 || response.status === 201) {
        showSuccess(t('Common.success'));
        toggleDelete();
        handleClose();
        await refetchListReservationVendor();
      }
    } catch (error) {
      showError(error);
    }
  };

  const renderThreedotAction = () => {
    if (isCanceled) {
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
        <DialogReviewVendor
          open={openReview}
          myBookingVendor={myBookingVendor}
          toggle={toggleReview}
        />
      )}
      {shouldRenderDelete && (
        <DialogConfirm
          open={openDelete}
          toggle={toggleDelete}
          title={t('MyBookingPlace.dialogDeleteTitle')}
          content={t('MyBookingPlace.dialogDeleteContent')}
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
          <ListItemButton onClick={toggleDelete}>{t('MyBookingPlace.cancel')}</ListItemButton>
        </ListItem>
      </CommonStyles.PopoverMui>
    </>
  );
};

export default CellActions;
