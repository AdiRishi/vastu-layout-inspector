import { useCallback } from 'react';

export const useClipboardImage = () => {
  const pasteImageFromClipboard = useCallback(async (onImageSelect: (file: File) => void) => {
    try {
      if (!navigator.clipboard || !navigator.clipboard.read) {
        throw new Error('Clipboard API not supported');
      }

      const clipboardItems = await navigator.clipboard.read();

      for (const clipboardItem of clipboardItems) {
        for (const type of clipboardItem.types) {
          if (type.startsWith('image/')) {
            const blob = await clipboardItem.getType(type);
            const file = new File([blob], 'pasted-image.png', { type });
            onImageSelect(file);
            return;
          }
        }
      }

      // No image found in clipboard
      console.log('No image found in clipboard');
    } catch (error) {
      console.error('Failed to read from clipboard:', error);
      // You might want to show a toast notification here
    }
  }, []);

  return {
    pasteImageFromClipboard,
  };
};
