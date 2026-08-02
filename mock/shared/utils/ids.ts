const toNumberId = (value: number | string): number => {
  if (typeof value === 'number') return value;
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    throw new TypeError(`Invalid id: ${value}`);
  }
  return parsed;
};

const toStringId = (value: number | string): string => {
  return String(value);
};

export { toNumberId, toStringId };
