import { useCallback, useEffect, useState } from 'react';
import todoServices from '../todo.services';
import { ResponseGetTodoList, Todo } from '../todo.interface';

const useGetTodoList = () => {
  const [data, setData] = useState<Todo[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>('');

  const callApi = useCallback(() => {
    return todoServices.getTodoList();
  }, []);

  const transformResponse = useCallback((response: ResponseGetTodoList) => {
    if (response) {
      setData(response?.data);
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

export default useGetTodoList;
