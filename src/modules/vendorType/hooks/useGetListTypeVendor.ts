import { useCallback, useEffect, useState } from 'react';
import { VendorType, ResponseGetListTypeVendor } from '../vendorType.interface';
import vendorTypeServices from '../vendorType.services';

const useGetListTypeVendor = () => {
  const [data, setData] = useState<VendorType[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>('');

  const callApi = useCallback(() => {
    return vendorTypeServices.getListTypeVendor();
  }, []);

  const transformResponse = useCallback((response: ResponseGetListTypeVendor) => {
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

export default useGetListTypeVendor;
