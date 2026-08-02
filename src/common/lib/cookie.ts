function getCookieValue(key: string): string | undefined {
  if (typeof document === 'undefined') return undefined;

  const cookies = document.cookie.split('; ');
  const found = cookies.find((c) => c.startsWith(`${key}=`));
  return found?.split('=')[1];
}

export { getCookieValue };
