'use client';

import { useFileUpload } from '@/hooks/use-file-upload';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  onImageLoad: (imageSrc: string, width: number, height: number) => void;
  onImageRemove: () => void;
}

export default function ImageUpload({ onImageLoad, onImageRemove }: ImageUploadProps) {
  const processImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageSrc = e.target?.result as string;

      // Create an image element to get dimensions
      const img = new Image();
      img.onload = () => {
        onImageLoad(imageSrc, img.width, img.height);
      };
      img.src = imageSrc;
    };
    reader.readAsDataURL(file);
  };

  const { dragOver, fileInputRef, handleDrop, handleDragOver, handleDragLeave, handleFileInputChange, openFileDialog } =
    useFileUpload({
      onFileSelect: processImageFile,
      acceptedTypes: ['image/*'],
    });

  return (
    <div className="h-full w-full">
      <div
        className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'} `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={openFileDialog}
      >
        <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
        <p className="mb-2 text-lg font-medium text-gray-700">Drop your image here, or click to browse</p>
        <p className="text-sm text-gray-500">Supports JPG, PNG, GIF, WebP</p>

        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInputChange} className="hidden" />
      </div>
    </div>
  );
}
