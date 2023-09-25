import { useCallback, useEffect, useState } from 'react';
import { Vendor, ResponseGetDetailVendor } from '../vendor.interface';
import vendorServices from '../vendor.services';
import useAuth from 'hooks/useAuth';
import { useSave } from 'stores/useStore';

const useGetDetailVendor = (
  id: number | string,
  isTrigger: boolean = false,
  refetchKey?: string
) => {
  const save = useSave();
  const [data, setData] = useState<Vendor>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>('');

  const auth = useAuth();
  const isLogged = auth.isLogged;
  const callApi = useCallback(() => {
    if (isLogged) {
      return vendorServices.getDetailVendor(id);
    }
    return vendorServices.getDetailVendorPublic(id);
  }, [isLogged]);

  const transformResponse = useCallback((response: ResponseGetDetailVendor) => {
    if (response) {
      setData(response?.data.data);
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

export default useGetDetailVendor;
