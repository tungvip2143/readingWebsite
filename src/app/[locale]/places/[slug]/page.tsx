'use client';

import React, { useEffect } from 'react';

import { MAX_WIDTH_CONTAINER, SkeletonType } from 'constants/common';
import { useSave } from 'stores/useStore';
import cachedKeys from 'constants/cachedKeys';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import PlacesDetailHeading from 'components/Client/PlacesDetail/PlacesDetailHeading';
import PlacesDetailContainer from 'components/Client/PlacesDetail/PlacesDetailContainer';
import PlacesDetailRecomendation from 'components/Client/PlacesDetail/PlacesDetailRecomendation';
import useGetDetailVendor from 'modules/vendor/hooks/useGetDetailVendor';
import { useParams } from 'next/navigation';
import SkeletonLoading from 'components/Client/Components/SkeletonLoading';
import NotFound from 'components/Client/Components/NotFound';
import { isEmpty } from 'lodash';

interface DetailTourProps {}

export default function DetailTour(props: DetailTourProps) {
  //! State
  const params = useParams();
  const save = useSave();

  const id = params?.slug;
  const {
    data: resDataVendorDetail,
    isLoading: loadingResVendorDetail,
    error,
  } = useGetDetailVendor(id, !!id, cachedKeys.refetchDetailPlaces);
  const isNotData = !isEmpty(error);

  //! Function

  //! Effect
  useEffect(() => {
    if (!loadingResVendorDetail && resDataVendorDetail?.id) {
      save(cachedKeys.detailPlaces, resDataVendorDetail);
    }
  }, [save, resDataVendorDetail]);

  //! Render
  if (loadingResVendorDetail && isEmpty(resDataVendorDetail)) {
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
        <PlacesDetailHeading />
        <PlacesDetailContainer />
      </CommonStylesClient.Box>

      <CommonStylesClient.Box
        sx={{
          padding: {
            lg: '5rem 0',
          },
        }}
      >
        <PlacesDetailRecomendation
          provinceCode={resDataVendorDetail?.destination?.provinceCode!}
          vendorId={id}
        />
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
}
