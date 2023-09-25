import { useCallback, useEffect, useState } from 'react';
import { ResponseGetDetailHotDeal } from '../hotDeal.interface';
import HotDealServices from '../hotDeal.services';

const useGetDetailHotDeal = (id: number | string, isTrigger: boolean = false) => {
  const [data, setData] = useState<ResponseGetDetailHotDeal>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>('');

  const callApi = useCallback(() => {
    return HotDealServices.getDetailHotDeal(id);
  }, []);

  const transformResponse = useCallback((response: ResponseGetDetailHotDeal) => {
    if (response) {
      setData(response);
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

export default useGetDetailHotDeal;
