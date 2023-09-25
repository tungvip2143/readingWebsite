import { useCallback, useEffect, useState } from 'react';
import { ResponseGetProfile } from '../profileLocalFriend.interface';
import profileService from '../profileLocalFriend.services';
import { TourGuide } from 'modules/tourGuide/tourGuide.interface';

const useGetProfile = (
  options: { isTrigger?: boolean; refetchKey?: string } = { isTrigger: true, refetchKey: '' }
) => {
  const { isTrigger = true, refetchKey = '' } = options;

  const [data, setData] = useState<TourGuide>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>('');

  const callApi = useCallback(() => {
    return profileService.getProfile();
  }, []);

  const transformResponse = useCallback((response: ResponseGetProfile) => {
    if (response) {
      setData(response.data.data);
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

export default useGetProfile;
