import { useState, useCallback } from 'react';
import { uploadImage } from '../services/api';
import { compressImage } from '../utils/imageHelpers';

/**
 * Hook for handling image uploads.
 *
 * MODE 1 (API mode): When VITE_API_BASE_URL is set, uploads to backend and returns CDN URL.
 * MODE 2 (Local mode): When no API, compresses to base64 (current behavior, for dev/demo).
 *
 * Usage:
 *   const { upload, isUploading } = useImageUpload();
 *   const imageUrl = await upload(file);
 */
export default function useImageUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const apiMode = !!import.meta.env.VITE_API_BASE_URL;

  const upload = useCallback(async (file) => {
    if (!file) return null;

    setIsUploading(true);
    try {
      if (apiMode) {
        // Production: Upload to server, get CDN URL back
        const url = await uploadImage(file);
        return url; // e.g. "https://cdn.trafasa.com/storefront/abc.jpg"
      } else {
        // Dev/Demo: Compress and use base64
        try {
          return await compressImage(file, 1200, 0.8);
        } catch {
          return await readAsDataURL(file);
        }
      }
    } finally {
      setIsUploading(false);
    }
  }, [apiMode]);

  return { upload, isUploading };
}

function readAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
