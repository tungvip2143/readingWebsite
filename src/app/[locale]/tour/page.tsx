'use client';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import TourContainer from 'components/Client/TourPage/TourContainer';
import TourHeading from 'components/Client/TourPage/TourHeading';
import { MAX_WIDTH_CONTAINER } from 'constants/common';
import { useSearchParams } from 'next/navigation';

import { useSave } from 'stores/useStore';
import { useEffect, useMemo } from 'react';
import cachedKeys from 'constants/cachedKeys';
import useGetListToursByCategory from 'modules/toursByCategory/hooks/useGetListToursByCategory';
import useFiltersHandler from 'hooks/useFiltersHandler';
import useGetListTour from 'modules/tour/hooks/useGetListTour';
import { cloneDeep } from 'lodash';
import useGetListTourCategory from 'modules/tour-category/hooks/useGetListTourCategory';
import { TourCategory } from 'modules/tour-category/tour-category.interface';
import { RequestGetListToursByCategory } from 'modules/toursByCategory/toursByCategory.interface';
import useGetListTotalBookingSuccess from 'modules/tour-category/hooks/useGetListTotalBookingSuccess';

type Props = {};

interface DetailCategory {
  label: string;
  backgroundImage: string;
}

export default function TourPage(props: Props) {
  //!State
  const searchParams = useSearchParams();
  const save = useSave();
  const category = searchParams.get('category');
  const location = searchParams.get('location');
  const hasCategory = !!category;

  const initialFilters: RequestGetListToursByCategory = {
    provinceCode: location ? location : undefined,
    categories: category ? category : undefined,
  };

  const { filters, handleSearch } = useFiltersHandler(initialFilters);

  const { data: resDataTour, isLoading: loadingTour } = useGetListToursByCategory(filters, {
    isTrigger: !hasCategory,
  });

  const {
    data: resDataTourByCategory,
    isLoading: loadingTourByCategory,
    refetch: refetchTourByCategory,
  } = useGetListTour(filters, {
    isTrigger: hasCategory,
  });

  const { data: resDataCategory } = useGetListTourCategory({ isTrigger: hasCategory });
  const { data: resDataTotalBookingSuccess } = useGetListTotalBookingSuccess();

  //! Function
  const numberBooking = () => {
    const total = resDataTotalBookingSuccess?.tourBookingSuccess || 0;
    return total;
  };

  const numberBookingByCategory = () => {
    const findCategory =
      resDataTotalBookingSuccess &&
      (resDataTotalBookingSuccess?.categories?.find((item: TourCategory) => {
        return Number(item.id) === Number(category);
      }) as TourCategory);

    return Number(findCategory?.bookingSuccess);
  };

  const detailCategory = useMemo(() => {
    const findCategory = resDataCategory.find((item: TourCategory) => {
      return Number(item.id) === Number(category);
    }) as TourCategory;
    return {
      label: findCategory?.name,
      backgroundImage: findCategory?.thumbnail,
    };
  }, [resDataCategory, category]) as DetailCategory;

  //! Effect
  useEffect(() => {
    if (hasCategory) {
      const cloneFilters = cloneDeep(filters);
      const values = { ...cloneFilters, categories: category };
      refetchTourByCategory();
      return handleSearch(values);
    }
  }, [hasCategory]);

  useEffect(() => {
    save(cachedKeys.hasCategory, hasCategory);
  }, [save, hasCategory]);

  useEffect(() => {
    if (hasCategory) {
      save(cachedKeys.detailCategory, detailCategory);
    }
  }, [save, detailCategory, hasCategory]);

  useEffect(() => {
    save(cachedKeys.listOfCategory, hasCategory ? resDataTourByCategory?.items : resDataTour);
    save(cachedKeys.loadingListOfCategory, hasCategory ? loadingTourByCategory : loadingTour);
  }, [save, hasCategory, resDataTourByCategory, resDataTour, loadingTour, loadingTourByCategory]);

  //! Render
  return (
    <CommonStylesClient.Box>
      <TourHeading
        label={hasCategory ? detailCategory.label : ''}
        numberBooking={hasCategory ? numberBookingByCategory() : numberBooking()}
        backgroundImage={hasCategory ? detailCategory.backgroundImage : ''}
      />
      <CommonStylesClient.Box
        sx={{
          padding: {
            width: '100%',
            maxWidth: MAX_WIDTH_CONTAINER,
            margin: '0 auto',
          },
        }}
      >
        <TourContainer filters={filters} handleSearch={handleSearch} />
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
}
