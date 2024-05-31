import { useEffect, useState } from "react";

export default function useCountdown() {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    if (isPaused || secondsLeft <= 0) return;

    const timeout = setTimeout(() => {
      setSecondsLeft(secondsLeft - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [secondsLeft, isPaused]);

  function start(seconds: number) {
    setSecondsLeft(seconds);
    setIsPaused(false);
  }

  function pause() {
    setIsPaused(true);
  }

  return { secondsLeft, start, pause };
}
