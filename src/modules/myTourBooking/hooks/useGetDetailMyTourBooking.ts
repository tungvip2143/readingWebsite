import { useCallback, useEffect, useState } from 'react';
import { ResponseGetDetailMyTourBooking } from '../myTourBooking.interface';
import MyTourBookingServices from '../myTourBooking.services';

const useGetDetailMyTourBooking = (id: number | string, isTrigger: boolean = false) => {
  const [data, setData] = useState<ResponseGetDetailMyTourBooking>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>('');

  const callApi = useCallback(() => {
    return MyTourBookingServices.getDetailMyTourBooking(id);
  }, []);

  const transformResponse = useCallback((response: ResponseGetDetailMyTourBooking) => {
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

export default useGetDetailMyTourBooking;
