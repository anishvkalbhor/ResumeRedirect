"use client";

import { useState, useEffect } from "react";

type ProgressBarProps = {
  onComplete: () => void;
  disabled?: boolean;
  accelerated?: boolean;
};

export default function ProgressBar({
  onComplete,
  disabled = false,
  accelerated = false,
}: ProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (disabled) return;

    const increment = accelerated ? 4 : 2;
    const interval = accelerated ? 30 : 50;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 100);
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete, disabled, accelerated]);

  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-slate-400">Redirecting to resume...</span>
        <span className="text-sm text-slate-400">{progress}%</span>
      </div>
      <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-slate-400 transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
