import CommonStyles from 'components/CommonStyles';
import { IMG_URL } from 'constants/apiUrls';
import React from 'react';
import { useTheme } from '@mui/material';
import Divider from 'components/CommonStyles/Divider';
import { useTranslations } from 'next-intl';
import CommonIcons from 'components/CommonIcons';
import { TourGuide } from 'modules/tourGuide/tourGuide.interface';
import { Tour } from 'modules/tour/tour.interface';
import { showError, showSuccess } from 'helpers/toast';
import tourGuideSubscribeServices from 'modules/tourGuideSubscribe/tourGuideSubscribe.services';
import { AllQueryKeys, useGet } from 'stores/useStore';
import cachedKeys from 'constants/cachedKeys';
import { showPhoneNumberByRegion } from 'helpers/common';
import { PhoneCode } from 'interfaces/common';
import avatarTourGuideDefault from '../../../../../../../public/images/avatarUser.png';
interface TourGuideItem {
  tourGuide?: TourGuide;
  tour: Tour;
}

export default function TourGuideItem(props: TourGuideItem) {
  //! State
  const { tourGuide, tour } = props;
  const theme = useTheme();
  const t = useTranslations();
  const refetchListTourGuide = useGet(
    cachedKeys.refetchListTourGuideInAddTourSubscribe as AllQueryKeys
  );
  const refetchListTourGuideSubscribe = useGet(
    cachedKeys.refetchListTourGuideSubscribe as AllQueryKeys
  );

  //! Function
  const handleAddTourGuide = async () => {
    try {
      const response = await tourGuideSubscribeServices.createTourGuideSubscribe(tour?.id, {
        tourGuide: tourGuide?.id as number,
      });

      refetchListTourGuide && (await refetchListTourGuide());
      refetchListTourGuideSubscribe && (await refetchListTourGuideSubscribe());

      showSuccess(t('Tour.createLocalFriendSubscribe'));
    } catch (error) {
      showError(error);
    }
  };

  //! Render
  return (
    <CommonStyles.Box>
      <CommonStyles.Box
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <CommonStyles.Box sx={{ display: 'flex', gap: 1 }}>
          <CommonStyles.Box>
            <img
              src={
                tourGuide?.avatar ? `${IMG_URL}/${tourGuide?.avatar}` : avatarTourGuideDefault.src
              }
              style={{ width: '2.25rem', height: '2.25rem', borderRadius: '1.125rem' }}
              alt=''
            />
          </CommonStyles.Box>

          <CommonStyles.Box>
            <CommonStyles.Typography
              variant='h3'
              sx={{
                fontSize: '0.875rem',
                color: theme.colors?.custom?.textBlack,
                fontWeight: 550,
                marginBottom: '0.5rem',
              }}
            >
              {`${tourGuide?.firstName} ${tourGuide?.lastName}`}
            </CommonStyles.Typography>
            <CommonStyles.Box>
              <CommonStyles.Typography
                variant='h4'
                sx={{ fontSize: '0.75rem', color: theme.colors?.primary500 }}
              >
                {showPhoneNumberByRegion(
                  tourGuide?.phoneCode || PhoneCode.VN,
                  tourGuide?.phone || ''
                )}
              </CommonStyles.Typography>
            </CommonStyles.Box>
          </CommonStyles.Box>
        </CommonStyles.Box>

        <CommonStyles.Box>
          <CommonStyles.Button
            variant='contained'
            startIcon={<CommonIcons.AddIcon />}
            onClick={handleAddTourGuide}
            sx={{
              color: theme.colors?.custom?.textGreyLighter,
              backgroundColor: theme.colors?.custom?.greyBorder,
              borderRadius: '1.125rem',
              '&.MuiLoadingButton-root:hover': {
                backgroundColor: theme.colors?.custom?.greyBorder,
                opacity: '0.6',
              },
            }}
          >
            {t('Common.add')}
          </CommonStyles.Button>
        </CommonStyles.Box>
      </CommonStyles.Box>

      <Divider
        sx={{
          height: '0.0625rem',
          color: `${theme.colors?.custom?.greyBorder}`,
          margin: '0.625rem 0 1rem',
        }}
      />
    </CommonStyles.Box>
  );
}
