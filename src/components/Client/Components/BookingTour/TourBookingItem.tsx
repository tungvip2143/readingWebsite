import React from 'react';
import { BookingTour } from 'modules/bookingTour/bookingTour.interface';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { IMG_URL } from 'constants/apiUrls';
import { useTranslations } from 'next-intl';
import CommonIconsClient from 'components/Client/CommonIcons';
import { convertToDate } from 'helpers/common';
import { formatCurrency } from '../../../../helpers/common';
import { useTheme } from '@mui/material';
import CommonStyles from 'components/CommonStyles';
import bookingTourServices from 'modules/bookingTour/bookingTour.services';
import { showError, showSuccess } from 'helpers/toast';
import { useGet } from 'stores/useStore';
import cachedKeys from 'constants/cachedKeys';
import { StatusTourGuideApplyBooking, TourGuideApplyStatus } from 'interfaces/common';
import DialogConfirm from 'components/DialogConfirm';
import useToggleDialog from 'hooks/useToggleDialog';
import useAuth from 'hooks/useAuth';
import { TourGuide } from 'modules/tourGuide/article.interface';
import { TourGuideInfoStatus } from 'constants/common';
import useGetProfile from 'modules/profileLocalFriend/hooks/useGetProfileLocalFriend';

interface TourBookingItemProps {
  item: BookingTour;
}

const TourBookingItem = (props: TourBookingItemProps) => {
  //! State
  const { item } = props;
  const t = useTranslations();
  const theme = useTheme();
  const refetchTourBooking = useGet(cachedKeys.refetchListTourBooking);
  const {
    open: openCancelTourBooking,
    toggle: toggleCancelTourBooking,
    shouldRender: shouldRenderTourBooking,
  } = useToggleDialog();
  const auth = useAuth();
  const user = auth?.user as TourGuide;
  const isLogged = auth.isLogged || false;
  const { data: dataProfile, isLoading: loadingProfile } = useGetProfile({
    isTrigger: !!isLogged,
    refetchKey: cachedKeys.refetchProfileLocalFriend,
  });

  const isVerified = dataProfile?.isActive && dataProfile?.status === TourGuideInfoStatus.VERIFIED;

  //! Function
  const handleApplyBookingTour = async () => {
    try {
      const response = await bookingTourServices.applyBookingTour(item?.id, {
        tourBookingId: item?.id,
      });
      refetchTourBooking && (await refetchTourBooking());
      showSuccess(t('TourBooking.applyBookingTour'));
    } catch (error) {
      showError(error);
    }
  };

  const handleCancelApplyBookingTour = async () => {
    try {
      const response = await bookingTourServices.cancelApplyBookingTour(item?.id, {
        tourBookingId: item?.id,
      });
      refetchTourBooking && (await refetchTourBooking());
      showSuccess(t('TourBooking.cancelTour'));
      toggleCancelTourBooking();
    } catch (error) {
      showError(error);
    }
  };

  const renderStatusTourBooking = (item: BookingTour) => {
    if (
      // (item.status === StatusTourGuideApplyBooking.APPLIED &&
      //   item.tourGuideId === auth?.user?.id &&
      //   item.tourGuideApplyStatus === TourGuideApplyStatus.APPLIED) ||
      // (item.status === StatusTourGuideApplyBooking.APPLIED &&
      //   item.tourGuideId === null &&
      //   item.tourGuideApplyStatus === TourGuideApplyStatus.APPLIED) ||
      item.status === StatusTourGuideApplyBooking.MATCHED ||
      (item.status !== StatusTourGuideApplyBooking.PAYMENT_SUCCESS &&
        item.tourGuideApplyStatus === TourGuideApplyStatus.APPLIED)
    ) {
      return (
        <CommonStylesClient.Button
          variant='contained'
          sx={{
            padding: '0.75rem 1.5rem',
            borderRadius: '0.75rem',
            border: isVerified ? `0.0625rem solid ${theme.colors?.client.red}` : 'none',
            backgroundColor: theme.colors?.white,
            color: theme.colors?.client.red,
            textTransform: 'none',
            boxShadow: 'none',
            letterSpacing: '0.04rem',
            '&.MuiLoadingButton-root:hover': {
              backgroundColor: theme.colors?.white,
              boxShadow: 'none',
            },
          }}
          onClick={toggleCancelTourBooking}
          disabled={!isVerified ? true : false}
        >
          {t('TourBooking.cancelTour')}
        </CommonStylesClient.Button>
      );
    }

    if (
      item.status === StatusTourGuideApplyBooking.NEW ||
      (item.status === StatusTourGuideApplyBooking.APPLIED &&
        item.tourGuideApplyStatus === TourGuideApplyStatus.TOUR_GUIDE_CANCELED)
      // (item.status === StatusTourGuideApplyBooking.APPLIED && !item.tourGuideApplyStatus)
    ) {
      return (
        <CommonStylesClient.Button
          variant='contained'
          sx={{
            padding: '0.75rem 1.5rem',
            borderRadius: '0.75rem',
            border: isVerified ? `0.0625rem solid ${theme.colors?.client.coBaltBlue}` : 'none',
            backgroundColor: theme.colors?.white,
            color: theme.colors?.client.coBaltBlue,
            textTransform: 'none',
            boxShadow: 'none',
            letterSpacing: '0.04rem',
            '&.MuiLoadingButton-root:hover': {
              backgroundColor: theme.colors?.white,
              boxShadow: 'none',
            },
          }}
          onClick={handleApplyBookingTour}
          disabled={!isVerified ? true : false}
        >
          {t('TourBooking.receiveTour')}
        </CommonStylesClient.Button>
      );
    }

    if (
      item.status === StatusTourGuideApplyBooking.TOUR_GUIDE_CANCELED ||
      item.status === StatusTourGuideApplyBooking.CUSTOMER_CANCELED
    ) {
      return (
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
            cursor: 'default',
            '&.MuiLoadingButton-root:hover': {
              backgroundColor: theme.colors?.white,
              boxShadow: 'none',
            },
          }}
          onClick={undefined}
        >
          {t('TourBooking.statusCancel')}
        </CommonStylesClient.Button>
      );
    }
    if (item.status === StatusTourGuideApplyBooking.PAYMENT_SUCCESS) {
      return (
        <CommonStylesClient.Button
          variant='contained'
          sx={{
            padding: '0.75rem 1.5rem',
            borderRadius: '0.75rem',
            border: isVerified ? `0.0625rem solid ${theme.colors?.success500}` : 'none',
            backgroundColor: theme.colors?.white,
            color: theme.colors?.success500,
            textTransform: 'none',
            boxShadow: 'none',
            letterSpacing: '0.04rem',
            cursor: 'default',
            '&.MuiLoadingButton-root:hover': {
              backgroundColor: theme.colors?.white,
              boxShadow: 'none',
            },
          }}
          onClick={toggleCancelTourBooking}
          // disabled={!isVerified ? true : false}
          disabled
        >
          {/* {t('TourBooking.cancelTour')} */}
          coming soon ...
        </CommonStylesClient.Button>
      );
    }

    if (item.status === StatusTourGuideApplyBooking.EXPIRED_PAYMENT) {
      return (
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
            cursor: 'default',
            '&.MuiLoadingButton-root:hover': {
              backgroundColor: theme.colors?.white,
              boxShadow: 'none',
            },
          }}
          onClick={undefined}
        >
          {t('TourBooking.statusExpiredPayment')}
        </CommonStylesClient.Button>
      );
    }

    if (item.status === StatusTourGuideApplyBooking.SUCCESSFULLY) {
      return (
        <CommonStylesClient.Button
          variant='contained'
          sx={{
            padding: '0.75rem 1.5rem',
            borderRadius: '0.75rem',
            // border: `0.0625rem solid ${theme.colors?.client.red}`,
            backgroundColor: theme.colors?.success500,
            color: theme.colors?.white,
            textTransform: 'none',
            boxShadow: 'none',
            letterSpacing: '0.04rem',
            cursor: 'default',
            '&.MuiLoadingButton-root:hover': {
              backgroundColor: theme.colors?.success500,
              boxShadow: 'none',
            },
          }}
          onClick={undefined}
        >
          {t('TourBooking.statusCompleted')}
        </CommonStylesClient.Button>
      );
    }
  };

  //! Render
  return (
    <>
      {shouldRenderTourBooking && (
        <DialogConfirm
          open={openCancelTourBooking}
          toggle={toggleCancelTourBooking}
          title={t('TourBooking.titleCancelApplyTourBooking')}
          content={t('TourBooking.contentCancelApplyTourBooking')}
          footer={
            <>
              <CommonStyles.Button
                variant='text'
                onClick={toggleCancelTourBooking}
                sx={{ marginRight: '0.625rem' }}
              >
                {t('Common.cancel')}
              </CommonStyles.Button>
              <CommonStyles.Button type='button' onClick={handleCancelApplyBookingTour}>
                {t('Common.ok')}
              </CommonStyles.Button>
            </>
          }
        />
      )}

      <CommonStylesClient.Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.25rem 1.5rem',
          backgroundColor: theme.colors?.white,
          borderRadius: '1rem',
        }}
      >
        <CommonStylesClient.Box>
          <img
            src={`${IMG_URL}/${item?.Tours?.thumbnail}`}
            alt={`${t('Tour.image')} ${item?.Tours?.name}`}
            style={{ width: '5rem', height: '5rem', borderRadius: '0.5rem', objectFit: 'cover' }}
          />
        </CommonStylesClient.Box>

        <CommonStylesClient.Box sx={{ width: '20%' }}>
          <CommonStylesClient.Tooltip title={item?.Tours?.name} followCursor placement='bottom'>
            <div>
              <CommonStylesClient.Typography
                variant='h4'
                sx={{
                  color: theme.colors?.client.titleBlack,
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  letterSpacing: '0.035rem',
                  marginBottom: '0.5rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {item?.Tours?.name}
              </CommonStylesClient.Typography>
            </div>
          </CommonStylesClient.Tooltip>

          <CommonStylesClient.Box sx={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <CommonIconsClient.IconLocationBlue />
            <CommonStylesClient.Typography
              variant='h4'
              sx={{
                color: theme.colors?.client.darkGray,
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.03rem',
              }}
            >
              {item?.Tours?.Area?.name}
            </CommonStylesClient.Typography>
          </CommonStylesClient.Box>
        </CommonStylesClient.Box>

        <CommonStylesClient.Box>
          <CommonStylesClient.Typography
            variant='h4'
            sx={{
              color: theme.colors?.client.grayScaleText,
              fontSize: '0.75rem',
              fontWeight: 400,
              letterSpacing: '0.03rem',
              lineHeight: '1.2rem',
            }}
          >
            {t('TourBooking.departureDay')}
          </CommonStylesClient.Typography>
          <CommonStylesClient.Typography
            variant='h4'
            sx={{
              color: theme.colors?.client.textPaginationBlack,
              fontSize: '1rem',
              fontWeight: 600,
              lineHeight: '1.5rem',
              letterSpacing: '0.005rem',
            }}
          >
            {convertToDate(item?.startTime || '')}
          </CommonStylesClient.Typography>
        </CommonStylesClient.Box>

        <CommonStylesClient.Box>
          <CommonStylesClient.Typography
            variant='h4'
            sx={{
              color: theme.colors?.client.grayScaleText,
              fontSize: '0.75rem',
              fontWeight: 400,
              letterSpacing: '0.03rem',
              lineHeight: '1.2rem',
            }}
          >
            {t('TourBooking.groupInformation')}
          </CommonStylesClient.Typography>
          <CommonStylesClient.Typography
            variant='h4'
            sx={{
              color: theme.colors?.client.textPaginationBlack,
              fontSize: '1rem',
              fontWeight: 600,
              lineHeight: '1.5rem',
              letterSpacing: '0.005rem',
            }}
          >
            {`${item?.totalAdult} ${t('TourBooking.adults')} - ${item?.totalChildren} ${t(
              'TourBooking.children'
            )}`}
          </CommonStylesClient.Typography>
        </CommonStylesClient.Box>

        <CommonStylesClient.Box>
          <CommonStylesClient.Typography
            variant='h4'
            sx={{
              color: theme.colors?.client.grayScaleText,
              fontSize: '0.75rem',
              fontWeight: 400,
              letterSpacing: '0.03rem',
              lineHeight: '1.2rem',
            }}
          >
            {t('TourBooking.totalPrice')}
          </CommonStylesClient.Typography>
          <CommonStylesClient.Typography
            variant='h4'
            sx={{
              color: theme.colors?.client.textPaginationBlack,
              fontSize: '1.125rem',
              fontWeight: 700,
              letterSpacing: '0.006rem',
            }}
          >
            {formatCurrency(item?.totalPrice || 0)}
          </CommonStylesClient.Typography>
        </CommonStylesClient.Box>

        <CommonStylesClient.Box>{renderStatusTourBooking(item)}</CommonStylesClient.Box>
      </CommonStylesClient.Box>
    </>
  );
};

export default React.memo(TourBookingItem);
