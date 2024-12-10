import { HOBBY_LIST } from "../constant/hobbyList";

type Props = {
  setSelectedHobby: (hobby: string) => void;
};

export const HobbySelector = ({ setSelectedHobby }: Props) => {
  return (
    <div>
      <select aria-label="趣味を選択"className="border border-gray-300 rounded-md px-2 py-1" onChange={(e) => setSelectedHobby(e.target.value)}>
        <option value="">趣味</option>
        {HOBBY_LIST.map((hobby: string) => (
          <option key={hobby} value={hobby}>{hobby}</option>
        ))}
      </select>
    </div>
  )
}
