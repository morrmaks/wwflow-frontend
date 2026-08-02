import type { AppOrm } from '@mock/infra/orm';
import type { ServiceResult} from '@mock/shared';
import type { CanvasListItem, CanvasPermissionsItem } from '@src/common/api/graphql/__generated__';

import { failure, success, toNumberId, toStringId } from '@mock/shared';

import { mapCanvasListItem, mapCanvasMember, mapInvite } from './canvas.mapper';
import { canRevokeInvite, getMember, roleRank } from '../domain/canvas.member-policy';

class CanvasQuery {
  static getCanvasList(userId: string, orm: AppOrm): ServiceResult<CanvasListItem[]> {
    const uId = toNumberId(userId);

    const memberships = orm.canvasMembers.findMany({ userId: uId });
    const membershipMap = new Map(memberships.map((m) => [m.canvasId, m]));

    const canvases = orm.canvas
      .findMany()
      .filter((c) => membershipMap.has(c.id))
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

    const items = canvases.map((canvas) => {
      const membership = membershipMap.get(canvas.id)!;
      return mapCanvasListItem(orm, canvas, membership);
    });

    return success(items);
  }

  static getCanvasPermissions(
    canvasId: string,
    userId: string,
    orm: AppOrm
  ): ServiceResult<CanvasPermissionsItem> {
    const cId = toNumberId(canvasId);
    const uId = toNumberId(userId);

    const canvas = orm.canvas.findById(cId);
    if (!canvas) return failure('Canvas not found', 'CANVAS_NOT_FOUND');

    const member = getMember(orm, cId, uId);
    if (!member) return failure('Access denied', 'ACCESS_DENIED');

    const members = orm.canvasMembers
      .findMany({ canvasId: cId })
      .sort((a, b) => roleRank[b.role] - roleRank[a.role])
      .map((m) => mapCanvasMember(orm, m, uId, member.role));

    const invites = orm.invites
      .findMany({ canvasId: cId })
      .map((invite) => mapInvite(invite, canRevokeInvite(member, invite, uId)));

    return success({
      __typename: 'CanvasPermissionsItem' as const,
      id: toStringId(canvas.id),
      myRole: member.role,
      members,
      invites
    });
  }
}

export { CanvasQuery };
