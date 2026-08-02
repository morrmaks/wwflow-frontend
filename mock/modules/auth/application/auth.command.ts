import { AppOrm } from "@mock/infra/orm";
import { failure, ServiceResult, success, toStringId } from "@mock/shared";
import { LogoutMutation, RefreshSessionMutation, UserFieldsFragment } from "@src/common/api/graphql/__generated__";
import { mapUser } from "@mock/modules/user/application/user.mapper";
import { TokenService } from "./token.service";

class AuthCommand {
  static register(
    email: string,
    name: string,
    password: string,
    orm: AppOrm
  ): ServiceResult<{ user: UserFieldsFragment; accessToken: string; refreshToken: string }> {

    const existing = orm.users.findFirst({ email });
    if (existing) return failure('User already exists', 'USER_EXISTS');

    const now = new Date().toISOString();

    const user = orm.users.create({
      email,
      name,
      password,
      avatarUrl: null,
      createdAt: now,
      updatedAt: now,
      deletedAt: null
    });

    const tokens = TokenService.generateTokens({
      id: toStringId(user.id),
      email: user.email
    }, orm);

    return success({
      user: mapUser(user),
      ...tokens
    });
  }

  static login(
    email: string,
    password: string,
    orm: AppOrm
  ): ServiceResult<{ user: UserFieldsFragment; accessToken: string; refreshToken: string }> {
    const user = orm.users.findFirst({ email });
    
    if (!user || user.password !== password)
      return failure('Invalid credentials', 'INVALID_CREDENTIALS');

    const tokens = TokenService.generateTokens({
      id: toStringId(user.id),
      email: user.email
    }, orm);

    return success({
      user: mapUser(user),
      ...tokens
    });
  }

  static logout(refreshToken: string, orm: AppOrm): ServiceResult<LogoutMutation> {
    TokenService.revokeRefreshToken(refreshToken, orm);
    return success({ logout: true});
  }

  static refresh(
    refreshToken: string, 
    orm: AppOrm
  ): ServiceResult<{ 
    response: RefreshSessionMutation['refreshSession']; 
    accessToken: string; 
    refreshToken: string, 
  }> {
    if (!refreshToken) return failure('Unauthorized', 'UNAUTHENTICATED');

    const tokens = TokenService.rotateRefreshToken(refreshToken, orm);
    if (!tokens) return failure('Unauthorized', 'UNAUTHENTICATED');

    return success({ response: true, ...tokens });
  }
}

export { AuthCommand }