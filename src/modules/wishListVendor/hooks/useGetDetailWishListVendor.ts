import { useCallback, useEffect, useState } from 'react';
import { ResponseGetDetailWishListVendor } from '../wishListVendor.interface';
import WishListVendorServices from '../wishListVendor.services';

const useGetDetailWishListVendor = (id: number | string, isTrigger: boolean = false) => {
  const [data, setData] = useState<ResponseGetDetailWishListVendor>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>('');

  const callApi = useCallback(() => {
    return WishListVendorServices.getDetailWishListVendor(id);
  }, []);

  const transformResponse = useCallback((response: ResponseGetDetailWishListVendor) => {
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

export default useGetDetailWishListVendor;
