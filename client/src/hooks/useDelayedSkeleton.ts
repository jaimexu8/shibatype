import { useState, useEffect } from 'react';

export function useDelayedSkeleton(loading: boolean, delayMs: number = 200) {
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => setShowSkeleton(true), delayMs);
      return () => clearTimeout(timer);
    } else {
      setShowSkeleton(false);
    }
  }, [loading, delayMs]);

  return showSkeleton;
}
