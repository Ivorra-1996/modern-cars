import { useEffect, useState } from "react";

interface CountdownProps {
  target: string;
  prefix?: string;
  expiredLabel?: string;
}

const formatDiff = (ms: number): string | null => {
  if (ms <= 0) return null;
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m ${seconds}s`;
};

export const Countdown = ({ target, prefix, expiredLabel = "Finalizada" }: CountdownProps) => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const formatted = formatDiff(new Date(target).getTime() - now);

  if (!formatted) return <>{expiredLabel}</>;
  return <>{prefix ? `${prefix} ${formatted}` : formatted}</>;
};
