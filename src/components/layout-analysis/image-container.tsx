import Compass from '@/components/compass';
import { forwardRef } from 'react';

interface ImageContainerProps {
  imageSrc: string;
  containerWidth: number;
  containerHeight: number;
  onSizeChange: (width: number, height: number) => void;
}

const ImageContainer = forwardRef<HTMLDivElement, ImageContainerProps>(
  ({ imageSrc, containerWidth, containerHeight }, ref) => {
    return (
      <div
        ref={ref}
        className="relative overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-100"
        style={{
          width: '100%',
          height: '70vh',
          minHeight: '500px',
        }}
      >
        <img
          src={imageSrc}
          alt="Uploaded layout"
          className="h-full w-full object-contain"
          style={{ imageRendering: 'crisp-edges' }}
        />

        <Compass
          containerWidth={containerWidth}
          containerHeight={containerHeight}
          initialX={containerWidth / 2}
          initialY={containerHeight / 2}
          key={`${containerWidth}-${containerHeight}`}
        />
      </div>
    );
  }
);

ImageContainer.displayName = 'ImageContainer';

export default ImageContainer;
