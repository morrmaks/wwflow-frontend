type PreviewUploadLike = {
  arrayBuffer?: () => Promise<ArrayBuffer>;
  dataUrl?: string;
  filename?: string;
  mimetype?: string;
  name?: string;
  type?: string;
  url?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getStringField(upload: Record<string, unknown>, field: keyof PreviewUploadLike) {
  const value = upload[field];
  return typeof value === 'string' && value.length > 0 ? value : null;
}

function toBase64(buffer: ArrayBuffer) {
  return Buffer.from(buffer).toString('base64');
}

function createPlaceholderPreviewUrl(name: string) {
  const label = name.replace(/[<>&"']/g, '').slice(0, 40) || 'Preview';
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#f1f5f9"/>
          <stop offset="100%" stop-color="#dbeafe"/>
        </linearGradient>
      </defs>
      <rect width="640" height="360" fill="url(#bg)"/>
      <rect x="40" y="40" width="560" height="280" rx="24" fill="rgba(255,255,255,0.72)"/>
      <text x="320" y="172" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" font-weight="700" fill="#0f172a">${label}</text>
      <text x="320" y="212" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#475569">Mock preview</text>
    </svg>
  `;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

async function createMockPreviewUrl(upload: unknown, fallbackName: string) {
  if (!upload) return null;
  if (typeof upload === 'string') return upload || null;
  if (!isRecord(upload)) return createPlaceholderPreviewUrl(fallbackName);

  const directUrl = getStringField(upload, 'dataUrl') ?? getStringField(upload, 'url');
  if (directUrl) return directUrl;

  const arrayBuffer = upload.arrayBuffer;
  if (typeof arrayBuffer === 'function') {
    const type =
      getStringField(upload, 'type') ?? getStringField(upload, 'mimetype') ?? 'image/jpeg';
    const buffer = await arrayBuffer.call(upload);
    return `data:${type};base64,${toBase64(buffer)}`;
  }

  const name = getStringField(upload, 'name') ?? getStringField(upload, 'filename') ?? fallbackName;

  return createPlaceholderPreviewUrl(name);
}

export { createMockPreviewUrl };
