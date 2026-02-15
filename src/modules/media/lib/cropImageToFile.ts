interface CropArea {
  height: number;
  width: number;
  x: number;
  y: number;
}

async function cropImageToFile(
  imageSrc: string,
  crop: CropArea,
  fileName = 'image.jpg'
): Promise<File> {
  const image = new Image();
  image.src = imageSrc;
  image.crossOrigin = 'anonymous';

  await new Promise((resolve) => (image.onload = resolve));

  const canvas = document.createElement('canvas');
  canvas.width = crop.width;
  canvas.height = crop.height;

  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        resolve(new File([blob!], fileName, { type: 'image/jpeg' }));
      },
      'image/jpeg',
      0.9
    );
  });
}

export { type CropArea, cropImageToFile };
