'use client';

import ImageUpload from '@/components/image-upload';
import AnalysisHeader from '@/components/layout-analysis/analysis-header';
import ImageContainer from '@/components/layout-analysis/image-container';
import InstructionsPanel from '@/components/layout-analysis/instructions-panel';
import { useContainerSize } from '@/hooks/use-container-size';
import { useImageStorage } from '@/hooks/use-image-storage';
import { useRef, useState } from 'react';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [resetKey, setResetKey] = useState(0);
  const { imageData, saveImage, clearStoredImage } = useImageStorage();
  const containerSize = useContainerSize(containerRef, [imageData]);

  const handleImageLoad = (src: string, width: number, height: number) => {
    saveImage(src, width, height);
  };

  const handleImageRemove = () => {
    clearStoredImage();
  };

  const handleResetCompass = () => {
    // Increment reset key to force compass to re-render with initial position
    setResetKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Vastu Layout Inspector</h1>
          <p className="text-gray-600">Upload an image and use the draggable compass to analyze directional layout</p>
        </header>

        {!imageData ? (
          <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
            <ImageUpload onImageLoad={handleImageLoad} onImageRemove={handleImageRemove} />
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <AnalysisHeader onResetCompass={handleResetCompass} onRemoveImage={handleImageRemove} />

            <ImageContainer
              ref={containerRef}
              imageSrc={imageData.src}
              containerWidth={containerSize.width}
              containerHeight={containerSize.height}
              resetKey={resetKey}
            />

            <InstructionsPanel />
          </div>
        )}
      </div>
    </div>
  );
}
