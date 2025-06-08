'use client';

import ImageUpload from '@/components/image-upload';
import AnalysisHeader from '@/components/layout-analysis/analysis-header';
import ImageContainer from '@/components/layout-analysis/image-container';
import InstructionsPanel from '@/components/layout-analysis/instructions-panel';
import StorageIndicator from '@/components/layout-analysis/storage-indicator';
import { useContainerSize } from '@/hooks/use-container-size';
import { useImageStorage } from '@/hooks/use-image-storage';
import { useRef } from 'react';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { imageData, isRestoredFromStorage, saveImage, clearStoredImage } = useImageStorage();
  const containerSize = useContainerSize(containerRef, [imageData]);

  const handleImageLoad = (src: string, width: number, height: number) => {
    saveImage(src, width, height);
  };

  const handleImageRemove = () => {
    clearStoredImage();
  };

  const handleResetCompass = () => {
    // Force re-render of compass by updating image data
    if (imageData) {
      saveImage(imageData.src, imageData.width, imageData.height);
    }
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
            <StorageIndicator isVisible={isRestoredFromStorage} />

            <AnalysisHeader onResetCompass={handleResetCompass} onRemoveImage={handleImageRemove} />

            <ImageContainer
              ref={containerRef}
              imageSrc={imageData.src}
              containerWidth={containerSize.width}
              containerHeight={containerSize.height}
              onSizeChange={() => {}} // Not needed anymore as we use the hook
            />

            <InstructionsPanel />
          </div>
        )}
      </div>
    </div>
  );
}
