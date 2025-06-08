export default function InstructionsPanel() {
  return (
    <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
      <h3 className="mb-2 font-medium text-blue-900">Instructions:</h3>
      <ul className="space-y-1 text-sm text-blue-800">
        <li>• Click and drag the compass center (blue circle) to position it anywhere on the image</li>
        <li>• The compass shows 8 directions with lines extending to the edges</li>
        <li>• Direction labels are clearly marked: N, NE, E, SE, S, SW, W, NW</li>
        <li>• Use this to analyze the directional orientation of rooms and elements in your layout</li>
        <li>• Your image is automatically saved locally and will persist after page refresh</li>
      </ul>
    </div>
  );
}
