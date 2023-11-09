import { useCallback, useEffect, useState } from 'react';
import { Article, ResponseGetDetailArticle } from '../article.interface';
import ArticleServices from '../article.services';

const useGetDetailArticle = (id: number | string, isTrigger: boolean = false) => {
  const [data, setData] = useState<Article>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>('');

  const callApi = useCallback(() => {
    return ArticleServices.getDetailArticle(id);
  }, []);
  const transformResponse = useCallback((response: ResponseGetDetailArticle) => {
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

export default useGetDetailArticle;
