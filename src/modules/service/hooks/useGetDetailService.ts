import { useCallback, useEffect, useState } from 'react';
import { Product, ResponseGetDetailService } from '../service.interface';
import serviceServices from '../service.services';

const useGetDetailService = (id: number | string, isTrigger: boolean = false ) => {
  const [data, setData] = useState<Product>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>('');

  const callApi = useCallback(() => {
    return serviceServices.getDetailService(id);
  }, []);

  const transformResponse = useCallback((response: ResponseGetDetailService) => {
    if (response) {
      setData(response?.data);
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

export default useGetDetailService;
