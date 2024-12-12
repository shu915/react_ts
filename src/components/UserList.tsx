import { User } from "../types/user";
import { Role } from "../types/role";
import { UserCard } from "./UserCard";

type Props = {
  activeRoleTab: Role;
  processedUserList: User[];
  originalUserList: User[];
};

export const UserList = ({
  activeRoleTab,
  processedUserList,
  originalUserList,
}: Props) => {
  return (
    <div className="grid grid-cols-2 gap-4 my-4">
      {processedUserList.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          activeRoleTab={activeRoleTab}
          originalUserList={originalUserList}
        />
      ))}
    </div>
  );
};
