import { useRef, useState } from 'react';

import type { CropArea } from '../_lib/cropImageToFile';

import { cropImageToFile } from '../_lib/cropImageToFile';
import { useObjectUrl } from './useObjectUrl';

interface UseImageUploadProps {
  imageFile?: File | null;
  preview?: string | null;
  removed: boolean;
  setImageFile: (file: File | null) => void;
  setRemoved: (removed: boolean) => void;
}

function useImageUpload({
  preview,
  imageFile,
  setImageFile,
  removed,
  setRemoved
}: UseImageUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [cropArea, setCropArea] = useState<CropArea | null>(null);

  const previewUrl = useObjectUrl(imageFile);
  const cropImageUrl = useObjectUrl(sourceFile);

  const resetInput = () => {
    if (inputRef.current) inputRef.current.value = '';
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSourceFile(file);
    resetInput();
  };

  const applyCrop = async () => {
    if (!cropImageUrl || !cropArea) return;
    const cropped = await cropImageToFile(cropImageUrl, cropArea);
    setImageFile(cropped);
    setSourceFile(null);
    setRemoved(false);
  };

  const cancelCrop = () => {
    setSourceFile(null);
    setCropArea(null);
  };

  const handleRemove = () => {
    setImageFile(null);
    setRemoved(true);
  };

  const visiblePreview = !removed && (previewUrl || preview);

  return {
    inputRef,
    sourceFile,
    setSourceFile,
    cropArea,
    setCropArea,
    previewUrl,
    cropImageUrl,
    resetInput,
    onFileSelect,
    applyCrop,
    cancelCrop,
    handleRemove,
    visiblePreview
  };
}

export { useImageUpload };
