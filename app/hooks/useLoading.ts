import { useState, useCallback } from 'react';

type UseLoadingHook = {
  isLoading: boolean;
  // eslint-disable-next-line no-unused-vars
  startLoading: (callback: () => void) => void;
  // eslint-disable-next-line no-unused-vars
  setGlobalLoadingTime: (time: number) => void;
};

const useLoading = (initialLoadingTime: number = 100): UseLoadingHook => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingTime, setLoadingTime] = useState<number>(initialLoadingTime);

  const startLoading = useCallback(
    (callback: () => void) => {
      setIsLoading(true);
      setTimeout(() => {
        callback();
        setIsLoading(false);
      }, loadingTime);
    },
    [loadingTime],
  );

  const setGlobalLoadingTime = (time: number) => {
    setLoadingTime(time);
  };

  return { isLoading, startLoading, setGlobalLoadingTime };
};

export default useLoading;
