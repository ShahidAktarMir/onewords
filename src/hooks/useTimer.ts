import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import { decrementTimer, submitTest } from '@/store/slices/testSlice';

export const useTimer = () => {
  const dispatch = useAppDispatch();
  const { timeLeft, isTestActive } = useAppSelector(state => state.test);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isTestActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        dispatch(decrementTimer());
      }, 1000);
    } else if (isTestActive && timeLeft <= 0) {
      dispatch(submitTest());
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isTestActive, timeLeft, dispatch]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const getTimerColorClass = (seconds: number): string => {
    if (seconds <= 60) return 'text-error-600 animate-pulse';
    if (seconds <= 300) return 'text-warning-600';
    return 'text-slate-700';
  };

  return {
    timeLeft,
    formatTime,
    getTimerColorClass,
  };
};