function removeEmpty<T extends Record<string, any>>(
  obj: T
): {
  [K in keyof T as T[K] extends null | undefined ? never : K]: Exclude<T[K], null | undefined>;
} {
  const result: any = {};

  for (const key in obj) {
    const value = obj[key];
    if (value === null || value === undefined) continue;
    result[key] = value;
  }

  return result;
}

const typedEntries = <T extends Record<string, unknown>>(obj: T): [keyof T, T[keyof T]][] => {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
};

const typedKeys = <T extends Record<string, unknown>>(obj: T): (keyof T)[] => {
  return Object.keys(obj) as (keyof T)[];
};

export { removeEmpty, typedEntries, typedKeys };
