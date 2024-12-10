import { UserType } from "../types/userType";
import { RoleType } from "../types/roleType";
import { UserCard } from "./UserCard";

type Props = {
  activeRoleTab: RoleType;
  processedUserList: UserType[];
  originalUserList: UserType[];
};

export const UserList = ({ activeRoleTab, processedUserList, originalUserList }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-4 my-4">
      {processedUserList.map((user) => (
        <UserCard key={user.id} user={user} activeRoleTab={activeRoleTab} originalUserList={originalUserList} />
      ))}
    </div>
  );
};
