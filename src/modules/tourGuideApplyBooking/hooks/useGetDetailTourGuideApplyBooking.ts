import { useCallback, useEffect, useState } from 'react';
import { ResponseGetDetailTourGuideApplyBooking } from '../tourGuideApplyBooking.interface';
import TourGuideApplyBookingServices from '../tourGuideApplyBooking.services';

const useGetDetailTourGuideApplyBooking = (id: number | string, isTrigger: boolean = false) => {
  const [data, setData] = useState<ResponseGetDetailTourGuideApplyBooking>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>('');

  const callApi = useCallback(() => {
    return TourGuideApplyBookingServices.getDetailTourGuideApplyBooking(id);
  }, []);

  const transformResponse = useCallback((response: ResponseGetDetailTourGuideApplyBooking) => {
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

export default useGetDetailTourGuideApplyBooking;
