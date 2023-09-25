import { useEffect, useState, useCallback, useMemo } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { isArray, isEmpty } from 'lodash';
import { useSave } from 'stores/useStore';
import { showError } from 'helpers/toast';
import { ResponseList } from 'interfaces/common';
import { Tour, IGetListTour } from '../tour.interface';
import tourServices from '../tour.services';
import useAuth from 'hooks/useAuth';
import TourFilterModel from 'models/tourFilter.model';
import { FormFilterValueTour } from 'app/[locale]/admin/tour/page';

//* Check parse body request
const parseRequest = (filters: FormFilterValueTour) => {
  const valueFilter = cloneDeep(filters);
  return TourFilterModel.parseBodyToRequest(valueFilter);
};

const useGetListTour = (
  filters: FormFilterValueTour,
  options: { isTrigger?: boolean; refetchKey?: string } = { isTrigger: true, refetchKey: '' }
) => {
  //! State
  const { isTrigger = true, refetchKey = '' } = options;
  const save = useSave();
  const [data, setData] = useState<ResponseList<Tour[]>>();

  const [isLoading, setLoading] = useState(false);
  const [isRefetching, setRefetching] = useState(false);
  const [isFetchingPage, setFetchingPage] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [hasMore, setHasMore] = useState(false);

  const auth = useAuth();
  const isLogged = auth.isLogged;

  //! Function
  const request = useMemo(() => {
    if (isLogged) {
      return tourServices.getListTour;
    }

    return tourServices.getListTourPublic;
  }, [isLogged]);

  const fetch: () => Promise<ResponseList<Tour[]>> | undefined = useCallback(() => {
    if (!isTrigger) {
      return;
    }

    return new Promise((resolve, reject) => {
      (async () => {
        try {
          setLoading(true);
          const nextFilters = parseRequest(filters);
          const response = await request(nextFilters);
          resolve(response?.data?.data);
          setLoading(false);
        } catch (error) {
          setError(error);
          reject(error);
          setLoading(false);
        }
      })();
    });
  }, [filters, isTrigger, request]);

  const checkConditionPass = useCallback(
    (response: ResponseList<Tour[]>) => {
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
      const response = await request(nextFilters);
      checkConditionPass(response?.data?.data);
      setRefetching(false);
    } catch (error: any) {
      if (!error.isCanceled) {
        showError(error);
      }
    }
  }, [filters, request]);

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
