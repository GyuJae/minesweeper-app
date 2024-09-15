import { useEffect, useRef, useState } from 'react';

interface UseTimerReturn {
  seconds: number;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

export const useTimer = (initialSeconds: number = 0): UseTimerReturn => {
  const [seconds, setSeconds] = useState<number>(initialSeconds);
  const [isActive, setIsActive] = useState<boolean>(false);
  const intervalReference = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      intervalReference.current = setInterval(() => {
        setSeconds((previousSeconds) => previousSeconds + 1);
      }, 1000);
    } else {
      if (intervalReference.current) clearInterval(intervalReference.current);
    }

    return () => {
      if (intervalReference.current) clearInterval(intervalReference.current);
    };
  }, [isActive]);

  const start = () => {
    setIsActive(true);
  };

  const stop = () => {
    setIsActive(false);
  };

  const reset = () => {
    setIsActive(false);
    setSeconds(initialSeconds);
  };

  return { seconds, start, stop, reset };
};
