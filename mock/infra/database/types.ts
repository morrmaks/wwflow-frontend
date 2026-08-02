import type { BoardBackground, MemberRole } from '@src/common/api/graphql/__generated__';

interface RefreshTokenModel {
  expiresAt: string;
  id: number;
  tokenHash: string;
  userId: number;
}

interface UserModel {
  avatarUrl: string | null;
  createdAt: string;
  deletedAt: string | null;
  email: string;
  id: number;
  name: string;
  password: string;
  updatedAt: string;
}

interface BoardModel {
  id: number;
  title: string;
  panelInboxSize: number;
  panelBoardSize: number;
  inboxBackground: BoardBackground;
  boardBackground: BoardBackground;
  revision: number;
  previewUrl: string | null;
  archivedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface BoardMemberModel {
  boardId: number;
  id: number;
  role: MemberRole;
  userId: number;
}

interface ColumnModel {
  id: number;
  title: string;
  position: number;
  isInbox: boolean;
  boardId: number;
  clientId: number | null;
  clientIdExpiresAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface CardModel {
  id: number;
  title: string;
  position: number;
  completed: boolean;
  columnId: number;
  clientId: number | null;
  clientIdExpiresAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface InviteModel {
  acceptedAt: string | null;
  boardId: number | null;
  canvasId: number | null;
  createdAt: string;
  email: string;
  expiresAt: string;
  id: number;
  inviterId: number;
  role: MemberRole;
  token: string;
  userId: number | null;
}

interface CanvasModel {
  createdAt: string;
  id: number;
  previewUrl: string | null;
  snapshot: any;
  title: string;
  updatedAt: string;
  version: number;
}

interface CanvasMemberModel {
  canvasId: number;
  id: number;
  role: MemberRole;
  userId: number;
}

export type {
  BoardMemberModel,
  BoardModel,
  CanvasMemberModel,
  CanvasModel,
  CardModel,
  ColumnModel,
  InviteModel,
  RefreshTokenModel,
  UserModel
};
