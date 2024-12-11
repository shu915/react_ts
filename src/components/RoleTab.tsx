import { Role } from "../types/role";

type Props = {
  activeRoleTab: Role;
  setActiveRoleTab: (activeRoleTab: Role) => void;
};

export const RoleTab = ({ activeRoleTab, setActiveRoleTab }: Props) => {
  return (
    <div className="flex gap-4 my-6">
      <button
        className={`px-4 py-2 rounded ${
          activeRoleTab === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => setActiveRoleTab("all")}
      >
        全て
      </button>
      <button
        className={`px-4 py-2 rounded ${
          activeRoleTab === "student" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => setActiveRoleTab("student")}
      >
        学生
      </button>
      <button
        className={`px-4 py-2 rounded ${
          activeRoleTab === "mentor" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => setActiveRoleTab("mentor")}
      >
        メンター
      </button>
    </div>
  );
};
