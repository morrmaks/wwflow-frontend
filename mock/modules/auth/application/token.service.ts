import { AppOrm } from "@mock/infra/orm";
import { TokenRepository } from "../infrastructure/token.repository";
import { TokenGenerator } from "../domain/token.generator";
import { toNumberId } from "@mock/shared";

class TokenService {
  static generateTokens(user: { id: string; email: string }, orm: AppOrm) {
    const accessToken = TokenGenerator.createAccessToken(user);
    const refreshToken = TokenGenerator.createRefreshToken(user);

    const expiresAt = new Date(Date.now() + 7 * 86400000).toISOString();

    TokenRepository.storeRefreshToken(
      orm,
      toNumberId(user.id),
      refreshToken,
      expiresAt
    );

    return { accessToken, refreshToken };
  }

  static rotateRefreshToken(refreshToken: string, orm: AppOrm) {
    const payload = TokenGenerator.validateRefreshToken(refreshToken);
    if (!payload) return null;

    const existing = TokenRepository.findRefreshToken(orm, refreshToken);
    if (!existing) {
      TokenRepository.deleteAllUserTokens(orm, toNumberId(payload.id));
      return null;
    }

    if (new Date(existing.expiresAt) < new Date()) {
      TokenRepository.deleteRefreshToken(orm, existing.id);
      return null;
    }

    TokenRepository.deleteRefreshToken(orm, existing.id);

    return this.generateTokens(payload, orm);
  }

  static revokeRefreshToken(refreshToken: string, orm: AppOrm) {
    const existing = TokenRepository.findRefreshToken(orm, refreshToken);
    if (!existing) return;

    TokenRepository.deleteRefreshToken(orm, existing.id);
  }
}

export { TokenService };