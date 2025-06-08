import { COMPASS_DIRECTIONS, calculateLabelPosition, type Position } from '@/lib/compass-utils';

interface CompassLabelsProps {
  position: Position;
}

export default function CompassLabels({ position }: CompassLabelsProps) {
  return (
    <>
      {COMPASS_DIRECTIONS.map((direction) => {
        const labelPos = calculateLabelPosition(direction.angle, position);

        return (
          <div
            key={`label-${direction.label}`}
            className="pointer-events-none absolute rounded px-2 py-1 text-xs font-bold text-white shadow-md select-none"
            style={{
              left: labelPos.x,
              top: labelPos.y,
              transform: 'translate(-50%, -50%)',
              backgroundColor: direction.color,
            }}
            title={direction.name}
          >
            {direction.label}
          </div>
        );
      })}
    </>
  );
}
