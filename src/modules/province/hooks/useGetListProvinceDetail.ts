import { useCallback, useEffect, useState } from 'react';
import { Provinces, ResponseGetListProvinceDetail } from '../province.interface';
import provinceServices from '../province.services';

const useGetListProvinceDetail = () => {
  const [data, setData] = useState<Provinces[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>('');

  const callApi = useCallback(() => {
    return provinceServices.getListProvinceDetail();
  }, []);

  const transformResponse = useCallback((response: ResponseGetListProvinceDetail) => {
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

export default useGetListProvinceDetail;
