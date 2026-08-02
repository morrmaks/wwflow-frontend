import type {
  BoardMemberModel,
  BoardModel,
  CanvasMemberModel,
  CanvasModel,
  CardModel,
  ColumnModel,
  InviteModel,
  RefreshTokenModel,
  UserModel
} from './types';

interface AppDatabase extends Record<string, unknown> {
  boardMembers: BoardMemberModel[];
  boards: BoardModel[];
  canvas: CanvasModel[];
  canvasMembers: CanvasMemberModel[];
  cards: CardModel[];
  columns: ColumnModel[];
  invites: InviteModel[];
  refreshTokens: RefreshTokenModel[];
  users: UserModel[];
}

export type { AppDatabase };
