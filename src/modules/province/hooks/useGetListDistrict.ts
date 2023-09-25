import { useCallback, useEffect, useState } from 'react';
import { District, ResponseGetListDistrict } from '../province.interface';
import provinceServices from '../province.services';

const useGetListDistrict = (provinceCode: string, isTrigger: boolean = false) => {
  const [data, setData] = useState<District[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>('');

  const callApi = useCallback(() => {
    return provinceServices.getListDistrict(provinceCode);
  }, [provinceCode]);

  const transformResponse = useCallback((response: ResponseGetListDistrict) => {
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
  }, [isTrigger, provinceCode]);

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

export default useGetListDistrict;
