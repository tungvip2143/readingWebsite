import { useCallback, useEffect, useState } from 'react';
import {  ResponseGetListWards, Wards } from '../province.interface';
import provinceServices from '../province.services';

const useGetListWards = (districtCode: string, isTrigger: boolean = false) => {
  const [data, setData] = useState<Wards[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>('');

  const callApi = useCallback(() => {
    return provinceServices.getListWards(districtCode);
  }, [districtCode]);

  const transformResponse = useCallback((response: ResponseGetListWards) => {
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
  }, [isTrigger, districtCode]);

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

export default useGetListWards;
