import { UserType } from "../types/user";
import { RoleType } from "../types/role";

type Props = {
  user: UserType;
  activeRoleTab: RoleType;
  originalUserList: UserType[];
};

export const UserCard = ({ user, activeRoleTab, originalUserList }: Props) => {
  const isMentorHidden = activeRoleTab === "mentor" ? "hidden" : "";
  const isStudentHidden = activeRoleTab === "student" ? "hidden" : "";

  return (
    <dl
      key={user.id}
      className="w-full border border-gray-300 shadow-md p-4 rounded-lg flex flex-col gap-2"
    >
      <div className="flex">
        <dt className="font-bold w-40">名前</dt>
        <dd>{user.name}</dd>
      </div>
      <div className="flex">
        <dt className="font-bold w-40">ロール:</dt>
        <dd>{user.role}</dd>
      </div>
      <div className="flex">
        <dt className="font-bold w-40">メールアドレス:</dt>
        <dd>{user.email}</dd>
      </div>
      <div className="flex">
        <dt className="font-bold w-40">年齢:</dt>
        <dd>{user.age}</dd>
      </div>
      <div className="flex">
        <dt className="font-bold w-40">郵便番号:</dt>
        <dd>{user.postCode}</dd>
      </div>
      <div className="flex">
        <dt className="font-bold w-40">電話番号:</dt>
        <dd>{user.phone}</dd>
      </div>
      <div className="flex">
        <dt className="font-bold w-40">趣味:</dt>
        <dd>
          <ul>
            {user.hobbies?.map((hobby, index) => (
              <li key={index}>{hobby}</li>
            ))}
          </ul>
        </dd>
      </div>
      <div className="flex">
        <dt className="font-bold w-40">URL:</dt>
        <dd>{user.url}</dd>
      </div>

      <div className={`flex ${isMentorHidden}`}>
        <dt className="font-bold w-40">学習時間:</dt>
        <dd>{user.studyMinutes ?? "-"}</dd>
      </div>
      <div className={`flex ${isMentorHidden}`}>
        <dt className="font-bold w-40">課題番号:</dt>
        <dd>{user.taskCode ?? "-"}</dd>
      </div>

      <div className={`flex ${isMentorHidden}`}>
        <dt className="font-bold w-40">学習言語:</dt>
        <dd>{user.studyLangs?.join(", ") ?? "-"}</dd>
      </div>
      <div className={`flex ${isMentorHidden}`}>
        <dt className="font-bold w-40">ハピネススコア:</dt>
        <dd>{user.score ?? "-"}</dd>
      </div>
      <div className={`flex ${isMentorHidden}`}>
        <dt className="font-bold w-40">対応可能メンター:</dt>
        <dd>
          {originalUserList
            .filter(
              (mentor) =>
                mentor.role === "mentor" &&
                mentor?.availableStartCode &&
                mentor?.availableEndCode &&
                user?.taskCode &&
                mentor.availableStartCode <= user.taskCode &&
                mentor.availableEndCode >= user.taskCode
            )
            .map((mentor) => mentor.name)
            .join(", ") || "-"}
        </dd>
      </div>
      <div className={`flex ${isStudentHidden}`}>
        <dt className="font-bold w-40">経験日数:</dt>
        <dd>{user.experienceDays ?? "-"}</dd>
      </div>
      <div className={`flex ${isStudentHidden}`}>
        <dt className="font-bold w-40">使用言語:</dt>
        <dd>{user.useLangs?.join(", ") ?? "-"}</dd>
      </div>
      <div className={`flex ${isStudentHidden}`}>
        <dt className="font-bold w-40">担当課題番号開始:</dt>
        <dd>{user.availableStartCode ?? "-"}</dd>
      </div>
      <div className={`flex ${isStudentHidden}`}>
        <dt className="font-bold w-40">担当課題番号末尾:</dt>
        <dd>{user.availableEndCode ?? "-"}</dd>
      </div>
      <div className={`flex ${isStudentHidden}`}>
      
        <dt className="font-bold w-40">対応可能生徒</dt>
        <dd>
          {originalUserList
            .filter(
              (student) =>
                student.role === "student" &&
                student.taskCode &&
                user.availableStartCode &&
                user.availableEndCode &&
                student.taskCode >= user.availableStartCode &&
                student.taskCode <= user.availableEndCode
            )
            .map((student) => student.name)
            .join(", ") || "-"}
        </dd>
      </div>
    </dl>
  );
};
