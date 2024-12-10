import { useEffect } from "react";
import { UserType } from "../types/userType";
import { RoleType } from "../types/roleType";
import { useForm } from "react-hook-form";
import { CreateUserType } from "../types/createUserType";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  originalUserList: UserType[];
  setOriginalUserList: (originalUserList: UserType[]) => void;
  setActiveRoleTab: (activeRoleTab: RoleType) => void;
};

export const CreateUserModal = ({ isOpen, setIsOpen, originalUserList, setOriginalUserList, setActiveRoleTab }: Props) => {

  const { register, handleSubmit, formState: { errors }, watch } = useForm<CreateUserType>();

  const role = watch("role");

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const onSubmitCreateUser = (data: CreateUserType): void => {
    const newUser = {
      ...data,
      id: originalUserList.length + 1,
      hobbies: data.hobbies?.split(",") || [],
      studyLangs: data.studyLangs?.split(",") || [],
      useLangs: data.useLangs?.split(",") || [],
    };
    setOriginalUserList([...originalUserList, newUser]);
    setIsOpen(false);
    setActiveRoleTab("all");
    console.log(newUser);
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">ユーザー作成</h2>
          <button onClick={() => setIsOpen(false)} className="text-2xl font-bold">×</button>
        </div>
        <form onSubmit={handleSubmit(onSubmitCreateUser)} className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="w-1/2">
              <label htmlFor="name">名前</label>
              <input
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="text"
                id="name"
                {...register("name", { required: "名前は必須です" })}
              />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>
            <div className="w-1/2">
              <label htmlFor="role">ロール</label>
              <select
                id="role"
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                {...register("role", { required: "ロールは必須です" })}
              >
                <option value="">ロール</option>
                <option value="student">学生</option>
                <option value="mentor">メンター</option>
              </select>
              {errors.role && <p className="text-red-500">{errors.role.message}</p>}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label htmlFor="email">メールアドレス</label>
              <input
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="text"
                id="email"
                {...register("email", { required: "メールアドレスは必須です" })}
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div className="w-1/2">
              <label htmlFor="age">年齢</label>
              <select
                id="age"
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                {...register("age", { required: "年齢は必須です" })}
              >
                <option value="">選択してください</option>
                {Array.from({ length: 100 }, (_, i) => i + 1).map((age) => (
                  <option key={age} value={age}>{age}</option>
                ))}
              </select>
              {errors.age && <p className="text-red-500">{errors.age.message}</p>}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label htmlFor="postCode">郵便番号(ハイフンあり)</label>
              <input
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
                id="postCode"
                {...register("postCode", { required: "郵便番号は必須です" })}
              />
              {errors.postCode && <p className="text-red-500">{errors.postCode.message}</p>}
            </div>
            <div className="w-1/2">
              <label htmlFor="phone">電話番号(ハイフンなし)</label>
              <input
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="text"
                id="phone"
                {...register("phone", { required: "電話番号は必須です" })}
              />
              {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <label htmlFor="hobby" className="">
              趣味<span className="ml-2 text-xs text-gray-500">カンマ(,)で区切ってください</span>
            </label>
            <input
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
              id="hobby"
              {...register("hobbies", { required: "趣味は必須です" })}
            />
            {errors.hobbies && <p className="text-red-500">{errors.hobbies.message}</p>}
          </div>
          <div className="flex gap-4 items-center">
            <label htmlFor="url">URL</label>
            <input
              className="w-1/2 flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
              id="url"
              {...register("url", { required: "URLは必須です" })}
            />
            {errors.url && <p className="text-red-500">{errors.url.message}</p>}
          </div>
          {role === "student" && (
            <>
              <div className="flex gap-4">
                <div className="flex gap-4 items-center w-1/2">
                  <label htmlFor="studyMinutes">学習時間</label>
              <input
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="number"
                id="studyMinutes"
                {...register("studyMinutes", { 
                  required: role === "student" ? "学習時間は必須です" : false 
                })}
                />
                {errors.studyMinutes && <p className="text-red-500">{errors.studyMinutes.message}</p>}
              </div>
              <div className="flex gap-4 items-center w-1/2">
              <label htmlFor="taskCode">課題番号</label>
              <input
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  type="number"
                  id="taskCode"
                  {...register("taskCode", { 
                    required: role === "student" ? "課題番号は必須です" : false 
                  })}
                />
                {errors.taskCode && <p className="text-red-500">{errors.taskCode.message}</p>}
              </div>
            </div>
            <div className="flex gap-4 items-center">
                <label htmlFor="studyLangs">学習言語<span className="ml-2 text-xs text-gray-500">カンマ(,)で区切ってください</span></label>
                <input
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  type="text"
                  id="studyLangs"
                  {...register("studyLangs", { 
                    required: role === "student" ? "学習言語は必須です" : false 
                  })}
                />
                {errors.studyLangs && <p className="text-red-500">{errors.studyLangs.message}</p>}
              </div>
              <div className="flex gap-4 items-center">
                <label htmlFor="score">ハピネススコア</label>
                <input
                  className="w-full flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  type="number"
                  id="score"
                  {...register("score", { 
                    required: role === "student" ? "ハピネススコアは必須です" : false 
                  })}
                />
                {errors.score && <p className="text-red-500">{errors.score.message}</p>}
              </div>
              
            </>)}
          {role === "mentor" && (
            <>
             
                <div className="flex gap-4 items-center">
                <label htmlFor="experienceDays">経験日数</label>
                <input
                  className="w-24 flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  type="number"
                  id="experienceDays"
                  {...register("experienceDays", { required: role === "mentor" ? "経験日数は必須です" : false })}
                />
                {errors.experienceDays && <p className="text-red-500">{errors.experienceDays.message}</p>}
              </div>
              <div className="flex gap-4 items-center">
                <label htmlFor="useLangs">使用言語<span className="ml-2 text-xs text-gray-500">カンマ(,)で区切ってください</span></label>
                <input
                  className="w-full flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  type="text"
                  id="useLangs"
                  {...register("useLangs", { required: role === "mentor" ? "使用言語は必須です" : false })}
                />
                {errors.useLangs && <p className="text-red-500">{errors.useLangs.message}</p>}
                </div>
              
              <div className="flex gap-4">
                <div className="flex gap-4 items-center w-1/2">
                  <label htmlFor="availableStartCode">開始コード</label>
                  <input
                  className="w-full flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  type="number"
                  id="availableStartCode"
                  {...register("availableStartCode", { required: role === "mentor" ? "開始コードは必須です" : false })}
                />
                {errors.availableStartCode && <p className="text-red-500">{errors.availableStartCode.message}</p>}
              </div>
              <div className="flex gap-4 items-center w-1/2">
                <label htmlFor="availableEndCode">終了コード</label>
                <input
                  className="w-full flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  type="number"
                  id="availableEndCode"
                  {...register("availableEndCode", { required: role === "mentor" ? "終了コードは必須です" : false })}
                />
                {errors.availableEndCode && <p className="text-red-500">{errors.availableEndCode.message}</p>}
              </div>
            </div>
            </>
          )}
            <div className="flex justify-end">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">作成</button>
              </div>
        </form>
      </div>
    </div>
  );
};
