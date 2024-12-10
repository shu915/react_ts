import { LANGUAGE_LIST } from "../constant/languageList";

type Props = {
  setSelectedLanguage: (language: string) => void;
};

export const LanguageSelector = ({ setSelectedLanguage }: Props) => {
  return (
    <div>
      <select className="border border-gray-300 rounded-md px-2 py-1" onChange={(e) => setSelectedLanguage(e.target.value)}>
        <option value="">言語</option>
        {LANGUAGE_LIST.map((language: string) => (
          <option key={language} value={language}>{language}</option>
        ))}
      </select>
    </div>
  )
}