import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends '__typename' | ' $fragmentName' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  Boolean: { input: boolean; output: boolean };
  Float: { input: number; output: number };
  ID: { input: string; output: string };
  Int: { input: number; output: number };
  JSON: { input: unknown; output: unknown };
  String: { input: string; output: string };
  Upload: { input: unknown; output: unknown };
}

export interface AuthResponse {
  __typename: 'AuthResponse';
  user: User;
}

export interface Board {
  __typename: 'Board';
  boardBackground: BoardBackground;
  columns: Array<BoardColumn>;
  id: Scalars['ID']['output'];
  inboxBackground: BoardBackground;
  inboxCards: Array<BoardCard>;
  panelLayout: PanelLayout;
  revision: Scalars['Int']['output'];
  title: Scalars['String']['output'];
}

export interface BoardColumnsArgs {
  orderBy?: InputMaybe<OrderBy>;
}

export interface BoardInboxCardsArgs {
  orderBy?: InputMaybe<OrderBy>;
}

export enum BoardBackground {
  Blue = 'BLUE',
  GradientAlien = 'GRADIENT_ALIEN',
  GradientBubble = 'GRADIENT_BUBBLE',
  GradientCrystal = 'GRADIENT_CRYSTAL',
  GradientEarth = 'GRADIENT_EARTH',
  GradientFlower = 'GRADIENT_FLOWER',
  GradientOcean = 'GRADIENT_OCEAN',
  GradientPeach = 'GRADIENT_PEACH',
  GradientRainbow = 'GRADIENT_RAINBOW',
  GradientSnow = 'GRADIENT_SNOW',
  GradientVolcano = 'GRADIENT_VOLCANO',
  Green = 'GREEN',
  Grey = 'GREY',
  Orange = 'ORANGE',
  Purple = 'PURPLE',
  Red = 'RED'
}

export interface BoardBackgroundChanged {
  __typename: 'BoardBackgroundChanged';
  background: BoardBackground;
  revision: Scalars['Int']['output'];
}

export interface BoardCard {
  __typename: 'BoardCard';
  completed: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  orderIndex: Scalars['Float']['output'];
  title: Scalars['String']['output'];
}

export interface BoardColumn {
  __typename: 'BoardColumn';
  cards: Array<BoardCard>;
  id: Scalars['ID']['output'];
  orderIndex: Scalars['Float']['output'];
  title: Scalars['String']['output'];
}

export interface BoardColumnCardsArgs {
  orderBy?: InputMaybe<OrderBy>;
}

export type BoardEvent =
  | BoardBackgroundChanged
  | BoardRenamed
  | CardCreated
  | CardDeleted
  | CardMoved
  | CardUpdated
  | ColumnCreated
  | ColumnDeleted
  | ColumnMoved
  | ColumnRenamed
  | InboxBackgroundChanged;

export interface BoardListItem {
  __typename: 'BoardListItem';
  cardsCount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  invitedEmails: Array<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  previewSrc: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
}

export interface BoardRenamed {
  __typename: 'BoardRenamed';
  revision: Scalars['Int']['output'];
  title: Scalars['String']['output'];
}

export interface Canvas {
  __typename: 'Canvas';
  id: Scalars['ID']['output'];
  invitedEmails: Array<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  previewSrc: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
}

export interface CanvasListItem {
  __typename: 'CanvasListItem';
  id: Scalars['ID']['output'];
  invitedEmails: Array<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  previewSrc: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
}

export enum CardContainer {
  Column = 'COLUMN',
  Inbox = 'INBOX'
}

export interface CardCreated {
  __typename: 'CardCreated';
  card: CardSnapshot;
  clientId: Scalars['ID']['output'];
  columnId?: Maybe<Scalars['ID']['output']>;
  container: CardContainer;
  index: Scalars['Int']['output'];
  revision: Scalars['Int']['output'];
}

export interface CardDeleted {
  __typename: 'CardDeleted';
  cardId: Scalars['ID']['output'];
  revision: Scalars['Int']['output'];
}

export interface CardMoveTarget {
  __typename: 'CardMoveTarget';
  columnId?: Maybe<Scalars['ID']['output']>;
  container: CardContainer;
  index: Scalars['Int']['output'];
}

export interface CardMoved {
  __typename: 'CardMoved';
  cardId: Scalars['ID']['output'];
  revision: Scalars['Int']['output'];
  to: CardMoveTarget;
}

export interface CardPatchInput {
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
}

export interface CardPatchPayload {
  __typename: 'CardPatchPayload';
  completed?: Maybe<Scalars['Boolean']['output']>;
  title?: Maybe<Scalars['String']['output']>;
}

export interface CardSnapshot {
  __typename: 'CardSnapshot';
  completed: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
}

export interface CardUpdated {
  __typename: 'CardUpdated';
  cardId: Scalars['ID']['output'];
  patch: CardPatchPayload;
  revision: Scalars['Int']['output'];
}

export interface ColumnCreated {
  __typename: 'ColumnCreated';
  clientId: Scalars['ID']['output'];
  column: ColumnSnapshot;
  index: Scalars['Int']['output'];
  revision: Scalars['Int']['output'];
}

export interface ColumnDeleted {
  __typename: 'ColumnDeleted';
  columnId?: Maybe<Scalars['ID']['output']>;
  revision: Scalars['Int']['output'];
}

export interface ColumnMoved {
  __typename: 'ColumnMoved';
  columnId?: Maybe<Scalars['ID']['output']>;
  revision: Scalars['Int']['output'];
  toIndex: Scalars['Int']['output'];
}

export interface ColumnRenamed {
  __typename: 'ColumnRenamed';
  columnId?: Maybe<Scalars['ID']['output']>;
  revision: Scalars['Int']['output'];
  title: Scalars['String']['output'];
}

export interface ColumnSnapshot {
  __typename: 'ColumnSnapshot';
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
}

export interface CreateBoardPayload {
  __typename: 'CreateBoardPayload';
  id: Scalars['ID']['output'];
}

export interface CreateCanvasPayload {
  __typename: 'CreateCanvasPayload';
  id: Scalars['ID']['output'];
}

export interface DeleteBoardPayload {
  __typename: 'DeleteBoardPayload';
  id: Scalars['ID']['output'];
}

export interface DeleteCanvasPayload {
  __typename: 'DeleteCanvasPayload';
  id: Scalars['ID']['output'];
}

export interface InboxBackgroundChanged {
  __typename: 'InboxBackgroundChanged';
  background: BoardBackground;
  revision: Scalars['Int']['output'];
}

export interface MoveTargetInput {
  columnId?: InputMaybe<Scalars['ID']['input']>;
  container: CardContainer;
  index: Scalars['Int']['input'];
}

export interface Mutation {
  __typename: 'Mutation';
  createBoard: CreateBoardPayload;
  createCanvas: CreateCanvasPayload;
  createCard: Scalars['Boolean']['output'];
  createColumn: Scalars['Boolean']['output'];
  deleteBoard: DeleteBoardPayload;
  deleteCanvas: DeleteCanvasPayload;
  deleteCard: Scalars['Boolean']['output'];
  deleteColumn: Scalars['Boolean']['output'];
  login: AuthResponse;
  logout: Scalars['Boolean']['output'];
  moveCard: Scalars['Boolean']['output'];
  moveColumn: Scalars['Boolean']['output'];
  refreshSession: Scalars['Boolean']['output'];
  register: AuthResponse;
  renameBoard: Scalars['Boolean']['output'];
  renameCanvas: Scalars['Boolean']['output'];
  renameColumn: Scalars['Boolean']['output'];
  sendCanvasDiff: Scalars['Boolean']['output'];
  updateBoard: UpdateBoardPayload;
  updateBoardBackground: Scalars['Boolean']['output'];
  updateBoardInvites: UpdateBoardInvitesPayload;
  updateCanvas: UpdateCanvasPayload;
  updateCanvasInvites: UpdateCanvasInvitesPayload;
  updateCard: Scalars['Boolean']['output'];
  updateInboxBackground: Scalars['Boolean']['output'];
  updatePanelLayout: Scalars['Boolean']['output'];
}

export interface MutationCreateBoardArgs {
  inviteEmails?: InputMaybe<Array<Scalars['String']['input']>>;
  name: Scalars['String']['input'];
  previewImage?: InputMaybe<Scalars['Upload']['input']>;
}

export interface MutationCreateCanvasArgs {
  inviteEmails?: InputMaybe<Array<Scalars['String']['input']>>;
  name: Scalars['String']['input'];
  previewImage?: InputMaybe<Scalars['Upload']['input']>;
}

export interface MutationCreateCardArgs {
  boardId: Scalars['ID']['input'];
  clientId: Scalars['ID']['input'];
  columnId?: InputMaybe<Scalars['ID']['input']>;
  container: CardContainer;
  index: Scalars['Int']['input'];
  title: Scalars['String']['input'];
}

export interface MutationCreateColumnArgs {
  boardId: Scalars['ID']['input'];
  clientId: Scalars['ID']['input'];
  index: Scalars['Int']['input'];
  title: Scalars['String']['input'];
}

export interface MutationDeleteBoardArgs {
  boardId: Scalars['ID']['input'];
}

export interface MutationDeleteCanvasArgs {
  canvasId: Scalars['ID']['input'];
}

export interface MutationDeleteCardArgs {
  boardId: Scalars['ID']['input'];
  cardId: Scalars['ID']['input'];
}

export interface MutationDeleteColumnArgs {
  boardId: Scalars['ID']['input'];
  columnId: Scalars['ID']['input'];
}

export interface MutationLoginArgs {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}

export interface MutationMoveCardArgs {
  boardId: Scalars['ID']['input'];
  cardId: Scalars['ID']['input'];
  to: MoveTargetInput;
}

export interface MutationMoveColumnArgs {
  boardId: Scalars['ID']['input'];
  columnId: Scalars['ID']['input'];
  toIndex: Scalars['Int']['input'];
}

export interface MutationRegisterArgs {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}

export interface MutationRenameBoardArgs {
  boardId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
}

export interface MutationRenameCanvasArgs {
  canvasId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
}

export interface MutationRenameColumnArgs {
  boardId: Scalars['ID']['input'];
  columnId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
}

export interface MutationSendCanvasDiffArgs {
  canvasId: Scalars['ID']['input'];
  diff: Scalars['JSON']['input'];
}

export interface MutationUpdateBoardArgs {
  boardId: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  previewImage?: InputMaybe<Scalars['Upload']['input']>;
  removePreview: Scalars['Boolean']['input'];
}

export interface MutationUpdateBoardBackgroundArgs {
  background: BoardBackground;
  boardId: Scalars['ID']['input'];
}

export interface MutationUpdateBoardInvitesArgs {
  add: Array<Scalars['String']['input']>;
  boardId: Scalars['ID']['input'];
  remove: Array<Scalars['String']['input']>;
}

export interface MutationUpdateCanvasArgs {
  canvasId: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  previewImage?: InputMaybe<Scalars['Upload']['input']>;
  removePreview: Scalars['Boolean']['input'];
}

export interface MutationUpdateCanvasInvitesArgs {
  add: Array<Scalars['String']['input']>;
  canvasId: Scalars['ID']['input'];
  remove: Array<Scalars['String']['input']>;
}

export interface MutationUpdateCardArgs {
  boardId: Scalars['ID']['input'];
  cardId: Scalars['ID']['input'];
  patch: CardPatchInput;
}

export interface MutationUpdateInboxBackgroundArgs {
  background: BoardBackground;
  boardId: Scalars['ID']['input'];
}

export interface MutationUpdatePanelLayoutArgs {
  boardId: Scalars['ID']['input'];
  panelLayout: PanelLayoutInput;
}

export enum OrderBy {
  OrderIndex = 'ORDER_INDEX'
}

export interface PanelLayout {
  __typename: 'PanelLayout';
  board?: Maybe<Scalars['Float']['output']>;
  inbox?: Maybe<Scalars['Float']['output']>;
}

export interface PanelLayoutInput {
  board?: InputMaybe<Scalars['Float']['input']>;
  inbox?: InputMaybe<Scalars['Float']['input']>;
}

export interface Query {
  __typename: 'Query';
  board: Board;
  boardList?: Maybe<Array<BoardListItem>>;
  canvasList?: Maybe<Array<CanvasListItem>>;
  me?: Maybe<User>;
  searchUserEmails: Array<UserEmailLookup>;
}

export interface QueryBoardArgs {
  id: Scalars['ID']['input'];
}

export interface QuerySearchUserEmailsArgs {
  query: Scalars['String']['input'];
}

export interface Subscription {
  __typename: 'Subscription';
  boardEvents: BoardEvent;
  canvasSession: Scalars['JSON']['output'];
}

export interface SubscriptionBoardEventsArgs {
  boardId: Scalars['ID']['input'];
}

export interface SubscriptionCanvasSessionArgs {
  id: Scalars['ID']['input'];
}

export interface UpdateBoardInvitesPayload {
  __typename: 'UpdateBoardInvitesPayload';
  id: Scalars['ID']['output'];
  invitedEmails: Array<Scalars['String']['output']>;
}

export interface UpdateBoardPayload {
  __typename: 'UpdateBoardPayload';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  previewSrc: Scalars['String']['output'];
}

export interface UpdateCanvasInvitesPayload {
  __typename: 'UpdateCanvasInvitesPayload';
  id: Scalars['ID']['output'];
  invitedEmails: Array<Scalars['String']['output']>;
}

export interface UpdateCanvasPayload {
  __typename: 'UpdateCanvasPayload';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  previewSrc: Scalars['String']['output'];
}

export interface User {
  __typename: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
}

export interface UserEmailLookup {
  __typename: 'UserEmailLookup';
  email: Scalars['String']['output'];
}

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export interface LoginMutation {
  login: { __typename: 'AuthResponse'; user: { __typename: 'User'; id: string; email: string } };
}

export type RegisterMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export interface RegisterMutation {
  register: { __typename: 'AuthResponse'; user: { __typename: 'User'; id: string; email: string } };
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export interface LogoutMutation {
  logout: boolean;
}

export type RefreshSessionMutationVariables = Exact<{ [key: string]: never }>;

export interface RefreshSessionMutation {
  refreshSession: boolean;
}

export interface BoardSnapshotFragment {
  __typename: 'Board';
  boardBackground: BoardBackground;
  id: string;
  inboxBackground: BoardBackground;
  panelLayout: { __typename: 'PanelLayout'; inbox?: number | null; board?: number | null };
  revision: number;
  title: string;
  columns: Array<{
    __typename: 'BoardColumn';
    id: string;
    title: string;
    orderIndex: number;
    cards: Array<{
      __typename: 'BoardCard';
      id: string;
      title: string;
      completed: boolean;
      orderIndex: number;
    }>;
  }>;
  inboxCards: Array<{
    __typename: 'BoardCard';
    id: string;
    title: string;
    completed: boolean;
    orderIndex: number;
  }>;
}

export type BoardSnapshotQueryVariables = Exact<{
  boardId: Scalars['ID']['input'];
}>;

export interface BoardSnapshotQuery {
  board: {
    __typename: 'Board';
    id: string;
    title: string;
    inboxBackground: BoardBackground;
    boardBackground: BoardBackground;
    revision: number;
    panelLayout: { __typename: 'PanelLayout'; inbox?: number | null; board?: number | null };
    inboxCards: Array<{
      __typename: 'BoardCard';
      id: string;
      title: string;
      completed: boolean;
      orderIndex: number;
    }>;
    columns: Array<{
      __typename: 'BoardColumn';
      id: string;
      title: string;
      orderIndex: number;
      cards: Array<{
        __typename: 'BoardCard';
        id: string;
        title: string;
        completed: boolean;
        orderIndex: number;
      }>;
    }>;
  };
}

export type BoardEventsSubscriptionVariables = Exact<{
  boardId: Scalars['ID']['input'];
}>;

export interface BoardEventsSubscription {
  boardEvents:
    | { __typename: 'BoardBackgroundChanged'; revision: number; background: BoardBackground }
    | { __typename: 'BoardRenamed'; revision: number; title: string }
    | {
        __typename: 'CardCreated';
        revision: number;
        index: number;
        container: CardContainer;
        columnId?: string | null;
        clientId: string;
        card: { __typename: 'CardSnapshot'; id: string; title: string; completed: boolean };
      }
    | { __typename: 'CardDeleted'; revision: number; cardId: string }
    | {
        __typename: 'CardMoved';
        revision: number;
        cardId: string;
        to: {
          __typename: 'CardMoveTarget';
          container: CardContainer;
          columnId?: string | null;
          index: number;
        };
      }
    | {
        __typename: 'CardUpdated';
        revision: number;
        cardId: string;
        patch: {
          __typename: 'CardPatchPayload';
          title?: string | null;
          completed?: boolean | null;
        };
      }
    | {
        __typename: 'ColumnCreated';
        revision: number;
        index: number;
        clientId: string;
        column: { __typename: 'ColumnSnapshot'; id: string; title: string };
      }
    | { __typename: 'ColumnDeleted'; revision: number; columnId?: string | null }
    | { __typename: 'ColumnMoved'; revision: number; columnId?: string | null; toIndex: number }
    | { __typename: 'ColumnRenamed'; revision: number; columnId?: string | null; title: string }
    | { __typename: 'InboxBackgroundChanged'; revision: number; background: BoardBackground };
}

export type CreateCardMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  clientId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
  container: CardContainer;
  columnId?: InputMaybe<Scalars['ID']['input']>;
  index: Scalars['Int']['input'];
}>;

export interface CreateCardMutation {
  createCard: boolean;
}

export type CreateColumnMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  clientId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
  index: Scalars['Int']['input'];
}>;

export interface CreateColumnMutation {
  createColumn: boolean;
}

export type DeleteCardMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  cardId: Scalars['ID']['input'];
}>;

export interface DeleteCardMutation {
  deleteCard: boolean;
}

export type DeleteColumnMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  columnId: Scalars['ID']['input'];
}>;

export interface DeleteColumnMutation {
  deleteColumn: boolean;
}

export type MoveCardMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  cardId: Scalars['ID']['input'];
  to: MoveTargetInput;
}>;

export interface MoveCardMutation {
  moveCard: boolean;
}

export type MoveColumnMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  columnId: Scalars['ID']['input'];
  toIndex: Scalars['Int']['input'];
}>;

export interface MoveColumnMutation {
  moveColumn: boolean;
}

export type RenameBoardMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
}>;

export interface RenameBoardMutation {
  renameBoard: boolean;
}

export type RenameColumnMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  columnId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
}>;

export interface RenameColumnMutation {
  renameColumn: boolean;
}

export type UpdateBoardBackgroundMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  background: BoardBackground;
}>;

export interface UpdateBoardBackgroundMutation {
  updateBoardBackground: boolean;
}

export type UpdateCardMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  cardId: Scalars['ID']['input'];
  patch: CardPatchInput;
}>;

export interface UpdateCardMutation {
  updateCard: boolean;
}

export type UpdateInboxBackgroundMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  background: BoardBackground;
}>;

export interface UpdateInboxBackgroundMutation {
  updateInboxBackground: boolean;
}

export type UpdatePanelLayoutMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  panelLayout: PanelLayoutInput;
}>;

export interface UpdatePanelLayoutMutation {
  updatePanelLayout: boolean;
}

export interface BoardListItemFragment {
  __typename: 'BoardListItem';
  cardsCount: number;
  id: string;
  invitedEmails: Array<string>;
  name: string;
  previewSrc: string;
  updatedAt: string;
}

export type BoardListQueryVariables = Exact<{ [key: string]: never }>;

export interface BoardListQuery {
  boardList?: Array<{
    __typename: 'BoardListItem';
    id: string;
    name: string;
    updatedAt: string;
    cardsCount: number;
    previewSrc: string;
    invitedEmails: Array<string>;
  }> | null;
}

export type DeleteBoardMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
}>;

export interface DeleteBoardMutation {
  deleteBoard: { __typename: 'DeleteBoardPayload'; id: string };
}

export type UpdateBoardMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  previewImage?: InputMaybe<Scalars['Upload']['input']>;
  removePreview: Scalars['Boolean']['input'];
}>;

export interface UpdateBoardMutation {
  updateBoard: { __typename: 'UpdateBoardPayload'; id: string; name: string; previewSrc: string };
}

export type UpdateBoardInvitesMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  add: Array<Scalars['String']['input']> | Scalars['String']['input'];
  remove: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;

export interface UpdateBoardInvitesMutation {
  updateBoardInvites: {
    __typename: 'UpdateBoardInvitesPayload';
    id: string;
    invitedEmails: Array<string>;
  };
}

export type CreateBoardMutationVariables = Exact<{
  name: Scalars['String']['input'];
  inviteEmails?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  previewImage?: InputMaybe<Scalars['Upload']['input']>;
}>;

export interface CreateBoardMutation {
  createBoard: { __typename: 'CreateBoardPayload'; id: string };
}

export type CanvasSessionSubscriptionVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export interface CanvasSessionSubscription {
  canvasSession: unknown;
}

export type RenameCanvasMutationVariables = Exact<{
  canvasId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
}>;

export interface RenameCanvasMutation {
  renameCanvas: boolean;
}

export type SendCanvasDiffMutationVariables = Exact<{
  canvasId: Scalars['ID']['input'];
  diff: Scalars['JSON']['input'];
}>;

export interface SendCanvasDiffMutation {
  sendCanvasDiff: boolean;
}

export interface CanvasCardFragment {
  __typename: 'CanvasListItem';
  id: string;
  invitedEmails: Array<string>;
  name: string;
  previewSrc: string;
  updatedAt: string;
}

export type CanvasListQueryVariables = Exact<{ [key: string]: never }>;

export interface CanvasListQuery {
  canvasList?: Array<{
    __typename: 'CanvasListItem';
    id: string;
    name: string;
    updatedAt: string;
    previewSrc: string;
    invitedEmails: Array<string>;
  }> | null;
}

export type DeleteCanvasMutationVariables = Exact<{
  canvasId: Scalars['ID']['input'];
}>;

export interface DeleteCanvasMutation {
  deleteCanvas: { __typename: 'DeleteCanvasPayload'; id: string };
}

export type UpdateCanvasMutationVariables = Exact<{
  canvasId: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  previewImage?: InputMaybe<Scalars['Upload']['input']>;
  removePreview: Scalars['Boolean']['input'];
}>;

export interface UpdateCanvasMutation {
  updateCanvas: { __typename: 'UpdateCanvasPayload'; id: string; name: string; previewSrc: string };
}

export type UpdateCanvasInvitesMutationVariables = Exact<{
  canvasId: Scalars['ID']['input'];
  add: Array<Scalars['String']['input']> | Scalars['String']['input'];
  remove: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;

export interface UpdateCanvasInvitesMutation {
  updateCanvasInvites: {
    __typename: 'UpdateCanvasInvitesPayload';
    id: string;
    invitedEmails: Array<string>;
  };
}

export type CreateCanvasMutationVariables = Exact<{
  name: Scalars['String']['input'];
  inviteEmails?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  previewImage?: InputMaybe<Scalars['Upload']['input']>;
}>;

export interface CreateCanvasMutation {
  createCanvas: { __typename: 'CreateCanvasPayload'; id: string };
}

export type SearchUserEmailsQueryVariables = Exact<{
  query: Scalars['String']['input'];
}>;

export interface SearchUserEmailsQuery {
  searchUserEmails: Array<{ __typename: 'UserEmailLookup'; email: string }>;
}

export type GetMeQueryVariables = Exact<{ [key: string]: never }>;

export interface GetMeQuery {
  me?: { __typename: 'User'; id: string; email: string } | null;
}

export const BoardSnapshotFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'BoardSnapshot' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Board' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'panelLayout' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'inbox' } },
                { kind: 'Field', name: { kind: 'Name', value: 'board' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'inboxBackground' } },
          { kind: 'Field', name: { kind: 'Name', value: 'boardBackground' } },
          { kind: 'Field', name: { kind: 'Name', value: 'revision' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'inboxCards' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: { kind: 'EnumValue', value: 'ORDER_INDEX' }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'completed' } },
                { kind: 'Field', name: { kind: 'Name', value: 'orderIndex' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'columns' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: { kind: 'EnumValue', value: 'ORDER_INDEX' }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'orderIndex' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'cards' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'orderBy' },
                      value: { kind: 'EnumValue', value: 'ORDER_INDEX' }
                    }
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'completed' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'orderIndex' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<BoardSnapshotFragment, unknown>;
export const BoardListItemFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'BoardListItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'BoardListItem' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'cardsCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'previewSrc' } },
          { kind: 'Field', name: { kind: 'Name', value: 'invitedEmails' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<BoardListItemFragment, unknown>;
export const CanvasCardFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CanvasCard' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'CanvasListItem' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'previewSrc' } },
          { kind: 'Field', name: { kind: 'Name', value: 'invitedEmails' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CanvasCardFragment, unknown>;
export const LoginDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Login' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'password' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'login' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'email' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'password' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'password' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Register' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'password' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'register' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'email' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'password' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'password' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const LogoutDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Logout' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [{ kind: 'Field', name: { kind: 'Name', value: 'logout' } }]
      }
    }
  ]
} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const RefreshSessionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RefreshSession' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [{ kind: 'Field', name: { kind: 'Name', value: 'refreshSession' } }]
      }
    }
  ]
} as unknown as DocumentNode<RefreshSessionMutation, RefreshSessionMutationVariables>;
export const BoardSnapshotDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'BoardSnapshot' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'boardId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'board' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'boardId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'BoardSnapshot' } }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'BoardSnapshot' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Board' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'panelLayout' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'inbox' } },
                { kind: 'Field', name: { kind: 'Name', value: 'board' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'inboxBackground' } },
          { kind: 'Field', name: { kind: 'Name', value: 'boardBackground' } },
          { kind: 'Field', name: { kind: 'Name', value: 'revision' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'inboxCards' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: { kind: 'EnumValue', value: 'ORDER_INDEX' }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'completed' } },
                { kind: 'Field', name: { kind: 'Name', value: 'orderIndex' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'columns' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: { kind: 'EnumValue', value: 'ORDER_INDEX' }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'orderIndex' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'cards' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'orderBy' },
                      value: { kind: 'EnumValue', value: 'ORDER_INDEX' }
                    }
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'completed' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'orderIndex' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<BoardSnapshotQuery, BoardSnapshotQueryVariables>;
export const BoardEventsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'subscription',
      name: { kind: 'Name', value: 'BoardEvents' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'boardId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'boardEvents' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'boardId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'boardId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'BoardRenamed' }
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'revision' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } }
                    ]
                  }
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'BoardBackgroundChanged' }
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'revision' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'background' } }
                    ]
                  }
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'InboxBackgroundChanged' }
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'revision' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'background' } }
                    ]
                  }
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'ColumnCreated' }
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'revision' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'index' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'clientId' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'column' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'title' } }
                          ]
                        }
                      }
                    ]
                  }
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'ColumnMoved' }
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'revision' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'columnId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'toIndex' } }
                    ]
                  }
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'ColumnRenamed' }
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'revision' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'columnId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } }
                    ]
                  }
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'ColumnDeleted' }
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'revision' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'columnId' } }
                    ]
                  }
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'CardCreated' }
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'revision' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'index' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'container' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'columnId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'clientId' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'card' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'completed' } }
                          ]
                        }
                      }
                    ]
                  }
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'CardMoved' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'revision' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'cardId' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'to' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'container' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'columnId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'index' } }
                          ]
                        }
                      }
                    ]
                  }
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'CardUpdated' }
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'revision' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'cardId' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'patch' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'completed' } }
                          ]
                        }
                      }
                    ]
                  }
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'CardDeleted' }
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'revision' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'cardId' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<BoardEventsSubscription, BoardEventsSubscriptionVariables>;
export const CreateCardDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateCard' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'boardId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'clientId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'title' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'container' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CardContainer' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'columnId' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'index' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createCard' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'boardId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'boardId' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'clientId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'clientId' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'title' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'title' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'container' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'container' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'columnId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'columnId' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'index' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'index' } }
              }
            ]
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CreateCardMutation, CreateCardMutationVariables>;
export const CreateColumnDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateColumn' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'boardId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'clientId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'title' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'index' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createColumn' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'boardId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'boardId' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'clientId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'clientId' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'title' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'title' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'index' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'index' } }
              }
            ]
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CreateColumnMutation, CreateColumnMutationVariables>;
export const DeleteCardDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteCard' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'boardId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'cardId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteCard' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'boardId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'boardId' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'cardId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'cardId' } }
              }
            ]
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<DeleteCardMutation, DeleteCardMutationVariables>;
export const DeleteColumnDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteColumn' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'boardId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'columnId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteColumn' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'boardId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'boardId' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'columnId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'columnId' } }
              }
            ]
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<DeleteColumnMutation, DeleteColumnMutationVariables>;
export const MoveCardDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'MoveCard' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'boardId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'cardId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'to' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'MoveTargetInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'moveCard' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'boardId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'boardId' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'cardId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'cardId' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'to' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'to' } }
              }
            ]
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MoveCardMutation, MoveCardMutationVariables>;
export const MoveColumnDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'MoveColumn' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'boardId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'columnId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'toIndex' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'moveColumn' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'boardId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'boardId' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'columnId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'columnId' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'toIndex' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'toIndex' } }
              }
            ]
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MoveColumnMutation, MoveColumnMutationVariables>;
export const RenameBoardDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RenameBoard' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'boardId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'title' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'renameBoard' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'boardId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'boardId' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'title' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'title' } }
              }
            ]
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<RenameBoardMutation, RenameBoardMutationVariables>;
export const RenameColumnDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RenameColumn' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'boardId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'columnId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'title' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'renameColumn' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'boardId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'boardId' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'columnId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'columnId' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'title' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'title' } }
              }
            ]
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<RenameColumnMutation, RenameColumnMutationVariables>;
export const UpdateBoardBackgroundDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateBoardBackground' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'boardId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'background' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'BoardBackground' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateBoardBackground' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'boardId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'boardId' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'background' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'background' } }
              }
            ]
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<UpdateBoardBackgroundMutation, UpdateBoardBackgroundMutationVariables>;
export const UpdateCardDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateCard' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'boardId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'cardId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'patch' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CardPatchInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateCard' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'boardId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'boardId' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'cardId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'cardId' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'patch' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'patch' } }
              }
            ]
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<UpdateCardMutation, UpdateCardMutationVariables>;
export const UpdateInboxBackgroundDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateInboxBackground' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'boardId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'background' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'BoardBackground' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateInboxBackground' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'boardId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'boardId' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'background' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'background' } }
              }
            ]
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<UpdateInboxBackgroundMutation, UpdateInboxBackgroundMutationVariables>;
export const UpdatePanelLayoutDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdatePanelLayout' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'boardId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'panelLayout' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'PanelLayoutInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updatePanelLayout' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'boardId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'boardId' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'panelLayout' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'panelLayout' } }
              }
            ]
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<UpdatePanelLayoutMutation, UpdatePanelLayoutMutationVariables>;
export const BoardListDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'BoardList' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'boardList' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'BoardListItem' } }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'BoardListItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'BoardListItem' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'cardsCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'previewSrc' } },
          { kind: 'Field', name: { kind: 'Name', value: 'invitedEmails' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<BoardListQuery, BoardListQueryVariables>;
export const DeleteBoardDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteBoard' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'boardId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteBoard' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'boardId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'boardId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<DeleteBoardMutation, DeleteBoardMutationVariables>;
export const UpdateBoardDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateBoard' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'boardId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'previewImage' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Upload' } }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'removePreview' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateBoard' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'boardId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'boardId' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'name' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'previewImage' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'previewImage' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'removePreview' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'removePreview' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'previewSrc' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<UpdateBoardMutation, UpdateBoardMutationVariables>;
export const UpdateBoardInvitesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateBoardInvites' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'boardId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'add' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
              }
            }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'remove' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
              }
            }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateBoardInvites' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'boardId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'boardId' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'add' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'add' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'remove' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'remove' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'invitedEmails' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<UpdateBoardInvitesMutation, UpdateBoardInvitesMutationVariables>;
export const CreateBoardDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateBoard' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'inviteEmails' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
            }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'previewImage' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Upload' } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createBoard' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'name' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'inviteEmails' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'inviteEmails' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'previewImage' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'previewImage' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CreateBoardMutation, CreateBoardMutationVariables>;
export const CanvasSessionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'subscription',
      name: { kind: 'Name', value: 'CanvasSession' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'canvasSession' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ]
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CanvasSessionSubscription, CanvasSessionSubscriptionVariables>;
export const RenameCanvasDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RenameCanvas' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'canvasId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'renameCanvas' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'canvasId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'canvasId' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'name' } }
              }
            ]
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<RenameCanvasMutation, RenameCanvasMutationVariables>;
export const SendCanvasDiffDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SendCanvasDiff' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'canvasId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'diff' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'JSON' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'sendCanvasDiff' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'canvasId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'canvasId' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'diff' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'diff' } }
              }
            ]
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SendCanvasDiffMutation, SendCanvasDiffMutationVariables>;
export const CanvasListDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'CanvasList' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'canvasList' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'CanvasCard' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CanvasCard' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'CanvasListItem' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'previewSrc' } },
          { kind: 'Field', name: { kind: 'Name', value: 'invitedEmails' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CanvasListQuery, CanvasListQueryVariables>;
export const DeleteCanvasDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteCanvas' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'canvasId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteCanvas' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'canvasId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'canvasId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<DeleteCanvasMutation, DeleteCanvasMutationVariables>;
export const UpdateCanvasDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateCanvas' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'canvasId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'previewImage' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Upload' } }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'removePreview' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateCanvas' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'canvasId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'canvasId' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'name' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'previewImage' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'previewImage' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'removePreview' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'removePreview' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'previewSrc' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<UpdateCanvasMutation, UpdateCanvasMutationVariables>;
export const UpdateCanvasInvitesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateCanvasInvites' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'canvasId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'add' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
              }
            }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'remove' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
              }
            }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateCanvasInvites' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'canvasId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'canvasId' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'add' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'add' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'remove' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'remove' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'invitedEmails' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<UpdateCanvasInvitesMutation, UpdateCanvasInvitesMutationVariables>;
export const CreateCanvasDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateCanvas' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'inviteEmails' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
            }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'previewImage' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Upload' } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createCanvas' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'name' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'inviteEmails' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'inviteEmails' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'previewImage' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'previewImage' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CreateCanvasMutation, CreateCanvasMutationVariables>;
export const SearchUserEmailsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'SearchUserEmails' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'query' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'searchUserEmails' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'query' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'query' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'email' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SearchUserEmailsQuery, SearchUserEmailsQueryVariables>;
export const GetMeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMe' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'me' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetMeQuery, GetMeQueryVariables>;
