import { useCallback, useEffect, useState } from 'react';
import reservationVendorServices from '../reservationVendor.services';
import { ResponseGetReservationVendorSuccessfulCount } from '../reservationVendor.interface';

const useGetReservationSuccessfulCount = (options: { isTrigger?: boolean } = { isTrigger: true }) => {
  const { isTrigger = true } = options;

  const [data, setData] = useState<number>(0);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>('');

  const callApi = useCallback(() => {
    return reservationVendorServices.getReservationVendorSuccessfulCount();
  }, []);

  const transformResponse = useCallback((response: ResponseGetReservationVendorSuccessfulCount) => {
    if (response) {
      setData(response?.data?.data);
    }
  }, []);

  const refetch = useCallback(async () => {
    if (!isTrigger) {
      return;
    }
    try {
      const response = await callApi();
      transformResponse(response);
    } catch (error) {
      setError(error);
    }
  }, [isTrigger]);

  useEffect(() => {
    let shouldSetData = true;
    if (!isTrigger) {
      return;
    }
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
  }, [isTrigger]);

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

export default useGetReservationSuccessfulCount;
