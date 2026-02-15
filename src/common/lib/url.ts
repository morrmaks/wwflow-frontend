function getAppUrl(path: string) {
  if (typeof window === 'undefined') return path;

  return `${window.location.origin}${path}`;
}

export { getAppUrl };
