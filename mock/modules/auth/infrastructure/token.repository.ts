import { AppOrm } from "@mock/infra/orm";

class TokenRepository {
  static storeRefreshToken(
    orm: AppOrm,
    userId: number,
    token: string,
    expiresAt: string
  ) {
    orm.refreshTokens.create({
      tokenHash: token,
      userId,
      expiresAt
    });
  }

  static findRefreshToken(orm: AppOrm, token: string) {
    return orm.refreshTokens.findFirst({ tokenHash: token });
  }

  static deleteRefreshToken(orm: AppOrm, id: number) {
    orm.refreshTokens.delete(id);
  }

  static deleteAllUserTokens(orm: AppOrm, userId: number) {
    const tokens = orm.refreshTokens.findMany({ userId });
    const tokenIds = tokens.map(t => t.id);
    orm.refreshTokens.deleteMany(tokenIds);
    // tokens.forEach(t => orm.refreshTokens.delete(t.id));
  }
}

export { TokenRepository };