import { useEffect, useState, useCallback, useMemo } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { isEmpty } from 'lodash';
import { useSave } from 'stores/useStore';
import { showError } from 'helpers/toast';

import { RequestGetListVendor, ResponseGetListVendor, ListVendor } from '../vendor.interface';
import VendorServices from '../vendor.services';
import useAuth from 'hooks/useAuth';

//* Check parse body request
const parseRequest = (filters: RequestGetListVendor) => {
  return cloneDeep({
    page: filters.page,
    perPage: filters.perPage,
    sortField: filters.sortField,
    sortOrder: filters.sortOrder,
    textSearch: filters.textSearch,
    provinceCode: filters.provinceCode,
    tourId: filters.tourId,
    rating: filters.rating,
    maxPrice: filters.maxPrice,
    minPrice: filters.minPrice,
    type: filters.type,
  });
};

const useGetVendorList = (
  filters: RequestGetListVendor,
  options: { isTrigger?: boolean; refetchKey?: string } = { isTrigger: true, refetchKey: '' }
) => {
  //! State
  const { isTrigger = true, refetchKey = '' } = options;

  const save = useSave();
  const [data, setData] = useState<ListVendor>();
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
      return VendorServices.getListVendor;
    }
    return VendorServices.getListVendorPublic;
  }, [isLogged]);

  const fetch: () => Promise<ResponseGetListVendor> | undefined = useCallback(() => {
    if (!isTrigger) {
      return;
    }

    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const nextFilters = parseRequest(filters);
          const response = await request(nextFilters);
          resolve(response);
        } catch (error) {
          setError(error);
          reject(error);
        }
      })();
    });
  }, [filters, isTrigger, request]);

  const checkConditionPass = useCallback(
    (response: ResponseGetListVendor) => {
      //* Check condition of response here to set data
      if (!isEmpty(response?.data)) {
        setData(response?.data?.data);
        setHasMore(!isEmpty(response?.data));
      }
    },
    [filters.perPage]
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
      checkConditionPass(response);
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

export default useGetVendorList;
