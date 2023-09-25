import React from 'react';
import CommonIcons from 'components/CommonIcons';
import {
  RequestConfirmReservationVendor,
  ReservationVendor,
} from 'modules/reservationVendor/reservationVendor.interface';
import useGetDetailReservationVendor from 'modules/reservationVendor/hooks/useGetDetailReservationVendor';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import { StatusReservationVendor } from 'constants/common';
import { IMG_URL } from 'constants/apiUrls';
import moment from 'moment';
import { convertToDate, localeNumber } from 'helpers/common';
import { showError, showSuccess } from 'helpers/toast';
import reservationVendorServices from 'modules/reservationVendor/reservationVendor.services';
import { AllQueryKeys, useGet } from 'stores/useStore';
import cachedKeys from 'constants/cachedKeys';
import useToggleDialog from 'hooks/useToggleDialog';
import DialogConfirm from 'components/DialogConfirm';
import AvatarDefault from '../../../../../public/images/avatarUser.png';

interface ContentConfirmOrderProps {
  itemOrder: ReservationVendor;
  toggle: () => void;
}

const ContentConfirmOrder = (props: ContentConfirmOrderProps) => {
  //! State
  const theme = useTheme();
  const t = useTranslations();
  const { itemOrder, toggle } = props;
  const {
    open: openCancel,
    toggle: toggleCancel,
    shouldRender: shouldRenderCancel,
  } = useToggleDialog();
  const { data: resOrderInformation, isLoading } = useGetDetailReservationVendor(
    itemOrder?.id,
    !!itemOrder?.id
  );
  const refetchListReservationVendor = useGet(
    cachedKeys.refetchListReservationVendorUIOrderList as AllQueryKeys
  );

  //! Function
  const renderStatusReservationVendor = (status: StatusReservationVendor) => {
    switch (status) {
      case StatusReservationVendor.PENDING:
        return (
          <CommonStylesClient.Box
            sx={{
              backgroundColor: theme.colors?.client.coBaltBlue,
              borderRadius: '3.125rem',
            }}
          >
            <CommonStylesClient.Typography
              sx={{
                padding: '0.25rem 1rem',
                color: theme.colors?.white,
              }}
              type='title12'
            >
              {t('Vendor.waitForConfirmation')}
            </CommonStylesClient.Typography>
          </CommonStylesClient.Box>
        );

      case StatusReservationVendor.MATCHED:
        return (
          <CommonStylesClient.Box
            sx={{
              backgroundColor: theme.colors?.bgemerald50,
              borderRadius: '3.125rem',
            }}
          >
            <CommonStylesClient.Typography
              sx={{
                padding: '0.25rem 1rem',
                color: theme.colors?.client.green,
              }}
              type='title12'
            >
              {t('Vendor.confirmed')}
            </CommonStylesClient.Typography>
          </CommonStylesClient.Box>
        );

      case StatusReservationVendor.WAIT_FOR_CHECK_IN:
        return (
          <CommonStylesClient.Box
            sx={{
              backgroundColor: theme.colors?.client.lightGray,
              borderRadius: '3.125rem',
            }}
          >
            <CommonStylesClient.Typography
              sx={{
                padding: '0.25rem 1rem',
                color: theme.colors?.client.black,
              }}
              type='title12'
            >
              {t('Vendor.guestsHaveNotArrivedYet')}
            </CommonStylesClient.Typography>
          </CommonStylesClient.Box>
        );

      case StatusReservationVendor.CHECKED_IN:
        return (
          <CommonStylesClient.Box
            sx={{
              backgroundColor: theme.colors?.bgemerald50,
              borderRadius: '3.125rem',
            }}
          >
            <CommonStylesClient.Typography
              sx={{
                padding: '0.25rem 1rem',
                color: theme.colors?.client.green,
              }}
              type='title12'
            >
              {t('Vendor.serving')}
            </CommonStylesClient.Typography>
          </CommonStylesClient.Box>
        );

      case StatusReservationVendor.SUCCESSFULLY:
        return (
          <CommonStylesClient.Box
            sx={{
              backgroundColor: theme.colors?.bgemerald50,
              borderRadius: '3.125rem',
            }}
          >
            <CommonStylesClient.Typography
              sx={{
                padding: '0.25rem 1rem',
                color: theme.colors?.client.green,
              }}
              type='title12'
            >
              {t('Vendor.successful')}
            </CommonStylesClient.Typography>
          </CommonStylesClient.Box>
        );

      case StatusReservationVendor.CANCELED:
        return (
          <CommonStylesClient.Box
            sx={{
              backgroundColor: theme.colors?.client.red,
              borderRadius: '3.125rem',
            }}
          >
            <CommonStylesClient.Typography
              sx={{
                padding: '0.25rem 1rem',
                color: theme.colors?.white,
              }}
              type='title12'
            >
              {t('Vendor.cancelled')}
            </CommonStylesClient.Typography>
          </CommonStylesClient.Box>
        );
      default:
        break;
    }
  };

  const handleAcceptReservationVendor = async () => {
    try {
      await reservationVendorServices.acceptReservationVendor(
        itemOrder?.id as unknown as RequestConfirmReservationVendor
      );
      refetchListReservationVendor && (await refetchListReservationVendor());
      showSuccess(t('Vendor.confirmOrderSuccessfully'));
      toggle();
    } catch (error) {
      showError(error);
    }
  };

  const handleCancelReservationVendor = async () => {
    try {
      await reservationVendorServices.cancelReservationVendor(
        itemOrder?.id as unknown as RequestConfirmReservationVendor
      );
      refetchListReservationVendor && (await refetchListReservationVendor());
      showSuccess(t('Vendor.cancelOrderSuccessfully'));
      toggleCancel();
    } catch (error) {
      showError(error);
    }
  };

  const formatTimeOrderItem = (itemOrder?: ReservationVendor) => {
    const timeOrderList = moment(itemOrder?.time).format('DD/MM/YYYY HH:mm');
    const datePresent = moment(new Date()).format('DD/MM/YYYY HH:mm');

    if (datePresent > timeOrderList) {
      return t('Vendor.checkInTimeIsOver');
    }
    return '';
  };

  const isShowCheckInTimeIsOver =
    resOrderInformation?.status !== StatusReservationVendor.SUCCESSFULLY &&
    !!formatTimeOrderItem(resOrderInformation);
  //! Render
  return (
    <>
      {shouldRenderCancel && (
        <DialogConfirm
          open={openCancel}
          toggle={toggleCancel}
          title={t('Vendor.titleCancelReservationVendor')}
          content={t('Vendor.contentCancelReservationVendor')}
          footer={
            <>
              <CommonStylesClient.Button
                variant='text'
                onClick={toggleCancel}
                sx={{ marginRight: '0.625rem' }}
              >
                {t('Common.cancel')}
              </CommonStylesClient.Button>
              <CommonStylesClient.Button type='button' onClick={handleCancelReservationVendor}>
                {t('Common.ok')}
              </CommonStylesClient.Button>
            </>
          }
        />
      )}
      <CommonStylesClient.Box>
        <CommonStylesClient.Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '1rem',
            gap: '1rem',
          }}
        >
          <CommonStylesClient.Box
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <CommonStylesClient.Box>
              <CommonStylesClient.Typography
                type='title14'
                sx={{ color: theme.colors?.client.black }}
              >
                {t('Vendor.id')}: #{resOrderInformation?.reservationUniqueId}
              </CommonStylesClient.Typography>
            </CommonStylesClient.Box>

            {renderStatusReservationVendor(resOrderInformation?.status as StatusReservationVendor)}
          </CommonStylesClient.Box>

          <CommonStylesClient.Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <CommonStylesClient.Typography
              type='title14'
              sx={{ color: theme.colors?.client.black }}
            >
              {t('Vendor.orderDate')}: {convertToDate(resOrderInformation?.time || '')}
            </CommonStylesClient.Typography>
            {isShowCheckInTimeIsOver && (
              <CommonStylesClient.Typography
                type='title14'
                sx={{ color: theme.colors?.client.red }}
              >
                {formatTimeOrderItem(resOrderInformation as ReservationVendor)}
              </CommonStylesClient.Typography>
            )}
          </CommonStylesClient.Box>

          <CommonStylesClient.Typography type='title14' sx={{ color: theme.colors?.client.black }}>
            {t('Vendor.numberOfPeople')}: {resOrderInformation?.totalCustomer}
          </CommonStylesClient.Typography>
          <CommonStylesClient.Typography type='title14' sx={{ color: theme.colors?.client.black }}>
            {t('TourBooking.totalPrice')}: {localeNumber(resOrderInformation?.totalPrice || 0)} VND
          </CommonStylesClient.Typography>

          <CommonStylesClient.Box
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <CommonStylesClient.Box
              sx={{ display: 'flex', gap: '2rem', alignItems: 'center', justifyContent: 'center' }}
            >
              <CommonStylesClient.Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <img
                  src={
                    resOrderInformation?.Customer.avatar
                      ? `${IMG_URL}/${resOrderInformation?.Customer.avatar}`
                      : `${AvatarDefault.src}`
                  }
                  alt='Order image'
                  style={{
                    width: '6.25rem',
                    height: '6.25rem',
                    objectFit: 'cover',
                    borderRadius: '5.625rem',
                  }}
                />
              </CommonStylesClient.Box>

              <CommonStylesClient.Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CommonStylesClient.Typography
                  type='mobiHeading4'
                  sx={{ color: theme.colors?.client.midBlack }}
                >
                  {itemOrder?.Customer?.firstName} {resOrderInformation?.Customer?.lastName}
                </CommonStylesClient.Typography>
                <CommonStylesClient.Typography type='title14'>
                  {t('Vendor.phoneNumber')}: {`0${resOrderInformation?.Customer?.phone}`}
                </CommonStylesClient.Typography>
              </CommonStylesClient.Box>
            </CommonStylesClient.Box>

            <CommonStylesClient.Box
              sx={{
                backgroundColor: theme.colors?.client.lightGray,
                display: 'flex',
                justifyContent: 'center',
                borderRadius: '1rem',
                padding: '0.75rem',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <CommonIcons.Messages />
            </CommonStylesClient.Box>
          </CommonStylesClient.Box>

          <CommonStylesClient.Box
            sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, marginTop: '2rem' }}
          >
            <CommonStylesClient.Button
              variant='contained'
              sx={{
                padding: '0.75rem 1.5rem',
                borderRadius: '0.75rem',
                border: `0.0625rem solid ${theme.colors?.client.coBaltBlue}`,
                backgroundColor: theme.colors?.white,
                color: theme.colors?.client.coBaltBlue,
                textTransform: 'none',
                boxShadow: 'none',
                letterSpacing: '0.04rem',
                '&.MuiLoadingButton-root:hover': {
                  backgroundColor: theme.colors?.white,
                  boxShadow: 'none',
                },
                '&.MuiLoadingButton-root.Mui-disabled': {
                  border: `0.0625rem solid ${theme.colors?.client.blackBoxShadowLight}`,
                },
              }}
              disabled={
                resOrderInformation?.status === StatusReservationVendor.PENDING ||
                resOrderInformation?.status === StatusReservationVendor.MATCHED ||
                resOrderInformation?.status === StatusReservationVendor.WAIT_FOR_CHECK_IN ||
                resOrderInformation?.status === StatusReservationVendor.CHECKED_IN
                  ? false
                  : true
              }
              onClick={handleAcceptReservationVendor}
            >
              {t('Common.confirm')}
            </CommonStylesClient.Button>
            <CommonStylesClient.Button
              variant='contained'
              sx={{
                padding: '0.75rem 1.5rem',
                borderRadius: '0.75rem',
                border: `0.0625rem solid ${theme.colors?.client.red}`,
                backgroundColor: theme.colors?.white,
                color: theme.colors?.client.red,
                textTransform: 'none',
                boxShadow: 'none',
                letterSpacing: '0.04rem',
                '&.MuiLoadingButton-root:hover': {
                  backgroundColor: theme.colors?.white,
                  boxShadow: 'none',
                },
                '&.MuiLoadingButton-root.Mui-disabled': {
                  border: `0.0625rem solid ${theme.colors?.client.blackBoxShadowLight}`,
                },
              }}
              disabled={
                resOrderInformation?.status === StatusReservationVendor.CANCELED ||
                resOrderInformation?.status === StatusReservationVendor.SUCCESSFULLY
                  ? true
                  : false
              }
              onClick={toggleCancel}
            >
              {t('Common.reject')}
            </CommonStylesClient.Button>
          </CommonStylesClient.Box>
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>
    </>
  );
};

export default React.memo(ContentConfirmOrder);
