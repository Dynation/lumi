import { useState, useMemo } from 'react';

export const useRadius = (
  initial: number = 5,
  min = 0.5,
  max = 50,
  step = 0.5
) => {
  const [radius, setRadius] = useState<number>(initial);

  const boundedRadius = useMemo(() => {
    return Math.max(min, Math.min(max, radius));
  }, [radius, min, max]);

  const radiusLabel = useMemo(() => {
    return boundedRadius < 1
      ? `${Math.round(boundedRadius * 1000)} м`
      : `${boundedRadius.toFixed(1)} км`;
  }, [boundedRadius]);

  const radiusInMeters = useMemo(() => boundedRadius * 1000, [boundedRadius]);

  return {
    radius: boundedRadius,
    setRadius,
    radiusLabel,
    radiusInMeters,
    min,
    max,
    step,
  };
};
