import { useCallback, useEffect, useState } from 'react';
import { BookingTour, ResponseGetDetailBookingTour } from '../bookingTour.interface';
import BookingTourServices from '../bookingTour.services';

const useGetDetailBookingTour = (id: number | string, isTrigger: boolean = false) => {
  const [data, setData] = useState<BookingTour>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>('');

  const callApi = useCallback(() => {
    return BookingTourServices.getDetailBookingTour(id);
  }, []);

  const transformResponse = useCallback((response: ResponseGetDetailBookingTour) => {
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

export default useGetDetailBookingTour;
