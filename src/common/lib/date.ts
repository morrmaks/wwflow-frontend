function formatRelativeDate(dateIso: string, locale = 'en') {
  const date = new Date(dateIso);
  const now = new Date();

  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  const intervals: [number, Intl.RelativeTimeFormatUnit][] = [
    [60, 'second'],
    [60, 'minute'],
    [24, 'hour'],
    [7, 'day'],
    [4.34524, 'week'], // среднее число недель в месяце
    [12, 'month'],
    [Number.POSITIVE_INFINITY, 'year']
  ];

  let duration = diffInSeconds;

  for (let i = 0; i < intervals.length; i++) {
    const [limit, unit] = intervals[i];

    if (Math.abs(duration) < limit) {
      return rtf.format(-Math.floor(duration), unit);
    }

    duration /= limit;
  }

  return '';
}

export { formatRelativeDate };
