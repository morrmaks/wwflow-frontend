import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  JSON: { input: unknown; output: unknown };
  Upload: { input: unknown; output: unknown };
};

export type Board = {
  __typename?: 'Board';
  boardBackground: BoardBackground;
  columns: Array<BoardColumn>;
  id: Scalars['ID']['output'];
  inboxBackground: BoardBackground;
  inboxCards: Array<BoardCard>;
  panelLayout: PanelLayout;
  revision: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type BoardColumnsArgs = {
  orderBy?: InputMaybe<OrderBy>;
};

export type BoardInboxCardsArgs = {
  orderBy?: InputMaybe<OrderBy>;
};

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

export type BoardBackgroundChanged = {
  __typename?: 'BoardBackgroundChanged';
  background: BoardBackground;
  revision: Scalars['Int']['output'];
};

export type BoardCard = {
  __typename?: 'BoardCard';
  completed: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  position: Scalars['Float']['output'];
  title: Scalars['String']['output'];
};

export type BoardColumn = {
  __typename?: 'BoardColumn';
  cards: Array<BoardCard>;
  id: Scalars['ID']['output'];
  position: Scalars['Float']['output'];
  title: Scalars['String']['output'];
};

export type BoardColumnCardsArgs = {
  orderBy?: InputMaybe<OrderBy>;
};

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

export type BoardEventEnvelope = {
  __typename?: 'BoardEventEnvelope';
  actorId: Scalars['ID']['output'];
  boardId: Scalars['ID']['output'];
  clientMutationId?: Maybe<Scalars['ID']['output']>;
  createdAt: Scalars['String']['output'];
  event: BoardEvent;
  revision: Scalars['Int']['output'];
};

export type BoardListItem = {
  __typename?: 'BoardListItem';
  canDelete: Scalars['Boolean']['output'];
  canEdit: Scalars['Boolean']['output'];
  canManagePermissions: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  membersCount: Scalars['Int']['output'];
  myMemberId: Scalars['ID']['output'];
  myRole: MemberRole;
  previewUrl?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type BoardMember = {
  __typename?: 'BoardMember';
  availableRoles: Array<MemberRole>;
  canChangeRole: Scalars['Boolean']['output'];
  canRemove: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  isSelf: Scalars['Boolean']['output'];
  role: MemberRole;
  user: User;
};

export type BoardPermissionsItem = {
  __typename?: 'BoardPermissionsItem';
  id: Scalars['ID']['output'];
  invites: Array<Invite>;
  members: Array<BoardMember>;
  myRole: MemberRole;
};

export type BoardRenamed = {
  __typename?: 'BoardRenamed';
  revision: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type CanvasListItem = {
  __typename?: 'CanvasListItem';
  canDelete: Scalars['Boolean']['output'];
  canEdit: Scalars['Boolean']['output'];
  canManagePermissions: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  membersCount: Scalars['Int']['output'];
  myMemberId: Scalars['ID']['output'];
  myRole: MemberRole;
  previewUrl?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type CanvasMember = {
  __typename?: 'CanvasMember';
  availableRoles: Array<MemberRole>;
  canChangeRole: Scalars['Boolean']['output'];
  canRemove: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  isSelf: Scalars['Boolean']['output'];
  role: MemberRole;
  user: User;
};

export type CanvasPermissionsItem = {
  __typename?: 'CanvasPermissionsItem';
  id: Scalars['ID']['output'];
  invites: Array<Invite>;
  members: Array<CanvasMember>;
  myRole: MemberRole;
};

export enum CardContainer {
  Column = 'COLUMN',
  Inbox = 'INBOX'
}

export type CardCreated = {
  __typename?: 'CardCreated';
  card: CardSnapshot;
  clientId: Scalars['ID']['output'];
  columnId?: Maybe<Scalars['ID']['output']>;
  container: CardContainer;
  index: Scalars['Int']['output'];
  revision: Scalars['Int']['output'];
};

export type CardDeleted = {
  __typename?: 'CardDeleted';
  cardId: Scalars['ID']['output'];
  revision: Scalars['Int']['output'];
};

export type CardMoveTarget = {
  __typename?: 'CardMoveTarget';
  columnId?: Maybe<Scalars['ID']['output']>;
  container: CardContainer;
  position: Scalars['Float']['output'];
};

export type CardMoved = {
  __typename?: 'CardMoved';
  cardId: Scalars['ID']['output'];
  revision: Scalars['Int']['output'];
  to: CardMoveTarget;
};

export type CardPatchInput = {
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CardPatchPayload = {
  __typename?: 'CardPatchPayload';
  completed?: Maybe<Scalars['Boolean']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type CardSnapshot = {
  __typename?: 'CardSnapshot';
  completed: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  position: Scalars['Float']['output'];
  title: Scalars['String']['output'];
};

export type CardUpdated = {
  __typename?: 'CardUpdated';
  cardId: Scalars['ID']['output'];
  patch: CardPatchPayload;
  revision: Scalars['Int']['output'];
};

export type ChangeBoardMemberRolePayload = {
  __typename?: 'ChangeBoardMemberRolePayload';
  boardId: Scalars['ID']['output'];
  updatedMembers: Array<BoardMember>;
};

export type ChangeCanvasMemberRolePayload = {
  __typename?: 'ChangeCanvasMemberRolePayload';
  canvasId: Scalars['ID']['output'];
  updatedMembers: Array<CanvasMember>;
};

export type ChangeMemberRoleInput = {
  memberId: Scalars['ID']['input'];
  role: MemberRole;
};

export type ColumnCreated = {
  __typename?: 'ColumnCreated';
  clientId: Scalars['ID']['output'];
  column: ColumnSnapshot;
  index: Scalars['Int']['output'];
  revision: Scalars['Int']['output'];
};

export type ColumnDeleted = {
  __typename?: 'ColumnDeleted';
  columnId?: Maybe<Scalars['ID']['output']>;
  revision: Scalars['Int']['output'];
};

export type ColumnMoved = {
  __typename?: 'ColumnMoved';
  columnId?: Maybe<Scalars['ID']['output']>;
  position: Scalars['Float']['output'];
  revision: Scalars['Int']['output'];
};

export type ColumnRenamed = {
  __typename?: 'ColumnRenamed';
  columnId?: Maybe<Scalars['ID']['output']>;
  revision: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type ColumnSnapshot = {
  __typename?: 'ColumnSnapshot';
  id: Scalars['ID']['output'];
  position: Scalars['Float']['output'];
  title: Scalars['String']['output'];
};

export type CreateBoardPayload = {
  __typename?: 'CreateBoardPayload';
  id: Scalars['ID']['output'];
};

export type DeleteBoardPayload = {
  __typename?: 'DeleteBoardPayload';
  id: Scalars['ID']['output'];
};

export type DeleteCanvasPayload = {
  __typename?: 'DeleteCanvasPayload';
  id: Scalars['ID']['output'];
};

export type InboxBackgroundChanged = {
  __typename?: 'InboxBackgroundChanged';
  background: BoardBackground;
  revision: Scalars['Int']['output'];
};

export type Invite = {
  __typename?: 'Invite';
  canRevoke: Scalars['Boolean']['output'];
  email: Scalars['String']['output'];
  expiresAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  role: MemberRole;
};

export type InviteUserInput = {
  email: Scalars['String']['input'];
  resourceId: Scalars['ID']['input'];
  role: MemberRole;
};

export enum MemberRole {
  Admin = 'ADMIN',
  Member = 'MEMBER',
  Owner = 'OWNER'
}

export type MoveTargetInput = {
  columnId?: InputMaybe<Scalars['ID']['input']>;
  container: CardContainer;
  index: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changeBoardMemberRole: ChangeBoardMemberRolePayload;
  changeCanvasMemberRole: ChangeCanvasMemberRolePayload;
  createBoard: BoardListItem;
  createCanvas: CanvasListItem;
  createCard: Scalars['Boolean']['output'];
  createColumn: Scalars['Boolean']['output'];
  deleteBoard: DeleteBoardPayload;
  deleteCanvas: DeleteCanvasPayload;
  deleteCard: Scalars['Boolean']['output'];
  deleteColumn: Scalars['Boolean']['output'];
  inviteBoardUser: Invite;
  inviteCanvasUser: Invite;
  login: User;
  logout: Scalars['Boolean']['output'];
  moveCard: Scalars['Boolean']['output'];
  moveColumn: Scalars['Boolean']['output'];
  refreshSession: Scalars['Boolean']['output'];
  register: User;
  removeBoardMember: RemoveMemberPayload;
  removeCanvasMember: RemoveMemberPayload;
  renameBoard: Scalars['Boolean']['output'];
  renameCanvas: Scalars['Boolean']['output'];
  renameColumn: Scalars['Boolean']['output'];
  revokeBoardInvite: RevokeInvitePayload;
  revokeCanvasInvite: RevokeInvitePayload;
  sendCanvasDiff: Scalars['Boolean']['output'];
  updateBoard: UpdateBoardPayload;
  updateBoardBackground: Scalars['Boolean']['output'];
  updateCanvas: UpdateCanvasPayload;
  updateCard: Scalars['Boolean']['output'];
  updateInboxBackground: Scalars['Boolean']['output'];
};

export type MutationChangeBoardMemberRoleArgs = {
  input: ChangeMemberRoleInput;
};

export type MutationChangeCanvasMemberRoleArgs = {
  input: ChangeMemberRoleInput;
};

export type MutationCreateBoardArgs = {
  previewUrl?: InputMaybe<Scalars['Upload']['input']>;
  title: Scalars['String']['input'];
};

export type MutationCreateCanvasArgs = {
  previewUrl?: InputMaybe<Scalars['Upload']['input']>;
  title: Scalars['String']['input'];
};

export type MutationCreateCardArgs = {
  boardId: Scalars['ID']['input'];
  clientId: Scalars['ID']['input'];
  clientMutationId: Scalars['ID']['input'];
  columnId?: InputMaybe<Scalars['ID']['input']>;
  container: CardContainer;
  index: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type MutationCreateColumnArgs = {
  boardId: Scalars['ID']['input'];
  clientId: Scalars['ID']['input'];
  clientMutationId: Scalars['ID']['input'];
  index: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type MutationDeleteBoardArgs = {
  boardId: Scalars['ID']['input'];
};

export type MutationDeleteCanvasArgs = {
  canvasId: Scalars['ID']['input'];
};

export type MutationDeleteCardArgs = {
  boardId: Scalars['ID']['input'];
  cardId: Scalars['ID']['input'];
  clientMutationId: Scalars['ID']['input'];
};

export type MutationDeleteColumnArgs = {
  boardId: Scalars['ID']['input'];
  clientMutationId: Scalars['ID']['input'];
  columnId: Scalars['ID']['input'];
};

export type MutationInviteBoardUserArgs = {
  input: InviteUserInput;
};

export type MutationInviteCanvasUserArgs = {
  input: InviteUserInput;
};

export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MutationMoveCardArgs = {
  boardId: Scalars['ID']['input'];
  cardId: Scalars['ID']['input'];
  clientMutationId: Scalars['ID']['input'];
  to: MoveTargetInput;
};

export type MutationMoveColumnArgs = {
  boardId: Scalars['ID']['input'];
  clientMutationId: Scalars['ID']['input'];
  columnId: Scalars['ID']['input'];
  toIndex: Scalars['Int']['input'];
};

export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MutationRemoveBoardMemberArgs = {
  memberId: Scalars['ID']['input'];
};

export type MutationRemoveCanvasMemberArgs = {
  memberId: Scalars['ID']['input'];
};

export type MutationRenameBoardArgs = {
  boardId: Scalars['ID']['input'];
  clientMutationId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type MutationRenameCanvasArgs = {
  canvasId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type MutationRenameColumnArgs = {
  boardId: Scalars['ID']['input'];
  clientMutationId: Scalars['ID']['input'];
  columnId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type MutationRevokeBoardInviteArgs = {
  inviteId: Scalars['ID']['input'];
};

export type MutationRevokeCanvasInviteArgs = {
  inviteId: Scalars['ID']['input'];
};

export type MutationSendCanvasDiffArgs = {
  canvasId: Scalars['ID']['input'];
  diff: Scalars['JSON']['input'];
};

export type MutationUpdateBoardArgs = {
  boardId: Scalars['ID']['input'];
  input: UpdateBoardInput;
};

export type MutationUpdateBoardBackgroundArgs = {
  background: BoardBackground;
  boardId: Scalars['ID']['input'];
  clientMutationId: Scalars['ID']['input'];
};

export type MutationUpdateCanvasArgs = {
  canvasId: Scalars['ID']['input'];
  input: UpdateCanvasInput;
};

export type MutationUpdateCardArgs = {
  boardId: Scalars['ID']['input'];
  cardId: Scalars['ID']['input'];
  clientMutationId: Scalars['ID']['input'];
  patch: CardPatchInput;
};

export type MutationUpdateInboxBackgroundArgs = {
  background: BoardBackground;
  boardId: Scalars['ID']['input'];
  clientMutationId: Scalars['ID']['input'];
};

export enum OrderBy {
  OrderIndex = 'ORDER_INDEX'
}

export type PanelLayout = {
  __typename?: 'PanelLayout';
  board?: Maybe<Scalars['Float']['output']>;
  inbox?: Maybe<Scalars['Float']['output']>;
};

export type Query = {
  __typename?: 'Query';
  board: Board;
  boardList: Array<BoardListItem>;
  boardPermissions: BoardPermissionsItem;
  canvasList: Array<CanvasListItem>;
  canvasPermissions: CanvasPermissionsItem;
  me?: Maybe<User>;
  searchUserEmails: Array<UserEmailLookup>;
};

export type QueryBoardArgs = {
  boardId: Scalars['ID']['input'];
};

export type QueryBoardPermissionsArgs = {
  boardId: Scalars['ID']['input'];
};

export type QueryCanvasPermissionsArgs = {
  canvasId: Scalars['ID']['input'];
};

export type QuerySearchUserEmailsArgs = {
  query: Scalars['String']['input'];
};

export type RemoveMemberPayload = {
  __typename?: 'RemoveMemberPayload';
  removedMemberId: Scalars['ID']['output'];
  removedWasSelf: Scalars['Boolean']['output'];
  resourceId: Scalars['ID']['output'];
};

export type RevokeInvitePayload = {
  __typename?: 'RevokeInvitePayload';
  inviteId: Scalars['ID']['output'];
  resourceId: Scalars['ID']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  boardEvents: BoardEventEnvelope;
  canvasSession: Scalars['JSON']['output'];
};

export type SubscriptionBoardEventsArgs = {
  boardId: Scalars['ID']['input'];
};

export type SubscriptionCanvasSessionArgs = {
  id: Scalars['ID']['input'];
};

export type UpdateBoardInput = {
  previewImage?: InputMaybe<Scalars['Upload']['input']>;
  removePreview?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBoardPayload = {
  __typename?: 'UpdateBoardPayload';
  id: Scalars['ID']['output'];
  previewUrl?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type UpdateCanvasInput = {
  previewImage?: InputMaybe<Scalars['Upload']['input']>;
  removePreview?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCanvasPayload = {
  __typename?: 'UpdateCanvasPayload';
  id: Scalars['ID']['output'];
  previewUrl?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type UserEmailLookup = {
  __typename?: 'UserEmailLookup';
  email: Scalars['String']['output'];
};

export type InviteFieldsFragment = {
  __typename?: 'Invite';
  id: string;
  email: string;
  role: MemberRole;
  expiresAt: string;
  canRevoke: boolean;
};

export type SearchUserEmailsQueryVariables = Exact<{
  query: Scalars['String']['input'];
}>;

export type SearchUserEmailsQuery = {
  searchUserEmails: Array<{ __typename?: 'UserEmailLookup'; email: string }>;
};

export type CreateBoardMutationVariables = Exact<{
  title: Scalars['String']['input'];
  previewUrl?: InputMaybe<Scalars['Upload']['input']>;
}>;

export type CreateBoardMutation = {
  createBoard: {
    __typename?: 'BoardListItem';
    id: string;
    title: string;
    previewUrl?: string | null;
    updatedAt: string;
    membersCount: number;
    myRole: MemberRole;
    myMemberId: string;
    canEdit: boolean;
    canDelete: boolean;
    canManagePermissions: boolean;
  };
};

export type DeleteBoardMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
}>;

export type DeleteBoardMutation = {
  deleteBoard: { __typename?: 'DeleteBoardPayload'; id: string };
};

export type UpdateBoardMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  input: UpdateBoardInput;
}>;

export type UpdateBoardMutation = {
  updateBoard: {
    __typename?: 'UpdateBoardPayload';
    id: string;
    title: string;
    previewUrl?: string | null;
  };
};

export type BoardMemberFieldsFragment = {
  __typename?: 'BoardMember';
  id: string;
  role: MemberRole;
  isSelf: boolean;
  canRemove: boolean;
  canChangeRole: boolean;
  availableRoles: Array<MemberRole>;
  user: { __typename?: 'User'; id: string; name: string; email: string; avatarUrl?: string | null };
};

export type BoardPermissionsQueryVariables = Exact<{
  boardId: Scalars['ID']['input'];
}>;

export type BoardPermissionsQuery = {
  boardPermissions: {
    __typename?: 'BoardPermissionsItem';
    id: string;
    myRole: MemberRole;
    members: Array<{
      __typename?: 'BoardMember';
      id: string;
      role: MemberRole;
      isSelf: boolean;
      canRemove: boolean;
      canChangeRole: boolean;
      availableRoles: Array<MemberRole>;
      user: {
        __typename?: 'User';
        id: string;
        name: string;
        email: string;
        avatarUrl?: string | null;
      };
    }>;
    invites: Array<{
      __typename?: 'Invite';
      id: string;
      email: string;
      role: MemberRole;
      expiresAt: string;
      canRevoke: boolean;
    }>;
  };
};

export type BoardPermissionsFieldsFragment = {
  __typename?: 'BoardPermissionsItem';
  id: string;
  myRole: MemberRole;
  members: Array<{
    __typename?: 'BoardMember';
    id: string;
    role: MemberRole;
    isSelf: boolean;
    canRemove: boolean;
    canChangeRole: boolean;
    availableRoles: Array<MemberRole>;
    user: {
      __typename?: 'User';
      id: string;
      name: string;
      email: string;
      avatarUrl?: string | null;
    };
  }>;
  invites: Array<{
    __typename?: 'Invite';
    id: string;
    email: string;
    role: MemberRole;
    expiresAt: string;
    canRevoke: boolean;
  }>;
};

export type ChangeBoardMemberRoleMutationVariables = Exact<{
  input: ChangeMemberRoleInput;
}>;

export type ChangeBoardMemberRoleMutation = {
  changeBoardMemberRole: {
    __typename?: 'ChangeBoardMemberRolePayload';
    boardId: string;
    updatedMembers: Array<{
      __typename?: 'BoardMember';
      id: string;
      role: MemberRole;
      isSelf: boolean;
      canRemove: boolean;
      canChangeRole: boolean;
      availableRoles: Array<MemberRole>;
      user: {
        __typename?: 'User';
        id: string;
        name: string;
        email: string;
        avatarUrl?: string | null;
      };
    }>;
  };
};

export type InviteBoardUserMutationVariables = Exact<{
  input: InviteUserInput;
}>;

export type InviteBoardUserMutation = {
  inviteBoardUser: {
    __typename?: 'Invite';
    id: string;
    email: string;
    role: MemberRole;
    expiresAt: string;
    canRevoke: boolean;
  };
};

export type RemoveBoardMemberMutationVariables = Exact<{
  memberId: Scalars['ID']['input'];
}>;

export type RemoveBoardMemberMutation = {
  removeBoardMember: {
    __typename?: 'RemoveMemberPayload';
    resourceId: string;
    removedMemberId: string;
    removedWasSelf: boolean;
  };
};

export type RevokeBoardInviteMutationVariables = Exact<{
  inviteId: Scalars['ID']['input'];
}>;

export type RevokeBoardInviteMutation = {
  revokeBoardInvite: { __typename?: 'RevokeInvitePayload'; inviteId: string; resourceId: string };
};

export type BoardListQueryVariables = Exact<{ [key: string]: never }>;

export type BoardListQuery = {
  boardList: Array<{
    __typename?: 'BoardListItem';
    id: string;
    title: string;
    previewUrl?: string | null;
    updatedAt: string;
    membersCount: number;
    myRole: MemberRole;
    myMemberId: string;
    canEdit: boolean;
    canDelete: boolean;
    canManagePermissions: boolean;
  }>;
};

export type BoardListFieldsFragment = {
  __typename?: 'BoardListItem';
  id: string;
  title: string;
  previewUrl?: string | null;
  updatedAt: string;
  membersCount: number;
  myRole: MemberRole;
  myMemberId: string;
  canEdit: boolean;
  canDelete: boolean;
  canManagePermissions: boolean;
};

export type BoardEventsSubscriptionVariables = Exact<{
  boardId: Scalars['ID']['input'];
}>;

export type BoardEventsSubscription = {
  boardEvents: {
    __typename?: 'BoardEventEnvelope';
    boardId: string;
    revision: number;
    clientMutationId?: string | null;
    actorId: string;
    createdAt: string;
    event:
      | { __typename: 'BoardBackgroundChanged'; revision: number; background: BoardBackground }
      | { __typename: 'BoardRenamed'; revision: number; title: string }
      | {
          __typename: 'CardCreated';
          revision: number;
          index: number;
          container: CardContainer;
          columnId?: string | null;
          clientId: string;
          card: {
            __typename?: 'CardSnapshot';
            id: string;
            title: string;
            position: number;
            completed: boolean;
          };
        }
      | { __typename: 'CardDeleted'; revision: number; cardId: string }
      | {
          __typename: 'CardMoved';
          revision: number;
          cardId: string;
          to: {
            __typename?: 'CardMoveTarget';
            container: CardContainer;
            columnId?: string | null;
            position: number;
          };
        }
      | {
          __typename: 'CardUpdated';
          revision: number;
          cardId: string;
          patch: {
            __typename?: 'CardPatchPayload';
            title?: string | null;
            completed?: boolean | null;
          };
        }
      | {
          __typename: 'ColumnCreated';
          revision: number;
          index: number;
          clientId: string;
          column: { __typename?: 'ColumnSnapshot'; id: string; title: string; position: number };
        }
      | { __typename: 'ColumnDeleted'; revision: number; columnId?: string | null }
      | { __typename: 'ColumnMoved'; revision: number; columnId?: string | null; position: number }
      | { __typename: 'ColumnRenamed'; revision: number; columnId?: string | null; title: string }
      | { __typename: 'InboxBackgroundChanged'; revision: number; background: BoardBackground };
  };
};

export type CreateCardMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  clientMutationId: Scalars['ID']['input'];
  clientId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
  container: CardContainer;
  columnId?: InputMaybe<Scalars['ID']['input']>;
  index: Scalars['Int']['input'];
}>;

export type CreateCardMutation = { createCard: boolean };

export type CreateColumnMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  clientMutationId: Scalars['ID']['input'];
  clientId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
  index: Scalars['Int']['input'];
}>;

export type CreateColumnMutation = { createColumn: boolean };

export type DeleteCardMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  clientMutationId: Scalars['ID']['input'];
  cardId: Scalars['ID']['input'];
}>;

export type DeleteCardMutation = { deleteCard: boolean };

export type DeleteColumnMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  clientMutationId: Scalars['ID']['input'];
  columnId: Scalars['ID']['input'];
}>;

export type DeleteColumnMutation = { deleteColumn: boolean };

export type MoveCardMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  clientMutationId: Scalars['ID']['input'];
  cardId: Scalars['ID']['input'];
  to: MoveTargetInput;
}>;

export type MoveCardMutation = { moveCard: boolean };

export type MoveColumnMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  clientMutationId: Scalars['ID']['input'];
  columnId: Scalars['ID']['input'];
  toIndex: Scalars['Int']['input'];
}>;

export type MoveColumnMutation = { moveColumn: boolean };

export type RenameBoardMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  clientMutationId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
}>;

export type RenameBoardMutation = { renameBoard: boolean };

export type RenameColumnMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  clientMutationId: Scalars['ID']['input'];
  columnId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
}>;

export type RenameColumnMutation = { renameColumn: boolean };

export type UpdateBoardBackgroundMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  clientMutationId: Scalars['ID']['input'];
  background: BoardBackground;
}>;

export type UpdateBoardBackgroundMutation = { updateBoardBackground: boolean };

export type UpdateCardMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  clientMutationId: Scalars['ID']['input'];
  cardId: Scalars['ID']['input'];
  patch: CardPatchInput;
}>;

export type UpdateCardMutation = { updateCard: boolean };

export type UpdateInboxBackgroundMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  clientMutationId: Scalars['ID']['input'];
  background: BoardBackground;
}>;

export type UpdateInboxBackgroundMutation = { updateInboxBackground: boolean };

export type BoardSnapshotFragment = {
  __typename?: 'Board';
  id: string;
  title: string;
  inboxBackground: BoardBackground;
  boardBackground: BoardBackground;
  revision: number;
  panelLayout: { __typename?: 'PanelLayout'; inbox?: number | null; board?: number | null };
  inboxCards: Array<{
    __typename?: 'BoardCard';
    id: string;
    title: string;
    completed: boolean;
    position: number;
  }>;
  columns: Array<{
    __typename?: 'BoardColumn';
    id: string;
    title: string;
    position: number;
    cards: Array<{
      __typename?: 'BoardCard';
      id: string;
      title: string;
      completed: boolean;
      position: number;
    }>;
  }>;
};

export type BoardSnapshotQueryVariables = Exact<{
  boardId: Scalars['ID']['input'];
}>;

export type BoardSnapshotQuery = {
  board: {
    __typename?: 'Board';
    id: string;
    title: string;
    inboxBackground: BoardBackground;
    boardBackground: BoardBackground;
    revision: number;
    panelLayout: { __typename?: 'PanelLayout'; inbox?: number | null; board?: number | null };
    inboxCards: Array<{
      __typename?: 'BoardCard';
      id: string;
      title: string;
      completed: boolean;
      position: number;
    }>;
    columns: Array<{
      __typename?: 'BoardColumn';
      id: string;
      title: string;
      position: number;
      cards: Array<{
        __typename?: 'BoardCard';
        id: string;
        title: string;
        completed: boolean;
        position: number;
      }>;
    }>;
  };
};

export type CreateCanvasMutationVariables = Exact<{
  title: Scalars['String']['input'];
  previewUrl?: InputMaybe<Scalars['Upload']['input']>;
}>;

export type CreateCanvasMutation = {
  createCanvas: {
    __typename?: 'CanvasListItem';
    id: string;
    title: string;
    previewUrl?: string | null;
    updatedAt: string;
    membersCount: number;
    myRole: MemberRole;
    myMemberId: string;
    canEdit: boolean;
    canDelete: boolean;
    canManagePermissions: boolean;
  };
};

export type DeleteCanvasMutationVariables = Exact<{
  canvasId: Scalars['ID']['input'];
}>;

export type DeleteCanvasMutation = {
  deleteCanvas: { __typename?: 'DeleteCanvasPayload'; id: string };
};

export type UpdateCanvasMutationVariables = Exact<{
  canvasId: Scalars['ID']['input'];
  input: UpdateCanvasInput;
}>;

export type UpdateCanvasMutation = {
  updateCanvas: {
    __typename?: 'UpdateCanvasPayload';
    id: string;
    title: string;
    previewUrl?: string | null;
  };
};

export type CanvasMemberFieldsFragment = {
  __typename?: 'CanvasMember';
  id: string;
  role: MemberRole;
  isSelf: boolean;
  canRemove: boolean;
  canChangeRole: boolean;
  availableRoles: Array<MemberRole>;
  user: { __typename?: 'User'; id: string; name: string; email: string; avatarUrl?: string | null };
};

export type CanvasPermissionsQueryVariables = Exact<{
  canvasId: Scalars['ID']['input'];
}>;

export type CanvasPermissionsQuery = {
  canvasPermissions: {
    __typename?: 'CanvasPermissionsItem';
    id: string;
    myRole: MemberRole;
    members: Array<{
      __typename?: 'CanvasMember';
      id: string;
      role: MemberRole;
      isSelf: boolean;
      canRemove: boolean;
      canChangeRole: boolean;
      availableRoles: Array<MemberRole>;
      user: {
        __typename?: 'User';
        id: string;
        name: string;
        email: string;
        avatarUrl?: string | null;
      };
    }>;
    invites: Array<{
      __typename?: 'Invite';
      id: string;
      email: string;
      role: MemberRole;
      expiresAt: string;
      canRevoke: boolean;
    }>;
  };
};

export type CanvasPermissionsFieldsFragment = {
  __typename?: 'CanvasPermissionsItem';
  id: string;
  myRole: MemberRole;
  members: Array<{
    __typename?: 'CanvasMember';
    id: string;
    role: MemberRole;
    isSelf: boolean;
    canRemove: boolean;
    canChangeRole: boolean;
    availableRoles: Array<MemberRole>;
    user: {
      __typename?: 'User';
      id: string;
      name: string;
      email: string;
      avatarUrl?: string | null;
    };
  }>;
  invites: Array<{
    __typename?: 'Invite';
    id: string;
    email: string;
    role: MemberRole;
    expiresAt: string;
    canRevoke: boolean;
  }>;
};

export type ChangeCanvasMemberRoleMutationVariables = Exact<{
  input: ChangeMemberRoleInput;
}>;

export type ChangeCanvasMemberRoleMutation = {
  changeCanvasMemberRole: {
    __typename?: 'ChangeCanvasMemberRolePayload';
    canvasId: string;
    updatedMembers: Array<{
      __typename?: 'CanvasMember';
      id: string;
      role: MemberRole;
      isSelf: boolean;
      canRemove: boolean;
      canChangeRole: boolean;
      availableRoles: Array<MemberRole>;
      user: {
        __typename?: 'User';
        id: string;
        name: string;
        email: string;
        avatarUrl?: string | null;
      };
    }>;
  };
};

export type InviteCanvasUserMutationVariables = Exact<{
  input: InviteUserInput;
}>;

export type InviteCanvasUserMutation = {
  inviteCanvasUser: {
    __typename?: 'Invite';
    id: string;
    email: string;
    role: MemberRole;
    expiresAt: string;
    canRevoke: boolean;
  };
};

export type RemoveCanvasMemberMutationVariables = Exact<{
  memberId: Scalars['ID']['input'];
}>;

export type RemoveCanvasMemberMutation = {
  removeCanvasMember: {
    __typename?: 'RemoveMemberPayload';
    resourceId: string;
    removedMemberId: string;
    removedWasSelf: boolean;
  };
};

export type RevokeCanvasInviteMutationVariables = Exact<{
  inviteId: Scalars['ID']['input'];
}>;

export type RevokeCanvasInviteMutation = {
  revokeCanvasInvite: { __typename?: 'RevokeInvitePayload'; inviteId: string; resourceId: string };
};

export type CanvasListQueryVariables = Exact<{ [key: string]: never }>;

export type CanvasListQuery = {
  canvasList: Array<{
    __typename?: 'CanvasListItem';
    id: string;
    title: string;
    previewUrl?: string | null;
    updatedAt: string;
    membersCount: number;
    myRole: MemberRole;
    myMemberId: string;
    canEdit: boolean;
    canDelete: boolean;
    canManagePermissions: boolean;
  }>;
};

export type CanvasListFieldsFragment = {
  __typename?: 'CanvasListItem';
  id: string;
  title: string;
  previewUrl?: string | null;
  updatedAt: string;
  membersCount: number;
  myRole: MemberRole;
  myMemberId: string;
  canEdit: boolean;
  canDelete: boolean;
  canManagePermissions: boolean;
};

export type CanvasSessionSubscriptionVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type CanvasSessionSubscription = { canvasSession: unknown };

export type RenameCanvasMutationVariables = Exact<{
  canvasId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
}>;

export type RenameCanvasMutation = { renameCanvas: boolean };

export type SendCanvasDiffMutationVariables = Exact<{
  canvasId: Scalars['ID']['input'];
  diff: Scalars['JSON']['input'];
}>;

export type SendCanvasDiffMutation = { sendCanvasDiff: boolean };

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { logout: boolean };

export type RefreshSessionMutationVariables = Exact<{ [key: string]: never }>;

export type RefreshSessionMutation = { refreshSession: boolean };

export type GetMeQueryVariables = Exact<{ [key: string]: never }>;

export type GetMeQuery = {
  me?: {
    __typename?: 'User';
    id: string;
    name: string;
    email: string;
    avatarUrl?: string | null;
  } | null;
};

export type UserFieldsFragment = {
  __typename?: 'User';
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export type LoginMutation = {
  login: {
    __typename?: 'User';
    id: string;
    name: string;
    email: string;
    avatarUrl?: string | null;
  };
};

export type RegisterMutationVariables = Exact<{
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export type RegisterMutation = {
  register: {
    __typename?: 'User';
    id: string;
    name: string;
    email: string;
    avatarUrl?: string | null;
  };
};

export const UserFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'avatarUrl' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<UserFieldsFragment, unknown>;
export const BoardMemberFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'BoardMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'BoardMember' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'role' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isSelf' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canRemove' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canChangeRole' } },
          { kind: 'Field', name: { kind: 'Name', value: 'availableRoles' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'UserFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'avatarUrl' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<BoardMemberFieldsFragment, unknown>;
export const InviteFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'InviteFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Invite' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'role' } },
          { kind: 'Field', name: { kind: 'Name', value: 'expiresAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canRevoke' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<InviteFieldsFragment, unknown>;
export const BoardPermissionsFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'BoardPermissionsFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'BoardPermissionsItem' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'myRole' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'members' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'BoardMemberFields' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'invites' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'InviteFields' } }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'avatarUrl' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'BoardMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'BoardMember' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'role' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isSelf' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canRemove' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canChangeRole' } },
          { kind: 'Field', name: { kind: 'Name', value: 'availableRoles' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'UserFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'InviteFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Invite' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'role' } },
          { kind: 'Field', name: { kind: 'Name', value: 'expiresAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canRevoke' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<BoardPermissionsFieldsFragment, unknown>;
export const BoardListFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'BoardListFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'BoardListItem' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'previewUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'membersCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'myRole' } },
          { kind: 'Field', name: { kind: 'Name', value: 'myMemberId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canEdit' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canDelete' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canManagePermissions' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<BoardListFieldsFragment, unknown>;
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
                { kind: 'Field', name: { kind: 'Name', value: 'position' } }
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
                { kind: 'Field', name: { kind: 'Name', value: 'position' } },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'position' } }
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
export const CanvasMemberFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CanvasMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'CanvasMember' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'role' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isSelf' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canRemove' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canChangeRole' } },
          { kind: 'Field', name: { kind: 'Name', value: 'availableRoles' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'UserFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'avatarUrl' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CanvasMemberFieldsFragment, unknown>;
export const CanvasPermissionsFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CanvasPermissionsFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'CanvasPermissionsItem' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'myRole' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'members' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CanvasMemberFields' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'invites' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'InviteFields' } }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'avatarUrl' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CanvasMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'CanvasMember' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'role' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isSelf' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canRemove' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canChangeRole' } },
          { kind: 'Field', name: { kind: 'Name', value: 'availableRoles' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'UserFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'InviteFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Invite' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'role' } },
          { kind: 'Field', name: { kind: 'Name', value: 'expiresAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canRevoke' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CanvasPermissionsFieldsFragment, unknown>;
export const CanvasListFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CanvasListFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'CanvasListItem' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'previewUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'membersCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'myRole' } },
          { kind: 'Field', name: { kind: 'Name', value: 'myMemberId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canEdit' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canDelete' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canManagePermissions' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CanvasListFieldsFragment, unknown>;
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
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'title' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'previewUrl' } },
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
                name: { kind: 'Name', value: 'title' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'title' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'previewUrl' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'previewUrl' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'BoardListFields' } }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'BoardListFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'BoardListItem' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'previewUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'membersCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'myRole' } },
          { kind: 'Field', name: { kind: 'Name', value: 'myMemberId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canEdit' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canDelete' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canManagePermissions' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CreateBoardMutation, CreateBoardMutationVariables>;
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
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateBoardInput' } }
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
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'previewUrl' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<UpdateBoardMutation, UpdateBoardMutationVariables>;
export const BoardPermissionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'BoardPermissions' },
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
            name: { kind: 'Name', value: 'boardPermissions' },
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
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'BoardPermissionsFields' } }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'avatarUrl' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'BoardMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'BoardMember' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'role' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isSelf' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canRemove' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canChangeRole' } },
          { kind: 'Field', name: { kind: 'Name', value: 'availableRoles' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'UserFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'InviteFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Invite' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'role' } },
          { kind: 'Field', name: { kind: 'Name', value: 'expiresAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canRevoke' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'BoardPermissionsFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'BoardPermissionsItem' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'myRole' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'members' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'BoardMemberFields' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'invites' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'InviteFields' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<BoardPermissionsQuery, BoardPermissionsQueryVariables>;
export const ChangeBoardMemberRoleDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ChangeBoardMemberRole' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ChangeMemberRoleInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'changeBoardMemberRole' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'boardId' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'updatedMembers' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'BoardMemberFields' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'avatarUrl' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'BoardMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'BoardMember' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'role' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isSelf' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canRemove' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canChangeRole' } },
          { kind: 'Field', name: { kind: 'Name', value: 'availableRoles' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'UserFields' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<ChangeBoardMemberRoleMutation, ChangeBoardMemberRoleMutationVariables>;
export const InviteBoardUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'InviteBoardUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'InviteUserInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'inviteBoardUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'InviteFields' } }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'InviteFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Invite' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'role' } },
          { kind: 'Field', name: { kind: 'Name', value: 'expiresAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canRevoke' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<InviteBoardUserMutation, InviteBoardUserMutationVariables>;
export const RemoveBoardMemberDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RemoveBoardMember' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'memberId' } },
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
            name: { kind: 'Name', value: 'removeBoardMember' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'memberId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'memberId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'resourceId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'removedMemberId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'removedWasSelf' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<RemoveBoardMemberMutation, RemoveBoardMemberMutationVariables>;
export const RevokeBoardInviteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RevokeBoardInvite' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'inviteId' } },
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
            name: { kind: 'Name', value: 'revokeBoardInvite' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'inviteId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'inviteId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'inviteId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'resourceId' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<RevokeBoardInviteMutation, RevokeBoardInviteMutationVariables>;
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
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'BoardListFields' } }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'BoardListFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'BoardListItem' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'previewUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'membersCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'myRole' } },
          { kind: 'Field', name: { kind: 'Name', value: 'myMemberId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canEdit' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canDelete' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canManagePermissions' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<BoardListQuery, BoardListQueryVariables>;
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
                { kind: 'Field', name: { kind: 'Name', value: 'boardId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'revision' } },
                { kind: 'Field', name: { kind: 'Name', value: 'clientMutationId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'actorId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'event' },
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
                                  { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'position' } }
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
                            { kind: 'Field', name: { kind: 'Name', value: 'position' } }
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
                                  { kind: 'Field', name: { kind: 'Name', value: 'position' } },
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
                          name: { kind: 'Name', value: 'CardMoved' }
                        },
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
                                  { kind: 'Field', name: { kind: 'Name', value: 'position' } }
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
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'clientMutationId' } },
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
                name: { kind: 'Name', value: 'clientMutationId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'clientMutationId' } }
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
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'clientMutationId' } },
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
                name: { kind: 'Name', value: 'clientMutationId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'clientMutationId' } }
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
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'clientMutationId' } },
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
                name: { kind: 'Name', value: 'clientMutationId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'clientMutationId' } }
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
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'clientMutationId' } },
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
                name: { kind: 'Name', value: 'clientMutationId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'clientMutationId' } }
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
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'clientMutationId' } },
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
                name: { kind: 'Name', value: 'clientMutationId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'clientMutationId' } }
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
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'clientMutationId' } },
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
                name: { kind: 'Name', value: 'clientMutationId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'clientMutationId' } }
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
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'clientMutationId' } },
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
                name: { kind: 'Name', value: 'clientMutationId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'clientMutationId' } }
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
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'clientMutationId' } },
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
                name: { kind: 'Name', value: 'clientMutationId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'clientMutationId' } }
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
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'clientMutationId' } },
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
                name: { kind: 'Name', value: 'clientMutationId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'clientMutationId' } }
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
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'clientMutationId' } },
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
                name: { kind: 'Name', value: 'clientMutationId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'clientMutationId' } }
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
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'clientMutationId' } },
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
                name: { kind: 'Name', value: 'clientMutationId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'clientMutationId' } }
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
                name: { kind: 'Name', value: 'boardId' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'position' } }
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
                { kind: 'Field', name: { kind: 'Name', value: 'position' } },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'position' } }
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
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'title' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'previewUrl' } },
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
                name: { kind: 'Name', value: 'title' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'title' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'previewUrl' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'previewUrl' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CanvasListFields' } }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CanvasListFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'CanvasListItem' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'previewUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'membersCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'myRole' } },
          { kind: 'Field', name: { kind: 'Name', value: 'myMemberId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canEdit' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canDelete' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canManagePermissions' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CreateCanvasMutation, CreateCanvasMutationVariables>;
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
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateCanvasInput' } }
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
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'previewUrl' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<UpdateCanvasMutation, UpdateCanvasMutationVariables>;
export const CanvasPermissionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'CanvasPermissions' },
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
            name: { kind: 'Name', value: 'canvasPermissions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'canvasId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'canvasId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CanvasPermissionsFields' } }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'avatarUrl' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CanvasMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'CanvasMember' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'role' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isSelf' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canRemove' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canChangeRole' } },
          { kind: 'Field', name: { kind: 'Name', value: 'availableRoles' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'UserFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'InviteFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Invite' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'role' } },
          { kind: 'Field', name: { kind: 'Name', value: 'expiresAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canRevoke' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CanvasPermissionsFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'CanvasPermissionsItem' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'myRole' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'members' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CanvasMemberFields' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'invites' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'InviteFields' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CanvasPermissionsQuery, CanvasPermissionsQueryVariables>;
export const ChangeCanvasMemberRoleDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ChangeCanvasMemberRole' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ChangeMemberRoleInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'changeCanvasMemberRole' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'canvasId' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'updatedMembers' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'CanvasMemberFields' }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'avatarUrl' } }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CanvasMemberFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'CanvasMember' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'role' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isSelf' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canRemove' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canChangeRole' } },
          { kind: 'Field', name: { kind: 'Name', value: 'availableRoles' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'UserFields' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  ChangeCanvasMemberRoleMutation,
  ChangeCanvasMemberRoleMutationVariables
>;
export const InviteCanvasUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'InviteCanvasUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'InviteUserInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'inviteCanvasUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'InviteFields' } }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'InviteFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Invite' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'role' } },
          { kind: 'Field', name: { kind: 'Name', value: 'expiresAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canRevoke' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<InviteCanvasUserMutation, InviteCanvasUserMutationVariables>;
export const RemoveCanvasMemberDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RemoveCanvasMember' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'memberId' } },
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
            name: { kind: 'Name', value: 'removeCanvasMember' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'memberId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'memberId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'resourceId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'removedMemberId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'removedWasSelf' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<RemoveCanvasMemberMutation, RemoveCanvasMemberMutationVariables>;
export const RevokeCanvasInviteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RevokeCanvasInvite' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'inviteId' } },
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
            name: { kind: 'Name', value: 'revokeCanvasInvite' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'inviteId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'inviteId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'inviteId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'resourceId' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<RevokeCanvasInviteMutation, RevokeCanvasInviteMutationVariables>;
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
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CanvasListFields' } }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CanvasListFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'CanvasListItem' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'previewUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'membersCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'myRole' } },
          { kind: 'Field', name: { kind: 'Name', value: 'myMemberId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canEdit' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canDelete' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canManagePermissions' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CanvasListQuery, CanvasListQueryVariables>;
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
            name: { kind: 'Name', value: 'renameCanvas' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'canvasId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'canvasId' } }
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'UserFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'avatarUrl' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetMeQuery, GetMeQueryVariables>;
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'UserFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'avatarUrl' } }
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
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
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
                name: { kind: 'Name', value: 'name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'name' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'password' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'password' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'UserFields' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'avatarUrl' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
