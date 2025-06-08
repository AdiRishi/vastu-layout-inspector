import { type Position } from '@/lib/compass-utils';

interface RotationHandleProps {
  position: Position;
  onMouseDown: (e: React.MouseEvent) => void;
}

const HANDLE_OFFSET = 40; // The distance from the center of the compass

export default function RotationHandle({ position, onMouseDown }: RotationHandleProps) {
  const handleStyle: React.CSSProperties = {
    position: 'absolute',
    left: position.x,
    top: position.y - HANDLE_OFFSET,
    transform: 'translate(-50%, -50%)',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: 'rgba(220, 38, 38, 0.9)', // A strong red color
    border: '2px solid white',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    cursor: 'grab',
    pointerEvents: 'all',
  };

  return <div style={handleStyle} onMouseDown={onMouseDown} />;
}
