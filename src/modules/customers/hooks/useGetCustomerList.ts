import { useEffect, useState, useCallback } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import {  isEmpty } from 'lodash';
import { useSave } from 'stores/useStore';
import { showError } from 'helpers/toast';

import {
  Customer,
  CustomerList,
  RequestGetListCustomer,
  ResponseGetListCustomer,
} from '../customer.interface'
import CustomerService from '../customer.service';


//* Check parse body request
const parseRequest = (filters: RequestGetListCustomer) => {
  return cloneDeep({
    page: filters.page,
    perPage: filters.perPage,
    sortOrder: filters.sortOrder  ,
    sortField: filters.sortField,
    fetchAll: filters.fetchAll,
    textSearch: filters.textSearch,
    status: filters.status
  });
};

const useGetCustomerList = (
  filters: RequestGetListCustomer,
  options: { isTrigger?: boolean; refetchKey?: string } = { isTrigger: true, refetchKey: '' }
) => {
  //! State
  const { isTrigger = true, refetchKey = '' } = options;

  const save = useSave();
  const [data, setData] = useState<CustomerList>();
  const [isLoading, setLoading] = useState(false);
  const [isRefetching, setRefetching] = useState(false);
  const [isFetchingPage, setFetchingPage] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [hasMore, setHasMore] = useState(false);

  //! Function
  const fetch: () => Promise<ResponseGetListCustomer> | undefined = useCallback(() => {
    if (!isTrigger) {
      return;
    }
   
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const nextFilters = parseRequest(filters);
          const response = await CustomerService.getCustomerList(nextFilters);
          resolve(response);
        } catch (error) {
          setError(error);
          reject(error);
        }
      })();
    });
  }, [filters, isTrigger]);

  const checkConditionPass = useCallback(
    (response: ResponseGetListCustomer) => {
      //* Check condition of response here to set data
      if (!isEmpty(response?.data)) {
        setData(response.data.data);
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
      const response = await CustomerService.getCustomerList(nextFilters);
      checkConditionPass(response);
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

export default useGetCustomerList;
