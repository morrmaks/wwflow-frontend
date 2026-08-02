import type { Orm } from 'mock-config-server';

import type { AppDatabase } from '../database';

type AppOrm = Orm<AppDatabase>;

type ModelOf<K extends keyof AppDatabase> = AppDatabase[K] extends (infer M)[] ? M : never;

export type { AppOrm, ModelOf };
