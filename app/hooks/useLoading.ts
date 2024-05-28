import { useState, useCallback } from 'react';

type UseLoadingHook = {
  isLoading: boolean;
  startLoading: (callback: () => void) => void;
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
