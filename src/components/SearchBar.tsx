import { Search } from "lucide-react";
import { ReactNode } from "react";

interface Suggestion {
  dish: string;
  restaurant: string;
}

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;

  suggestions: Suggestion[];

  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;

  highlightMatch: (text: string, search: string) => ReactNode;
}

export default function SearchBar({
  search,
  setSearch,
  suggestions,
  selectedIndex,
  setSelectedIndex,
  highlightMatch,
}: SearchBarProps) {
  return (
    <div className="relative mt-4">
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

      <input
        type="text"
        placeholder="Search restaurants, dishes & cuisines..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setSelectedIndex(-1);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();

            setSelectedIndex((prev) =>
              Math.min(prev + 1, suggestions.length - 1)
            );
          }

          if (e.key === "ArrowUp") {
            e.preventDefault();

            setSelectedIndex((prev) =>
              Math.max(prev - 1, 0)
            );
          }

          if (e.key === "Enter" && selectedIndex >= 0) {
            setSearch(suggestions[selectedIndex].dish);
            setSelectedIndex(-1);
          }
        }}
        className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-12 text-black placeholder:text-gray-400 outline-none focus:border-emerald2-500"
      />

      {search && (
        <button
          onClick={() => setSearch("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
        >
          ✕
        </button>
      )}

      {search && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          {suggestions.slice(0, 5).map((item, index) => (
            <button
              key={item.dish}
              onClick={() => {
                setSearch(item.dish);
                setSelectedIndex(-1);
              }}
              className={`block w-full px-4 py-3 text-left transition ${
                index === selectedIndex
                  ? "bg-emerald-100"
                  : "hover:bg-gray-100"
              }`}
            >
              <div>
                <div className="font-medium text-black">
                  🍽 {highlightMatch(item.dish, search)}
                </div>

                <div className="text-xs text-gray-500">
                  {item.restaurant}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}