'use client';

import { Button } from '@src/common/ui/button';
import { Input } from '@src/common/ui/input';
import { Label } from '@src/common/ui/label';
import Image from 'next/image';

import { useImageUpload } from '../_hooks/useImageUpload';
import { ImageCropper } from './imageCropper';

interface ImageUploadInputProps {
  imageFile?: File | null;
  preview?: string | null;
  removed: boolean;
  setImageFile: (file: File | null) => void;
  setRemoved: (removed: boolean) => void;
}

function ImageUploadInput({
  imageFile,
  setImageFile,
  removed,
  setRemoved,
  preview
}: ImageUploadInputProps) {
  const {
    inputRef,
    previewUrl,
    cropImageUrl,
    onFileSelect,
    applyCrop,
    cancelCrop,
    handleRemove,
    setCropArea,
    visiblePreview
  } = useImageUpload({ preview, imageFile, setImageFile, removed, setRemoved });

  return (
    <div className='space-y-3 mb-4'>
      <Label htmlFor='cover-upload'>Preview image</Label>
      <Input
        ref={inputRef}
        accept='image/*'
        className='hidden'
        id='cover-upload'
        type='file'
        onChange={onFileSelect}
      />

      <div className='flex items-center gap-3'>
        <Button asChild type='button' variant='outline'>
          <Label className='cursor-pointer' htmlFor='cover-upload'>
            {imageFile ? 'Change file' : 'Choose file'}
          </Label>
        </Button>

        {visiblePreview && (
          <>
            <Image
              alt='Preview'
              className='h-10 w-16 aspect-video rounded-md object-cover border'
              height={4}
              src={previewUrl || preview || ''}
              width={64}
            />
            <Button variant='destructive' onClick={handleRemove}>
              Remove
            </Button>
          </>
        )}
      </div>

      {cropImageUrl && (
        <>
          <ImageCropper image={cropImageUrl} onCropComplete={setCropArea} />
          <Button type='button' onClick={applyCrop}>
            Apply crop
          </Button>
          <Button className='ml-2' type='button' variant='secondary' onClick={cancelCrop}>
            Cancel
          </Button>
        </>
      )}
    </div>
  );
}

export { ImageUploadInput };
