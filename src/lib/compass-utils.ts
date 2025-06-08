export interface Direction {
  angle: number;
  label: string;
  name: string;
}

export interface Position {
  x: number;
  y: number;
}

export const COMPASS_DIRECTIONS: Direction[] = [
  { angle: 0, label: 'N', name: 'North' },
  { angle: 45, label: 'NE', name: 'Northeast' },
  { angle: 90, label: 'E', name: 'East' },
  { angle: 135, label: 'SE', name: 'Southeast' },
  { angle: 180, label: 'S', name: 'South' },
  { angle: 225, label: 'SW', name: 'Southwest' },
  { angle: 270, label: 'W', name: 'West' },
  { angle: 315, label: 'NW', name: 'Northwest' },
];

export const COMPASS_SIZE = 60;

/**
 * Calculate the end point of a compass line that extends to the container edge
 */
export function calculateLineEndPoint(
  angle: number,
  position: Position,
  containerWidth: number,
  containerHeight: number
): Position {
  // Convert compass angle to radians (North = 0°, clockwise)
  // In screen coordinates: North = -90° (up), East = 0° (right)
  const radians = (angle - 90) * (Math.PI / 180);
  const dx = Math.cos(radians);
  const dy = Math.sin(radians);

  // Calculate intersection with each edge of the container
  const intersections = [];

  // Top edge (y = 0)
  if (dy < 0) {
    const t = -position.y / dy;
    const x = position.x + t * dx;
    if (x >= 0 && x <= containerWidth) {
      intersections.push({ x, y: 0, distance: t });
    }
  }

  // Bottom edge (y = containerHeight)
  if (dy > 0) {
    const t = (containerHeight - position.y) / dy;
    const x = position.x + t * dx;
    if (x >= 0 && x <= containerWidth) {
      intersections.push({ x, y: containerHeight, distance: t });
    }
  }

  // Left edge (x = 0)
  if (dx < 0) {
    const t = -position.x / dx;
    const y = position.y + t * dy;
    if (y >= 0 && y <= containerHeight) {
      intersections.push({ x: 0, y, distance: t });
    }
  }

  // Right edge (x = containerWidth)
  if (dx > 0) {
    const t = (containerWidth - position.x) / dx;
    const y = position.y + t * dy;
    if (y >= 0 && y <= containerHeight) {
      intersections.push({ x: containerWidth, y, distance: t });
    }
  }

  // Find the closest intersection (smallest positive distance)
  const validIntersections = intersections.filter((i) => i.distance > 0);
  if (validIntersections.length === 0) {
    // Fallback - should not happen
    return { x: position.x, y: position.y };
  }

  const closest = validIntersections.reduce((min, current) => (current.distance < min.distance ? current : min));

  return { x: closest.x, y: closest.y };
}

/**
 * Calculate the position for a direction label around the compass
 */
export function calculateLabelPosition(
  angle: number,
  compassPosition: Position,
  distance: number = COMPASS_SIZE / 2 + 30
): Position {
  const radians = (angle - 90) * (Math.PI / 180);
  return {
    x: compassPosition.x + Math.cos(radians) * distance,
    y: compassPosition.y + Math.sin(radians) * distance,
  };
}
