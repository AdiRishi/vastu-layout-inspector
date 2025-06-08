import { X, RotateCcw } from 'lucide-react';

interface AnalysisHeaderProps {
  onResetCompass: () => void;
  onRemoveImage: () => void;
}

export default function AnalysisHeader({ onResetCompass, onRemoveImage }: AnalysisHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-900">Layout Analysis</h2>
        <button
          onClick={onResetCompass}
          className="flex items-center gap-2 rounded-md bg-blue-100 px-3 py-1.5 text-sm text-blue-700 transition-colors hover:bg-blue-200"
          title="Reset compass position"
        >
          <RotateCcw className="h-4 w-4" />
          Reset Compass
        </button>
      </div>
      <button
        onClick={onRemoveImage}
        className="flex items-center gap-2 rounded-md bg-red-100 px-3 py-1.5 text-sm text-red-700 transition-colors hover:bg-red-200"
      >
        <X className="h-4 w-4" />
        Remove Image
      </button>
    </div>
  );
}
