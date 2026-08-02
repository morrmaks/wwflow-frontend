import type { AppOrm, ModelOf } from '@mock/infra/orm';
import type { ServiceResult } from '@mock/shared';
import type {
  CanvasListItem,
  DeleteCanvasPayload,
  UpdateCanvasInput,
  UpdateCanvasPayload
} from '@src/common/api/graphql/__generated__';

import { failure, success, toNumberId, toStringId } from '@mock/shared';
import { MemberRole } from '@src/common/api/graphql/__generated__';

import { mapCanvasListItem } from './canvas.mapper';
import { getMember, hasAtLeast } from '../domain/canvas.member-policy';

class CanvasCommand {
  private static deleteCascade(orm: AppOrm, canvasId: number) {
    const members = orm.canvasMembers.findMany({ canvasId });
    const memberIds = members.map((m) => m.id);

    const invites = orm.invites.findMany({ canvasId });
    const inviteIds = invites.map((i) => i.id);

    if (memberIds.length) orm.canvasMembers.deleteMany(memberIds);
    if (inviteIds.length) orm.invites.deleteMany(inviteIds);

    orm.canvas.delete(canvasId);
  }

  // ======================================
  // Create
  // ======================================

  static createCanvas(
    title: string,
    previewUrl: string | null,
    userId: string,
    orm: AppOrm
  ): ServiceResult<CanvasListItem> {
    const uId = toNumberId(userId);
    const now = new Date().toISOString();

    const canvas = orm.canvas.create({
      title,
      previewUrl,
      snapshot: {},
      version: 1,
      createdAt: now,
      updatedAt: now
    });

    const membership = orm.canvasMembers.create({
      role: MemberRole.Owner,
      userId: uId,
      canvasId: canvas.id
    });

    return success(mapCanvasListItem(orm, canvas, membership));
  }

  // ======================================
  // Update
  // ======================================

  static updateCanvas(
    canvasId: string,
    input: UpdateCanvasInput,
    userId: string,
    orm: AppOrm,
    previewUrl?: string | null
  ): ServiceResult<UpdateCanvasPayload> {
    const cId = toNumberId(canvasId);
    const uId = toNumberId(userId);

    const canvas = orm.canvas.findById(cId);
    if (!canvas) return failure('Canvas not found', 'CANVAS_NOT_FOUND');

    const member = getMember(orm, cId, uId);
    if (!member) return failure('Access denied', 'ACCESS_DENIED');

    if (!hasAtLeast(member.role, MemberRole.Admin))
      return failure('INSUFFICIENT_PERMISSIONS', 'INSUFFICIENT_PERMISSIONS');

    const updateData: Partial<ModelOf<'canvas'>> = {
      updatedAt: new Date().toISOString()
    };

    if (typeof input.title === 'string') {
      updateData.title = input.title;
    }

    if (input.removePreview) {
      updateData.previewUrl = null;
    } else if (previewUrl) {
      updateData.previewUrl = previewUrl;
    }

    orm.canvas.update(cId, updateData);

    const updated = orm.canvas.findById(cId)!;

    return success({
      __typename: 'UpdateCanvasPayload',
      id: toStringId(updated.id),
      title: updated.title,
      previewUrl: updated.previewUrl
    });
  }

  // ======================================
  // Delete
  // ======================================

  static deleteCanvas(
    canvasId: string,
    userId: string,
    orm: AppOrm
  ): ServiceResult<DeleteCanvasPayload> {
    const cId = toNumberId(canvasId);
    const uId = toNumberId(userId);

    const canvas = orm.canvas.findById(cId);
    if (!canvas) return failure('Canvas not found', 'CANVAS_NOT_FOUND');

    const member = getMember(orm, cId, uId);
    if (!member || member.role !== MemberRole.Owner)
      return failure('INSUFFICIENT_PERMISSIONS', 'INSUFFICIENT_PERMISSIONS');

    this.deleteCascade(orm, cId);

    return success({
      __typename: 'DeleteCanvasPayload',
      id: toStringId(cId)
    });
  }
}

export { CanvasCommand };
