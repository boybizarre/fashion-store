'use client';

import { PulseLoader } from 'react-spinners';

interface IProps {
  text?: string,
  color?: string,
  loading?: boolean,
  size?: string,
}

export default function ComponentLevelLoader({ text, color, loading, size }: IProps) {
  return (
    <span className='flex gap-1 items-center'>
      {text}
      <PulseLoader
        color={color}
        loading={loading}
        size={size || 10}
        data-testid='loader'
      />
    </span>
  );
}
