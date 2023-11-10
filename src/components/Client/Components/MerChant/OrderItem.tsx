import React from 'react';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { useTranslations } from 'next-intl';
import { useTheme } from '@mui/material';
import CommonIcons from 'components/CommonIconsMui';
import moment from 'moment';
import { ReservationVendor } from 'modules/reservationVendor/reservationVendor.interface';
import { StatusReservationVendor } from 'constants/common';
import { IMG_URL } from 'constants/apiUrls';
import useToggleDialog from 'hooks/useToggleDialog';
import DialogConfirmOrder from './Dialog/DialogConfirmOrder';
import { showPhoneNumberByRegion } from 'helpers/common';
import { PhoneCode } from 'interfaces/common';
import AvatarDefault from '../../../../../public/images/avatarUser.png';
interface OrderItemProps {
  itemOrder: ReservationVendor;
}

const OrderItem = (props: OrderItemProps) => {
  //! State
  const t = useTranslations();
  const theme = useTheme();
  const { itemOrder } = props;
  const {
    open: openConfirmOrder,
    toggle: toggleConfirmOrder,
    shouldRender: shouldRenderConfirmOrder,
  } = useToggleDialog();

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

  const formatTimeOrderItem = (itemOrder: ReservationVendor) => {
    const timeOrderList = moment(itemOrder?.time).format('DD/MM/YYYY HH:mm');
    const datePresent = moment().format('DD/MM/YYYY HH:mm');

    if (datePresent > timeOrderList) {
      return t('Vendor.checkInTimeIsOver');
    }
    return '';
  };

  const isShowCheckInTimeIsOver =
    itemOrder?.status !== StatusReservationVendor.SUCCESSFULLY && !!formatTimeOrderItem(itemOrder);

  const formatDayOrderItem = (itemOrder: ReservationVendor) => {
    const timeOrderList = moment(itemOrder?.time).format('DD/MM/YYYY');
    const datePresent = moment(new Date()).format('DD/MM/YYYY');

    if (moment(timeOrderList, 'DD/MM/YYYY HH:mm').isSame(moment(datePresent, 'DD/MM/YYYY HH:mm'))) {
      return `${t('Vendor.todayAt')} ${moment(itemOrder?.time).format('HH:mm')}`;
    }
    return `${t('Vendor.day')} ${moment(itemOrder?.time).format('DD/MM/YYYY HH:mm')}`;
  };

  //! Render
  return (
    <>
      {shouldRenderConfirmOrder && (
        <DialogConfirmOrder
          isOpen={openConfirmOrder}
          toggle={toggleConfirmOrder}
          itemOrder={itemOrder}
        />
      )}
      <CommonStylesClient.Box
        sx={{
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '1rem',
          backgroundColor: theme.colors?.client.white,
          gap: '1rem',
          width: '31%',
        }}
        onClick={toggleConfirmOrder}
      >
        <CommonStylesClient.Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <CommonStylesClient.Box>
            <CommonStylesClient.Typography
              type='title14'
              sx={{ color: theme.colors?.client.black }}
            >
              {t('Vendor.id')}: #{itemOrder?.reservationUniqueId}
            </CommonStylesClient.Typography>
          </CommonStylesClient.Box>

          {renderStatusReservationVendor(itemOrder?.status)}
        </CommonStylesClient.Box>

        <CommonStylesClient.Box
          sx={{
            display: 'flex',
            gap: '0.75rem',
            flexDirection: isShowCheckInTimeIsOver ? 'column' : 'row',
          }}
        >
          <CommonStylesClient.Box
            sx={{
              display: 'flex',
              gap: '0.25rem',
              alignItems: 'center',
              justifyContent: isShowCheckInTimeIsOver ? 'space-between' : 'normal',
            }}
          >
            <CommonStylesClient.Box sx={{ display: 'flex', gap: '0.25rem' }}>
              <CommonIcons.Calendar />
              <CommonStylesClient.Typography
                type='title12'
                sx={{ color: theme.colors?.client.darkGray }}
              >
                {formatDayOrderItem(itemOrder)}
              </CommonStylesClient.Typography>
            </CommonStylesClient.Box>

            {isShowCheckInTimeIsOver && (
              <CommonStylesClient.Typography type='text10' sx={{ color: theme.colors?.client.red }}>
                {formatTimeOrderItem(itemOrder)}
              </CommonStylesClient.Typography>
            )}
          </CommonStylesClient.Box>

          <CommonStylesClient.Box sx={{ display: 'flex', gap: '0.25rem' }}>
            <CommonStylesClient.Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CommonIcons.ProfileCircle />
            </CommonStylesClient.Box>
            <CommonStylesClient.Typography
              type='title12'
              sx={{ color: theme.colors?.client.darkGray }}
            >
              {itemOrder?.totalCustomer} {t('Vendor.people')}
            </CommonStylesClient.Typography>
          </CommonStylesClient.Box>
        </CommonStylesClient.Box>

        <CommonStylesClient.Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <CommonStylesClient.Box
            sx={{ display: 'flex', gap: '0.75rem', alignItems: 'center', justifyContent: 'center' }}
          >
            <CommonStylesClient.Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <img
                src={
                  itemOrder?.Customer?.avatar
                    ? `${IMG_URL}/${itemOrder?.Customer?.avatar}`
                    : `${AvatarDefault?.src}`
                }
                alt='Order image'
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
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
                {itemOrder?.Customer?.firstName} {itemOrder?.Customer?.lastName}
              </CommonStylesClient.Typography>
              <CommonStylesClient.Typography type='text12'>
                {t('Vendor.phoneNumber')}:
                {showPhoneNumberByRegion(
                  itemOrder?.Customer?.phoneCode || PhoneCode.VN,
                  itemOrder?.Customer?.phone || ''
                )}
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
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <CommonIcons.Messages />
          </CommonStylesClient.Box>
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>
    </>
  );
};

export default React.memo(OrderItem);
