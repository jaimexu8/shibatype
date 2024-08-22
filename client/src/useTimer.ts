import { useEffect, useState } from "react";

export default function useCountdown() {
  const [seconds, setSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    if (isPaused) return;

    const timeout = setTimeout(() => {
      setSeconds(seconds + 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [seconds, isPaused]);

  function start() {
    setSeconds(0);
    setIsPaused(false);
  }

  function pause() {
    setIsPaused(true);
  }

  function reset() {
    setSeconds(0);
    setIsPaused(true);
  }

  return { seconds, start, pause, reset };
}
