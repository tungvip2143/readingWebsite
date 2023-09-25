import { useCallback, useEffect, useState } from 'react';
import { ResponseGetListTourCategory, TourCategory } from '../tour-category.interface';
import tourCategoryServices from '../tour-category.services';

const useGetListTourCategory = (options: { isTrigger?: boolean } = { isTrigger: true }) => {
  const { isTrigger = true } = options;

  const [data, setData] = useState<TourCategory[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>('');

  const callApi = useCallback(() => {
    return tourCategoryServices.getListTourCategory();
  }, []);

  const transformResponse = useCallback((response: ResponseGetListTourCategory) => {
    if (response) {
      setData(response?.data?.data);
    }
  }, []);

  const refetch = useCallback(async () => {
    if (!isTrigger) {
      return;
    }
    try {
      const response = await callApi();
      transformResponse(response);
    } catch (error) {
      setError(error);
    }
  }, [isTrigger]);

  useEffect(() => {
    let shouldSetData = true;
    if (!isTrigger) {
      return;
    }
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
  }, [isTrigger]);

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

export default useGetListTourCategory;
