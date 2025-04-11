// src/components/ui/SkeletonBlock.tsx
import React from 'react';
import clsx from 'clsx';

interface SkeletonBlockProps {
  height?: string;
  width?: string;
  rounded?: string;
  className?: string;
}

const SkeletonBlock: React.FC<SkeletonBlockProps> = ({
  height = 'h-4',
  width = 'w-full',
  rounded = 'rounded-md',
  className,
}) => {
  return (
    <div
      className={clsx(
        'animate-pulse bg-[var(--skeleton-color)]',
        height,
        width,
        rounded,
        className
      )}
    />
  );
};

export default SkeletonBlock;
