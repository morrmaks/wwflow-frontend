import { ModelOf } from "@mock/infra/orm";
import { UserFieldsFragment } from "@src/common/api/graphql/__generated__";

function mapUser(user: ModelOf<'users'>): UserFieldsFragment {
  return {
    __typename: 'User',
    id: String(user.id),
    email: user.email,
    name: user.name,
    avatarUrl: user.avatarUrl
  };
}

export { mapUser }