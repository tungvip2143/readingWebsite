'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import { MAX_WIDTH_CONTAINER, SkeletonType } from 'constants/common';
import TourDetailHeading from 'components/Client/TourDetail/TourDetailHeading';
import TourDetailContainer from 'components/Client/TourDetail/TourDetailContainer';
import TourDetailRecomendation from 'components/Client/TourDetail/TourDetailRecomendation';
import { useSave } from 'stores/useStore';
import cachedKeys from 'constants/cachedKeys';
import { RequestDetailTour } from 'modules/tour/tour.interface';
import useGetDetailTour from 'modules/tour/hooks/useGetDetailTour';
import NotFound from 'components/Client/Components/NotFound';
import SkeletonLoading from 'components/Client/Components/SkeletonLoading';
import { isEmpty } from 'lodash';

interface DetailTourProps {}

export default function DetailTour(props: DetailTourProps) {
  //! State
  const params = useParams();
  const id = params?.slug;
  const save = useSave();

  const {
    data: resDetailTour,
    isLoading,
    error,
  } = useGetDetailTour(id as unknown as RequestDetailTour, !!id, cachedKeys.refetchDetailTour);
  const isNotData = !isEmpty(error);
  //! Function

  //! Effect
  useEffect(() => {
    if (!isLoading && resDetailTour?.id) {
      save(cachedKeys.detailTour, resDetailTour);
      return;
    }
  }, [save, resDetailTour, isLoading]);

  //! Render
  if (isLoading && isEmpty(resDetailTour)) {
    return <SkeletonLoading type={SkeletonType.DETAIL} />;
  }
  if (isNotData) {
    return <NotFound />;
  }
  return (
    <CommonStylesClient.Box
      sx={{
        padding: {
          width: '100%',
          maxWidth: MAX_WIDTH_CONTAINER,
          margin: '0 auto',
        },
      }}
    >
      <CommonStylesClient.Box
        sx={{
          padding: {
            lg: '3.75rem 0',
          },
        }}
      >
        <TourDetailHeading />
        <TourDetailContainer />
      </CommonStylesClient.Box>

      <CommonStylesClient.Box
        sx={{
          padding: {
            lg: '5rem 0',
          },
        }}
      >
        <TourDetailRecomendation provinceCode={resDetailTour?.Area?.provinceCode!} tourId={id} />
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
}
