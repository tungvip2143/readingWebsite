import { useEffect, useState, useCallback } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { useSave } from 'stores/useStore';
import { showError } from 'helpers/toast';

import {
  GetListMyTourBooking,
  RequestGetListMyTourBooking,
  ResponseGetListMyTourBooking,
} from '../myTourBooking.interface';
import MyTourBookingServices from '../myTourBooking.services';
import MyBookingTourModel from 'models/myBookingTour.model';

/**
 * SNIPPET GENERATED
 * GUIDE
 * Snippet for infinite scroll with page + rowsPerPage
 * Maybe you should check function:
 * - interface Request / Response
 * - parseRequest
 * - checkConditionPass
 * - fetch
 * - refetch
 */

//* Check parse body request
const parseRequest = (filters: GetListMyTourBooking) => {
  return MyBookingTourModel.parseBodyToRequest(filters);
};

const useGetListMyTourBooking = (
  filters: GetListMyTourBooking,
  options: { isTrigger?: boolean; refetchKey?: string } = { isTrigger: true, refetchKey: '' }
) => {
  //! State
  const { isTrigger = true, refetchKey = '' } = options;

  const save = useSave();
  const [data, setData] = useState<ResponseGetListMyTourBooking>();
  const [isLoading, setLoading] = useState(false);
  const [isRefetching, setRefetching] = useState(false);
  const [isFetchingPage, setFetchingPage] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [hasMore, setHasMore] = useState(false);

  //! Function
  const fetch: () => Promise<ResponseGetListMyTourBooking> | undefined = useCallback(() => {
    if (!isTrigger) {
      return;
    }

    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const nextFilters = parseRequest(filters);
          const response = await MyTourBookingServices.getListMyTourBooking(nextFilters);
          resolve(response);
        } catch (error) {
          setError(error);
          reject(error);
        }
      })();
    });
  }, [filters, isTrigger]);

  const checkConditionPass = useCallback(
    (response: ResponseGetListMyTourBooking) => {
      //* Check condition of response here to set data
      setData(response);
      setHasMore((filters.page || 1) < response?.data?.data?.totalPage);
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
      const response = await MyTourBookingServices.getListMyTourBooking(nextFilters);
      checkConditionPass(response);
      setRefetching(false);
    } catch (error: any) {
      if (!error.isCanceled) {
        showError(error);
      }
    }
  }, [filters]);

  useEffect(() => {
    if (refetchKey) {
      save(refetchKey, refetch);
    }
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

export default useGetListMyTourBooking;
