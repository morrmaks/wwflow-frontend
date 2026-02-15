export type CanvasWsMessage = DiffMessage | ErrorMessage | SnapshotMessage | TitleMessage;

export interface SnapshotMessage {
  snapshot: unknown;
  title: string;
  type: 'snapshot';
  version: number;
}

export interface DiffMessage {
  diff: unknown;
  type: 'diff';
  version: number;
}

export interface TitleMessage {
  title: string;
  type: 'title';
  version: number;
}

export interface ErrorMessage {
  message: string;
  type: 'error';
}
