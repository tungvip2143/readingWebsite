import { useEffect, useState, useCallback } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { useSave } from 'stores/useStore';
import { showError } from 'helpers/toast';
import { ResponseList } from 'interfaces/common';
import toursByCategoryServices from '../toursByCategory.services';
import { RequestGetListToursByCategory, ToursByCategory } from '../toursByCategory.interface';

//* Check parse body request
const parseRequest = (filters: RequestGetListToursByCategory) => {
  return cloneDeep({
    provinceCode: filters.provinceCode,
    categories: filters.categories,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    attributes: filters.attributes,
    rating: filters.rating,
    textSearch: filters.textSearch
  });
};

const useGetListTour = (
  filters: RequestGetListToursByCategory,
  options: { isTrigger?: boolean; refetchKey?: string } = { isTrigger: true, refetchKey: '' }
) => {
  //! State
  const { isTrigger = true, refetchKey = '' } = options;

  const save = useSave();
  const [data, setData] = useState<ResponseList<ToursByCategory>>();

  const [isLoading, setLoading] = useState(false);
  const [isRefetching, setRefetching] = useState(false);
  const [isFetchingPage, setFetchingPage] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [hasMore, setHasMore] = useState(false);

  //! Function
  const fetch: () => Promise<ResponseList<ToursByCategory>> | undefined = useCallback(() => {
    if (!isTrigger) {
      return;
    }

    return new Promise((resolve, reject) => {
      (async () => {
        try {
          setLoading(true);
          const nextFilters = parseRequest(filters);
          const response = await toursByCategoryServices.getListToursByCategory(nextFilters);
          resolve(response?.data?.data);
          setLoading(false);
        } catch (error) {
          setError(error);
          reject(error);
          setLoading(false);
        }
      })();
    });
  }, [filters, isTrigger]);

  const checkConditionPass = useCallback(
    (response: ResponseList<ToursByCategory>) => {
      //* Check condition of response here to set data
      setData(response);
      setHasMore((filters?.page || 1) < response.totalPage);
    },
    [filters.page]
  );

  const fetchChangePage = useCallback(
    async (shouldSetData: boolean) => {
      setFetchingPage(true);
      const response = await fetch();
      if (shouldSetData && response) {
        checkConditionPass(response);
      }

      setFetchingPage(false);
    },
    [fetch, checkConditionPass]
  );

  //* Refetch implicity (without changing loading state)
  const refetch = useCallback(async () => {
    try {
      setRefetching(true);
      const nextFilters = parseRequest(filters);
      const response = await toursByCategoryServices.getListToursByCategory(nextFilters);
      checkConditionPass(response?.data?.data);
      setRefetching(false);
    } catch (error: any) {
      if (!error.isCanceled) {
        showError(error);
      }
    }
  }, [filters]);

  useEffect(() => {
    save(refetchKey, refetch);
  }, [save, refetchKey, refetch]);

  //* Refetch with changing loading state
  const refetchWithLoading = useCallback(
    async (shouldSetData: boolean) => {
      try {
        setLoading(true);
        const response = await fetch();
        if (shouldSetData && response) {
          checkConditionPass(response);
        }
        setLoading(false);
      } catch (error) {
        showError(error);
        setLoading(false);
      }
    },
    [fetch, checkConditionPass]
  );

  useEffect(() => {
    let shouldSetData = true;
    if (filters.page !== undefined && filters.page <= 0) {
      refetchWithLoading(shouldSetData);
      return;
    }

    //* If offset > 0 -> fetch more
    fetchChangePage(shouldSetData);

    return () => {
      shouldSetData = false;
    };
  }, [filters.page, fetchChangePage, refetchWithLoading]);

  return {
    data,
    isLoading,
    error,
    refetch,
    refetchWithLoading,
    isRefetching,
    isFetchingPage,
    hasMore,
    setData,
  };
};

export default useGetListTour;
