import { useEffect, useRef } from "react";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface SearchBarProps {
  isAuthenticated: boolean;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  isAuthenticated,
  searchQuery,
  setSearchQuery,
  handleSearch,
  showSearch,
  setShowSearch,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  return (
    <div className="hidden md:flex transition-all duration-300 items-center">
      {isAuthenticated ? (
        showSearch ? (
          <form onSubmit={handleSearch} className="flex flex-col space-y-1">
            <label
              htmlFor="search"
              className="text-sm font-medium text-gray-600 ml-1"
            >
              Search Products
            </label>
            <div className="relative group w-[12rem] md:w-[15rem] transition-all duration-300">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 absolute left-3 top-3" />
              <input
                ref={inputRef}
                id="search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="pl-10 pr-10 py-2 w-full text-gray-900 bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition-all duration-300 rounded-none"
              />
              <button
                type="button"
                onClick={() => setShowSearch(false)}
                className="absolute right-2 top-2 text-gray-500 hover:text-red-500"
                title="Close Search"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

          </form>
        ) : (
          <button
            onClick={() => setShowSearch(true)}
            className="p-2 hover:bg-gray-100 transition"
            title="Open Search"
          >
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-700" />
          </button>
        )
      ) : (
        <form onSubmit={handleSearch} className="flex flex-col space-y-1 w-64">
          <label
            htmlFor="search"
            className="text-sm font-medium text-gray-600 ml-1"
          >
            Search Products
          </label>
          <div className="relative group transition-all duration-300">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 absolute left-3 top-3" />
            <input
              id="search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="pl-10 pr-3 py-2 w-full text-gray-900 bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition-all duration-300 rounded-none"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default SearchBar;
