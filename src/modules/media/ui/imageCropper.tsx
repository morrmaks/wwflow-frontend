'use client';

import { useState } from 'react';
import Cropper from 'react-easy-crop';

import type { CropArea } from '../lib/cropImageToFile';

interface ImageCropperProps {
  image: string;
  onCropComplete: (crop: CropArea) => void;
}

function ImageCropper({ image, onCropComplete }: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  return (
    <div className='relative h-[300px] w-full'>
      <Cropper
        aspect={16 / 9}
        image={image}
        crop={crop}
        onCropChange={setCrop}
        onCropComplete={(_, croppedAreaPixels) => {
          onCropComplete(croppedAreaPixels);
        }}
        onZoomChange={setZoom}
        zoom={zoom}
      />
    </div>
  );
}

export { ImageCropper };
