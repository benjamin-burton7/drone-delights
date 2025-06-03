// components/SearchBar.tsx
import type { ChangeEvent } from "react";

type SearchBarProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative flex h-[77px] w-full max-w-[810px] rounded-full bg-main-orange">
      <div className="absolute top-[2px] left-[2px] right-[110px] h-[73px] rounded-full bg-white" />

      {/* Search input field */}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Sök efter produkter..."
        className="absolute top-[2px] left-[2px] right-[110px] h-[73px] rounded-full bg-transparent px-6 text-lg text-gray-700 placeholder-gray-400 outline-none md:px-8"
      />

      {/* Search label */}
      <div className="absolute top-0 right-0 flex h-[77px] w-[108px] items-center justify-center rounded-full bg-main-orange">
        <span className="text-xl text-white md:text-2xl">Sök</span>
      </div>
    </div>
  );
};

export default SearchBar;
