'use client';

import { useState, useRef, useEffect } from 'react';

interface CompassProps {
  containerWidth: number;
  containerHeight: number;
  initialX?: number;
  initialY?: number;
}

export default function Compass({ containerWidth, containerHeight, initialX = 50, initialY = 50 }: CompassProps) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const compassRef = useRef<HTMLDivElement>(null);

  const compassSize = 60; // Size of the central compass circle

  // Direction configurations
  const directions = [
    { angle: 0, label: 'N', name: 'North' },
    { angle: 45, label: 'NE', name: 'Northeast' },
    { angle: 90, label: 'E', name: 'East' },
    { angle: 135, label: 'SE', name: 'Southeast' },
    { angle: 180, label: 'S', name: 'South' },
    { angle: 225, label: 'SW', name: 'Southwest' },
    { angle: 270, label: 'W', name: 'West' },
    { angle: 315, label: 'NW', name: 'Northwest' },
  ];

  // Calculate line end points to extend to container edges
  const getLineEndPoint = (angle: number) => {
    const radians = (angle - 90) * (Math.PI / 180); // Adjust for SVG coordinate system
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);

    // Calculate max distance to extend in each direction
    const maxDistance = Math.max(containerWidth, containerHeight);

    // Calculate end point by extending the line to maximum distance
    const endX = position.x + cos * maxDistance;
    const endY = position.y + sin * maxDistance;

    // Clamp to container boundaries
    const clampedX = Math.max(0, Math.min(containerWidth, endX));
    const clampedY = Math.max(0, Math.min(containerHeight, endY));

    return { x: clampedX, y: clampedY };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (compassRef.current) {
      const rect = compassRef.current.getBoundingClientRect();
      const parentRect = compassRef.current.parentElement?.getBoundingClientRect();
      if (parentRect) {
        setDragOffset({
          x: e.clientX - rect.left - compassSize / 2,
          y: e.clientY - rect.top - compassSize / 2,
        });
        setIsDragging(true);
      }
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && compassRef.current?.parentElement) {
      const parentRect = compassRef.current.parentElement.getBoundingClientRect();
      const newX = e.clientX - parentRect.left - dragOffset.x;
      const newY = e.clientY - parentRect.top - dragOffset.y;

      // Constrain to container bounds
      const constrainedX = Math.max(compassSize / 2, Math.min(containerWidth - compassSize / 2, newX));
      const constrainedY = Math.max(compassSize / 2, Math.min(containerHeight - compassSize / 2, newY));

      setPosition({ x: constrainedX, y: constrainedY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* SVG for compass lines */}
      <svg
        width={containerWidth}
        height={containerHeight}
        className="absolute inset-0"
        style={{ pointerEvents: 'none' }}
      >
        {directions.map((direction) => {
          const endPoint = getLineEndPoint(direction.angle);
          return (
            <line
              key={direction.label}
              x1={position.x}
              y1={position.y}
              x2={endPoint.x}
              y2={endPoint.y}
              stroke="#3b82f6"
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity="0.7"
            />
          );
        })}
      </svg>

      {/* Draggable compass center */}
      <div
        ref={compassRef}
        className="pointer-events-auto absolute flex cursor-move items-center justify-center rounded-full border-4 border-blue-500 bg-white shadow-lg"
        style={{
          width: compassSize,
          height: compassSize,
          left: position.x - compassSize / 2,
          top: position.y - compassSize / 2,
        }}
        onMouseDown={handleMouseDown}
        title="Drag to move compass"
      >
        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
      </div>

      {/* Direction labels */}
      {directions.map((direction) => {
        const radians = (direction.angle - 90) * (Math.PI / 180);
        const labelDistance = compassSize / 2 + 25;
        const labelX = position.x + Math.cos(radians) * labelDistance;
        const labelY = position.y + Math.sin(radians) * labelDistance;

        return (
          <div
            key={`label-${direction.label}`}
            className="pointer-events-none absolute rounded bg-blue-600 px-2 py-1 text-sm font-bold text-white shadow-lg"
            style={{
              left: labelX - 15,
              top: labelY - 12,
              transform: 'translate(-50%, -50%)',
            }}
            title={direction.name}
          >
            {direction.label}
          </div>
        );
      })}
    </div>
  );
}
