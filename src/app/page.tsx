'use client';

import Compass from '@/components/compass';
import ImageUpload from '@/components/image-upload';
import { X, RotateCcw } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [containerSize, setContainerSize] = useState({ width: 800, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Update container size when window resizes
  useEffect(() => {
    const updateContainerSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerSize({ width: rect.width, height: rect.height });
      }
    };

    updateContainerSize();
    window.addEventListener('resize', updateContainerSize);
    return () => window.removeEventListener('resize', updateContainerSize);
  }, [imageSrc]);

  const handleImageLoad = (src: string, width: number, height: number) => {
    setImageSrc(src);
    setImageSize({ width, height });
  };

  const handleImageRemove = () => {
    setImageSrc(null);
    setImageSize({ width: 0, height: 0 });
  };

  const handleResetCompass = () => {
    // This will trigger a re-render of the compass with initial position
    setImageSrc(imageSrc); // Force re-render
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Vastu Layout Inspector</h1>
          <p className="text-gray-600">Upload an image and use the draggable compass to analyze directional layout</p>
        </div>

        {!imageSrc ? (
          <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
            <ImageUpload onImageLoad={handleImageLoad} onImageRemove={handleImageRemove} />
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold text-gray-900">Layout Analysis</h2>
                <button
                  onClick={handleResetCompass}
                  className="flex items-center gap-2 rounded-md bg-blue-100 px-3 py-1.5 text-sm text-blue-700 transition-colors hover:bg-blue-200"
                  title="Reset compass position"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset Compass
                </button>
              </div>
              <button
                onClick={handleImageRemove}
                className="flex items-center gap-2 rounded-md bg-red-100 px-3 py-1.5 text-sm text-red-700 transition-colors hover:bg-red-200"
              >
                <X className="h-4 w-4" />
                Remove Image
              </button>
            </div>

            <div
              ref={containerRef}
              className="relative overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-100"
              style={{
                width: '100%',
                height: '70vh',
                minHeight: '500px',
              }}
            >
              {/* Background image */}
              <img
                src={imageSrc}
                alt="Uploaded layout"
                className="h-full w-full object-contain"
                style={{
                  imageRendering: 'crisp-edges',
                }}
              />

              {/* Compass overlay */}
              <Compass
                containerWidth={containerSize.width}
                containerHeight={containerSize.height}
                initialX={containerSize.width / 2}
                initialY={containerSize.height / 2}
                key={`${containerSize.width}-${containerSize.height}`} // Force re-render when size changes
              />
            </div>

            <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
              <h3 className="mb-2 font-medium text-blue-900">Instructions:</h3>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• Click and drag the compass center (blue circle) to position it anywhere on the image</li>
                <li>• The compass shows 8 directions with lines extending to the edges</li>
                <li>• Direction labels are clearly marked: N, NE, E, SE, S, SW, W, NW</li>
                <li>• Use this to analyze the directional orientation of rooms and elements in your layout</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
