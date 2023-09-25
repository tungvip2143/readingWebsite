import { useCallback, useEffect, useState } from 'react';
import { TourGuide, ResponseGetDetailTourGuide } from '../tourGuide.interface';
import TourGuideServices from '../tourGuide.services';

const useGetDetailTourGuide = (id: number | string, isTrigger: boolean = false) => {
  const [data, setData] = useState<TourGuide>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>('');

  const callApi = useCallback(() => {
    return TourGuideServices.getDetailTourGuide(id);
  }, []);
  const transformResponse = useCallback((response: ResponseGetDetailTourGuide) => {
    if (response) {
      setData(response?.data?.data);
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

export default useGetDetailTourGuide;
