import { useCallback, useEffect, useState } from 'react';
import { Customer, ResponseGetDetailCustomer } from '../customer.interface';
import customerService from '../customer.service';
import { useSave } from 'stores/useStore';

const useGetDetailCustomer = (
  id: number | string,
  options: { isTrigger?: boolean; refetchKey?: string } = { isTrigger: true, refetchKey: '' }
) => {
  const { isTrigger = true, refetchKey = '' } = options;

  const [data, setData] = useState<Customer>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const save = useSave();

  const callApi = useCallback(() => {
    return customerService.getDetailCustomer(id);
  }, []);

  const transformResponse = useCallback((response: ResponseGetDetailCustomer) => {
    if (response) {
      setData(response.data.data);
    }
  }, []);

  const refetch = useCallback(async () => {
    try {
      const response = await callApi();
      transformResponse(response);
    } catch (error) {
      setError(error);
    }
  }, [id]);

  useEffect(() => {
    if (refetchKey) {
      save(refetchKey, refetch);
    }
  }, [save, refetchKey, refetch]);

  useEffect(() => {
    let shouldSetData = true;

    if (isTrigger) {
      (async () => {
        try {
          setLoading(true);
          const response = await callApi();
          if (shouldSetData) {
            transformResponse(response);
          }
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      })();

      return () => {
        shouldSetData = false;
      };
    }
  }, [isTrigger]);

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

export default useGetDetailCustomer;
