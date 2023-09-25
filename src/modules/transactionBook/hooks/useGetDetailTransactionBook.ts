import { useCallback, useEffect, useState } from 'react';
import { ResponseGetDetailTransactionBook } from '../transactionBook.interface';
import TransactionBookServices from '../transactionBook.services';

const useGetDetailTransactionBook = (id: number | string, isTrigger: boolean = false) => {
  const [data, setData] = useState<ResponseGetDetailTransactionBook>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>('');

  const callApi = useCallback(() => {
    return TransactionBookServices.getDetailTransactionBook(id);
  }, []);

  const transformResponse = useCallback((response: ResponseGetDetailTransactionBook) => {
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

export default useGetDetailTransactionBook;
