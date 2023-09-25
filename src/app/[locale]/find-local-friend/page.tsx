'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { useSave } from 'stores/useStore';
import { MAX_WIDTH_CONTAINER } from 'constants/common';
import cachedKeys from 'constants/cachedKeys';
import useFiltersHandler from 'hooks/useFiltersHandler';
import FindTourGuideHeading from 'components/Client/FindTourGuidePage/FindTourGuideHeading';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import FindTourGuideContainer from 'components/Client/FindTourGuidePage/FindTourGuideContainer';
import NotFound from 'components/Client/Components/NotFound';
import useGetListTourGuideApplyBooking from 'modules/tourGuideApplyBooking/hooks/useGetListTourGuideApplyBooking';
import { RequestGetListTourGuideApplyBooking } from 'modules/tourGuideApplyBooking/tourGuideApplyBooking.interface';
import { showSuccess } from 'helpers/toast';
import { useTranslations } from 'next-intl';
import pageUrls from 'constants/pageUrls';

type Props = {};

export default function FindTourPage(props: Props) {
  const save = useSave();
  const searchParams = useSearchParams();
  const tourId = searchParams.get('tourId');
  const t = useTranslations();
  const router = useRouter()
  const redirectMyBookingTour = searchParams.get('redirectMyBookingTour');
  const initialFilters: RequestGetListTourGuideApplyBooking = {
    tourBookingId: Number(tourId),
  };

  const { filters } = useFiltersHandler(initialFilters);

  const {
    data: resDataListTourGuideApply,
    isLoading: loadingListTourGuideApply,
    refetch: refetchListTourGuideApply,
  } = useGetListTourGuideApplyBooking(filters, { isTrigger: !!tourId });

  useEffect(() => {
    if (resDataListTourGuideApply) {
      save(cachedKeys.listOfTourGuide, resDataListTourGuideApply);
      save(cachedKeys.loadingOfTourGuideList, loadingListTourGuideApply);
      save(cachedKeys.tourBookingId, !!tourId ? tourId : 0);
    }
  }, [save, resDataListTourGuideApply, loadingListTourGuideApply, tourId]);

  //! Tạm thời thế này đã
  useEffect(() => {
    const interval = setInterval(() => {
      refetchListTourGuideApply();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [refetchListTourGuideApply]);

  useEffect(()=>{
    if(redirectMyBookingTour){
      showSuccess(t('TourDetailPage.successFindTour'))
      setTimeout(() => {
        return router.push(pageUrls.MyBookingTour)
      },5000)
    }
  },[redirectMyBookingTour])

  if (!tourId) {
    return <NotFound />;
  }
  return (
    <CommonStylesClient.Box>
      <FindTourGuideHeading />
      <CommonStylesClient.Box
        sx={{
          padding: {
            lg: '2.5rem 0',
            width: '100%',
            maxWidth: MAX_WIDTH_CONTAINER,
            margin: '0 auto',
          },
        }}
      >
        <FindTourGuideContainer />
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
}
