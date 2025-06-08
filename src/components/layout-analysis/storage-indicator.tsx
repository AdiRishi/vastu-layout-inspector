interface StorageIndicatorProps {
  isVisible: boolean;
}

export default function StorageIndicator({ isVisible }: StorageIndicatorProps) {
  if (!isVisible) return null;

  return (
    <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3">
      <p className="text-sm text-green-800">✅ Image restored from previous session</p>
    </div>
  );
}
