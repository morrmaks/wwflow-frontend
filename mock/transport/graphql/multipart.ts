import type { BusboyFileStream } from '@fastify/busboy';
import type { Request } from 'express';

import Busboy from '@fastify/busboy';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

type MultipartFile = {
  buffer: Buffer;
  filename: string;
  mimeType: string;
};

type GraphQLMultipartBody = {
  map?: Record<string, string[]>;
  operations?: {
    operationName?: string;
    query?: string;
    variables?: Record<string, unknown>;
  };
};

const uploadsDir = join(process.cwd(), 'mock/uploads');

function isMultipartGraphQLRequest(request: Request) {
  const contentType = request.headers['content-type'];
  return (
    request.method === 'POST' &&
    typeof contentType === 'string' &&
    contentType.includes('multipart/form-data')
  );
}

function sanitizeFileName(fileName: string) {
  return fileName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function getExtension(mimeType: string, fileName: string) {
  const fileExtension = fileName.match(/\.([a-z0-9]+)$/i)?.[1];
  if (fileExtension) return fileExtension.toLowerCase();

  if (mimeType === 'image/png') return 'png';
  if (mimeType === 'image/webp') return 'webp';
  if (mimeType === 'image/gif') return 'gif';
  if (mimeType === 'image/svg+xml') return 'svg';

  return 'jpg';
}

function setByPath(target: Record<string, unknown>, path: string, value: unknown) {
  const segments = path.split('.');
  if (segments[0] === 'variables') segments.shift();

  let current: Record<string, unknown> = target;

  segments.forEach((segment, index) => {
    const isLast = index === segments.length - 1;
    if (isLast) {
      current[segment] = value;
      return;
    }

    const next = current[segment];
    if (next && typeof next === 'object') {
      current = next as Record<string, unknown>;
    }
  });
}

function saveMultipartFile(request: Request, file: MultipartFile) {
  mkdirSync(uploadsDir, { recursive: true });

  const extension = getExtension(file.mimeType, file.filename);
  const safeName = sanitizeFileName(file.filename.replace(/\.[a-z0-9]+$/i, '')) || 'preview';
  const storedFileName = `${Date.now()}-${safeName}.${extension}`;

  writeFileSync(join(uploadsDir, storedFileName), file.buffer);

  return `${request.protocol}://${request.get('host')}/uploads/${storedFileName}`;
}

function readStream(stream: BusboyFileStream) {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];

    stream.on('data', (chunk: Buffer) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks)));
  });
}

async function parseMultipartGraphQLRequest(request: Request) {
  if (!isMultipartGraphQLRequest(request)) return;

  const body: GraphQLMultipartBody = {};
  const files = new Map<string, MultipartFile>();
  const fileReads: Promise<void>[] = [];

  await new Promise<void>((resolve, reject) => {
    const busboy = Busboy({ headers: request.headers as never });

    busboy.on('field', (fieldName, value) => {
      if (fieldName === 'operations' || fieldName === 'map') {
        body[fieldName] = JSON.parse(value);
      }
    });

    busboy.on('file', (fieldName, stream, filename, _encoding, mimeType) => {
      fileReads.push(
        readStream(stream).then((buffer) => {
          files.set(fieldName, { buffer, filename, mimeType });
        })
      );
    });

    busboy.on('error', reject);
    busboy.on('finish', resolve);

    request.pipe(busboy);
  });

  await Promise.all(fileReads);

  const operations = body.operations;
  if (!operations) return;

  const variables = operations.variables ?? {};

  Object.entries(body.map ?? {}).forEach(([fileKey, variablePaths]) => {
    const file = files.get(fileKey);
    if (!file) return;

    const publicUrl = saveMultipartFile(request, file);
    variablePaths.forEach((variablePath) => setByPath(variables, variablePath, publicUrl));
  });

  request.body = {
    operationName: operations.operationName,
    query: operations.query,
    variables
  };
}

export { parseMultipartGraphQLRequest };
