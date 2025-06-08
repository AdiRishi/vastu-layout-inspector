'use client';

import { useDrag } from '@/hooks/use-drag';
import { COMPASS_SIZE } from '@/lib/compass-utils';
import { useRef } from 'react';
import CompassCenter from './compass-center';
import CompassLabels from './compass-labels';
import CompassLines from './compass-lines';

interface CompassProps {
  containerWidth: number;
  containerHeight: number;
  initialX?: number;
  initialY?: number;
}

export default function Compass({ containerWidth, containerHeight, initialX = 50, initialY = 50 }: CompassProps) {
  const compassRef = useRef<HTMLDivElement>(null);

  const { position, handleMouseDown } = useDrag(
    compassRef,
    { x: initialX, y: initialY },
    {
      minX: COMPASS_SIZE / 2,
      maxX: containerWidth - COMPASS_SIZE / 2,
      minY: COMPASS_SIZE / 2,
      maxY: containerHeight - COMPASS_SIZE / 2,
    }
  );

  return (
    <div className="pointer-events-none absolute inset-0 select-none">
      <CompassLines position={position} containerWidth={containerWidth} containerHeight={containerHeight} />

      <CompassCenter ref={compassRef} position={position} onMouseDown={handleMouseDown} />

      <CompassLabels position={position} containerWidth={containerWidth} containerHeight={containerHeight} />
    </div>
  );
}
