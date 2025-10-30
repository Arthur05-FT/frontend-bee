"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CountdownProps {
  seconds: number;
  onComplete?: () => void;
  className?: string;
}

function Countdown({
  seconds: initialSeconds,
  onComplete,
  className,
}: CountdownProps) {
  const [seconds, setSeconds] = React.useState(initialSeconds);

  React.useEffect(() => {
    if (seconds <= 0) {
      if (onComplete) onComplete();
      return;
    }

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, onComplete]);

  return (
    <span className={cn("tabular-nums", className)}>{seconds}seconds.</span>
  );
}

export { Countdown };
