import { useCallback, useEffect, useMemo, useState } from 'react';
import tourServices from '../tour.services';
import { RequestDetailTour, ResponseDetailTour, Tour } from '../tour.interface';
import useAuth from 'hooks/useAuth';
import { useSave } from 'stores/useStore';

const useGetDetailTour = (
  id: RequestDetailTour,
  isTrigger: boolean = false,
  refetchKey?: string
) => {
  const save = useSave();
  const [data, setData] = useState<Tour>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>('');

  const auth = useAuth();
  const isLogged = auth.isLogged;

  const request = useMemo(() => {
    if (isLogged) {
      return tourServices.getDetailTour;
    }
    return tourServices.getDetailTourPublic;
  }, [isLogged]);

  const callApi = useCallback(() => {
    return request(id);
  }, [request]);

  const transformResponse = useCallback((response: ResponseDetailTour) => {
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
  }, []);

  useEffect(() => {
    save(refetchKey, refetch);
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
    }

    return () => {
      shouldSetData = false;
    };
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

export default useGetDetailTour;
