import { AppOrm } from "@mock/infra/orm";
import { failure, ServiceResult, success, toNumberId } from "@mock/shared";
import { UserEmailLookup, UserFieldsFragment } from "@src/common/api/graphql/__generated__";
import { mapUser } from "./user.mapper";

class UserQuery {
  static getMe(userId: string, orm: AppOrm): ServiceResult<UserFieldsFragment> {

    const uId = toNumberId(userId);

    const user = orm.users.findById(uId);
    if (!user) return failure('User not found', 'USER_NOT_FOUND');

    return success(mapUser(user));
  }


  static searchUserEmails(query: string, orm: AppOrm): ServiceResult<UserEmailLookup[]> {
    const lower = query.toLowerCase();

    const result = orm.users
      .findMany()
      .filter((user) => user.email.toLowerCase().includes(lower))
      .map((user) => ({
        __typename: 'UserEmailLookup' as const,
        email: user.email
      }));

    return success(result);
  }
}

export { UserQuery }