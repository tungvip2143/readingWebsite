import { useCallback, useEffect, useState } from 'react';
import { Province, ResponseGetListProvince } from '../province.interface';
import provinceServices from '../province.services';

const useGetListAreas = () => {
  const [data, setData] = useState<Province[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>('');

  const callApi = useCallback(() => {
    return provinceServices.getListProvince();
  }, []);

  const transformResponse = useCallback((response: ResponseGetListProvince) => {
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
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

export default useGetListAreas;
