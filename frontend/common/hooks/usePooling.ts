import { useEffect, useRef } from 'react';
import { usePageVisibility } from './usePageVisiability';

export const usePolling = (
  fn: () => any,
  {
    interval,
    disabled,
  }: {
    interval: number;
    disabled?: boolean;
  }
) => {
  const timerIdRef = useRef<ReturnType<typeof setInterval>>();
  const lastPollTimeRef = useRef<number>(0);
  const isPageVisible = usePageVisibility();

  useEffect(() => {
    if (disabled) return;
    const pollNotifications = async () => {
      fn();
      lastPollTimeRef.current = Date.now();
    };

    const startPolling = () => {
      pollNotifications();
      timerIdRef.current = setInterval(pollNotifications, interval);
    };

    const stopPolling = () => {
      if (!timerIdRef.current) return;
      clearInterval(timerIdRef.current);
    };

    if (isPageVisible) {
      if (Date.now() - lastPollTimeRef.current < interval) return;
      startPolling();
    } else stopPolling();

    return () => {
      stopPolling();
    };
  }, [isPageVisible, disabled, interval, fn]);
};
