import { useCallback, useEffect, useState } from 'react';
import { PrefixPhone, ResponseGetListPrefixPhone } from '../prefixPhone.interface';
import prefixPhoneServices from '../prefixPhone.services';

const useGetListPrefixPhone = () => {
  const [data, setData] = useState<PrefixPhone[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>('');

  const callApi = useCallback(() => {
    return prefixPhoneServices.getListPrefixPhone();
  }, []);

  const transformResponse = useCallback((response: ResponseGetListPrefixPhone) => {
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

export default useGetListPrefixPhone;
