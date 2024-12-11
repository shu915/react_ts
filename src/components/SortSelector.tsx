import { RoleType } from "../types/role";
import { SortType } from "../types/sort";
import { OrderType } from "../types/order";

type Props = {
  activeRoleTab: RoleType;
  sortCriteria: SortType;
  sortOrder: OrderType;
  setSortCriteria: (sortCriteria: SortType) => void;
  setSortOrder: (sortOrder: OrderType) => void;
};

export const SortSelector = ({
  activeRoleTab,
  sortCriteria,
  sortOrder,
  setSortCriteria,
  setSortOrder,
}: Props) => {
  const onChangeSortCriteria = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCriteria(e.target.value as SortType);
  };

  const onChangeSortOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as OrderType);
  };

  return (
    activeRoleTab !== "all" && (
      <div>
        <div className="flex gap-2 items-center">
          <label htmlFor="sort">ソート</label>
          <select
            className="border border-gray-300 rounded-md px-2 py-1"
            id="sort"
            value={sortCriteria}
            onChange={onChangeSortCriteria}
          >
            <option value="id">--</option>
            {activeRoleTab === "student" && (
              <>
                <option value="score">スコア</option>
                <option value="studyMinutes">学習時間</option>
              </>
            )}
            {activeRoleTab === "mentor" && (
              <option value="experienceDays">経験日数</option>
            )}
          </select>
          <select
            className="border border-gray-300 rounded-md px-2 py-1"
            id="order"
            value={sortOrder}
            onChange={onChangeSortOrder}
          >
            <option value="asc">昇順</option>
            <option value="desc">降順</option>
          </select>
        </div>
      </div>
    )
  );
};
