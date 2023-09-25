import React from 'react';
import { useTranslations } from 'next-intl';
import queryString from 'query-string';
import { useRouter } from 'next/navigation';
import { CircularProgress, useTheme } from '@mui/material';

import { useGet } from 'stores/useStore';
import { showError } from 'helpers/toast';
import useToggleDialog from 'hooks/useToggleDialog';
import { Guide } from 'modules/tourGuideApplyBooking/tourGuideApplyBooking.interface';
import bookingTourServices from 'modules/bookingTour/bookingTour.services';
import { RequestMatchTourGuide } from 'modules/bookingTour/bookingTour.interface';
import pageUrls from 'constants/pageUrls';
import { IMG_URL } from 'constants/apiUrls';
import cachedKeys from 'constants/cachedKeys';
import CommonStyles from 'components/CommonStyles';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import DialogSuccessTourGuide from 'components/Client/Components/Dialogs/DialogSuccessTourGuide';
import DialogFailTourGuide from 'components/Client/Components/Dialogs/DialogFailTourGuide';

interface TourGuideComponent {
  name: string;
  avatar: string;
  totalRate: number;
  phone: string;
  description: string;
  handleChooseTourGuide: () => void;
}

interface FindTourGuideContainerProps {}

const Loading = () => {
  const t = useTranslations('FindLocalFriendPage');
  const theme = useTheme();

  return (
    <CommonStylesClient.Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <CircularProgress />
      <CommonStylesClient.Typography
        type='mobiHeading2'
        sx={{ color: theme.colors?.client?.black }}
      >
        {t('findding')}
      </CommonStylesClient.Typography>
    </CommonStylesClient.Box>
  );
};

const TourGuideDetail = (props: TourGuideComponent) => {
  const { name, avatar, totalRate, phone, handleChooseTourGuide,description } = props;
  const t = useTranslations('FindLocalFriendPage');
  const theme = useTheme();

  return (
    <CommonStylesClient.Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderRadius: '1rem',
        border: `1px solid ${theme.colors?.client?.midGray}`,
        padding: '1rem',
        alignItems: 'center',
      }}
    >
      <CommonStylesClient.Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1rem',

          width: '100%',
        }}
      >
        <CommonStylesClient.Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CommonStylesClient.Avatar
            sx={{ width: '5rem', height: '5rem' }}
            alt={name}
            src={`${IMG_URL}/${avatar}`}
          />
        </CommonStylesClient.Box>

        <CommonStylesClient.Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <CommonStylesClient.Typography
            type='mobiHeading2'
            sx={{ color: theme.colors?.client?.black }}
          >
            {name}
          </CommonStylesClient.Typography>

          <CommonStylesClient.Typography type='title16' sx={{ color: theme.colors?.client?.gray }}>
            {phone}
          </CommonStylesClient.Typography>

          <CommonStylesClient.Typography type='title16' sx={{ color: theme.colors?.client?.darkGray }}>
            {description}
          </CommonStylesClient.Typography>
          <CommonStyles.RatingMui valueTable={totalRate} readOnly />
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>

      <CommonStylesClient.Button
        sx={{
          background: theme.colors?.client?.coBaltBlue,
          width: '5rem',
          height: '2rem',
          borderRadius: '1rem',
          padding: '1rem 2rem',
          textTransform: 'capitalize',
          letterSpacing: '0.64px',
        }}
        onClick={handleChooseTourGuide}
      >
        <CommonStylesClient.Typography
          type='mobiHeading3'
          sx={{ color: theme.colors?.client?.white }}
        >
          {t('select')}
        </CommonStylesClient.Typography>
      </CommonStylesClient.Button>
    </CommonStylesClient.Box>
  );
};

const FindTourGuideContainer = (props: FindTourGuideContainerProps) => {
  //! State
  const loadingOfTourGuideList = useGet(cachedKeys.loadingOfTourGuideList);
  const listOfTourGuide = useGet(cachedKeys.listOfTourGuide);
  const tourBookingId = useGet(cachedKeys.tourBookingId);
  const router = useRouter();
  //! Function
  const {
    open: openSuccessMatchTourGuide,
    shouldRender: shouldRenderSuccessMatchTourGuide,
    toggle: toggleSuccessMatchTourGuide,
  } = useToggleDialog();

  const {
    open: openFailMatchTourGuide,
    shouldRender: shouldRenderFailMatchTourGuide,
    toggle: toggleFailMatchTourGuide,
  } = useToggleDialog();

  const handleSubmitSuccessFindTourGuide = () => {
    const bodeParsed = {
      tourId: tourBookingId,
    };

    const hrefParsed = `${pageUrls.Payment}?${queryString.stringify(bodeParsed)}`;

    router.push(hrefParsed);
  };

  const handleSubmitFailFindTourGuide = () => {
    toggleFailMatchTourGuide();
  };

  const handleChooseTourGuide = async ({ tourBookingId, tourGuideId }: RequestMatchTourGuide) => {
    try {
      const response = await bookingTourServices.matchTourGuide({
        tourBookingId: tourBookingId,
        tourGuideId: tourGuideId,
      });
      const statusCode = response?.data?.statusCode;
      if (statusCode === 200) {
        toggleSuccessMatchTourGuide();
      } else {
        toggleFailMatchTourGuide();
      }
    } catch (error) {
      showError(error);
    } finally {
    }
    return;
  };

  //! Render
  if (listOfTourGuide?.length <= 0) {
    return <Loading />;
  }

  return (
    <CommonStylesClient.Box>
      {listOfTourGuide?.map((item: Guide) => {
        const tourBookingId = item?.tourBookingId || 0;
        const tourGuideId = item?.tourGuideId || 0;
        const name = `${item?.TourGuide?.firstName} ${item?.TourGuide?.lastName}` || '';
        const phone = `0${item?.TourGuide?.phone}` || '';
        const avatar = item.TourGuide?.avatar || '';
        const totalRate = Number(item?.TourGuide?.totalRate) || 0;
        const description = item.TourGuide?.description || ''
        return (
          <TourGuideDetail
            key={item.id}
            avatar={avatar}
            name={name}
            phone={phone}
            totalRate={totalRate}
            description={description}
            handleChooseTourGuide={() => handleChooseTourGuide({ tourBookingId, tourGuideId })}
          />
        );
      })}

      {/*  */}
      {/* <CommonStylesClient.Box>
        Only For Test
        <TourGuideDetail
          avatar=''
          name='asdasd'
          phone='12312312'
          totalRate={3}
          handleChooseTourGuide={() => handleChooseTourGuide({ tourBookingId, tourGuideId: 12 })}
        />
      </CommonStylesClient.Box> */}

      {shouldRenderSuccessMatchTourGuide && (
        <DialogSuccessTourGuide
          onSubmit={handleSubmitSuccessFindTourGuide}
          isOpen={openSuccessMatchTourGuide}
          toggle={toggleSuccessMatchTourGuide}
        />
      )}

      {shouldRenderFailMatchTourGuide && (
        <DialogFailTourGuide
          onSubmit={handleSubmitFailFindTourGuide}
          isOpen={openFailMatchTourGuide}
          toggle={toggleFailMatchTourGuide}
        />
      )}
    </CommonStylesClient.Box>
  );
};

export default React.memo(FindTourGuideContainer);
