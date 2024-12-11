import { useState } from "react";
import "./App.css";
import { UserType } from "./types/user";
import { USER_LIST } from "./constant/userList";
import { RoleTab } from "./components/RoleTab";
import { UserList } from "./components/UserList";
import { SortSelector } from "./components/SortSelector";
import { RoleType } from "./types/role";
import { SortType } from "./types/sort";
import { OrderType } from "./types/order";
import { CreateUserModal } from "./components/CreateUserModal";
import { HobbySelector } from "./components/HobbySelector";
import { LanguageSelector } from "./components/LanguageSelector";

function App() {
  const [activeRoleTab, setActiveRoleTab] = useState<RoleType>("all");
  const [sortCriteria, setSortCriteria] = useState<SortType>("id");
  const [sortOrder, setSortOrder] = useState<OrderType>("asc");
  const [isOpenCreateUserModal, setIsOpenCreateUserModal] =
    useState<boolean>(false);
  const [originalUserList, setOriginalUserList] =
    useState<UserType[]>(USER_LIST);
  const [selectedHobby, setSelectedHobby] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const roleMatcher = (user: UserType, selectedRole: RoleType) => {
    return selectedRole === "all" || user.role === selectedRole;
  };

  const hobbyMatcher = (user: UserType, selectedHobby: string) => {
    // フィルターが空の場合はすべてのユーザーを許可
    return selectedHobby.length === 0 || user.hobbies?.includes(selectedHobby);
  };

  const languageMatcher = (user: UserType, selectedLanguage: string) => {
    // フィルターが空の場合はすべてのユーザーを許可
    if (user.role === "student") {
      return (
        selectedLanguage.length === 0 ||
        user.studyLangs?.includes(selectedLanguage)
      );
    } else {
      return (
        selectedLanguage.length === 0 ||
        user.useLangs?.includes(selectedLanguage)
      );
    }
  };

  const processedUserList = originalUserList
    .filter((user) => {
      const roleMatch = roleMatcher(user, activeRoleTab);
      const hobbyMatch = hobbyMatcher(user, selectedHobby);
      const languageMatch = languageMatcher(user, selectedLanguage);
      return roleMatch && hobbyMatch && languageMatch;
    })
    .sort((a, b) => {
      return sortOrder === "asc"
        ? (a[sortCriteria] as number) - (b[sortCriteria] as number)
        : (b[sortCriteria] as number) - (a[sortCriteria] as number);
    });

  const onClickCreateUser = () => {
    setIsOpenCreateUserModal(true);
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <RoleTab
            activeRoleTab={activeRoleTab}
            setActiveRoleTab={setActiveRoleTab}
          />
          <div className="flex gap-6 items-center">
            <SortSelector
              activeRoleTab={activeRoleTab}
              sortCriteria={sortCriteria}
              sortOrder={sortOrder}
              setSortCriteria={setSortCriteria}
              setSortOrder={setSortOrder}
            />
            <HobbySelector setSelectedHobby={setSelectedHobby} />
            <LanguageSelector setSelectedLanguage={setSelectedLanguage} />
            <button
              onClick={onClickCreateUser}
              className="border bg-blue-500 text-white rounded-md py-2 px-4"
            >
              新規登録
            </button>
          </div>
        </div>
        <UserList
          activeRoleTab={activeRoleTab}
          processedUserList={processedUserList}
          originalUserList={originalUserList}
        />
      </div>
      {isOpenCreateUserModal && (
        <CreateUserModal
          isOpen={isOpenCreateUserModal}
          setIsOpen={setIsOpenCreateUserModal}
          originalUserList={originalUserList}
          setOriginalUserList={setOriginalUserList}
          setActiveRoleTab={setActiveRoleTab}
        />
      )}
    </>
  );
}

export default App;