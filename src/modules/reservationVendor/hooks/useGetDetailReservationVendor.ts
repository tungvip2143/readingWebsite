import { useCallback, useEffect, useState } from 'react';
import {
  ReservationVendor,
  ResponseGetDetailReservationVendor,
} from '../reservationVendor.interface';
import ReservationVendorServices from '../reservationVendor.services';

const useGetDetailReservationVendor = (id: number | string, isTrigger: boolean = false) => {
  const [data, setData] = useState<ReservationVendor>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>('');

  const callApi = useCallback(() => {
    return ReservationVendorServices.getDetailReservationVendor(id);
  }, []);

  const transformResponse = useCallback((response: ReservationVendor) => {
    if (response) {
      setData(response);
    }
  }, []);

  const refetch = useCallback(async () => {
    try {
      const response = await callApi();
      transformResponse(response?.data?.data);
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
            transformResponse(response?.data?.data);
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

export default useGetDetailReservationVendor;
