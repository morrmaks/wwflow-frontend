import { useState } from 'react';

function useImageUploadState() {
  const [image, setImage] = useState<File | null>(null);
  const [removed, setRemoved] = useState<boolean>(false);

  return {
    image,
    setImage,

    removed,
    setRemoved
  };
}

export { useImageUploadState };
