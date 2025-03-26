import React, { useEffect, useRef, useState } from "react";
import { ISearchBoxProps } from "../types/searchPlaces";

const SearchBox: React.FC<ISearchBoxProps> = ({ placeholder = "Search places...", disabled = false, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "/") {
        event.preventDefault(); // Prevent default browser behavior
        searchInputRef.current?.focus(); // Focus on search box
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="search-container">
      <input
        ref={searchInputRef}
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch(searchTerm);
          }
        }}
        placeholder={placeholder}
        disabled={disabled}
        className={`search-box ${disabled ? "disabled" : ""}`}
      />
      <span className="shortcut">Ctrl + /</span>
    </div>
  );
};

export default SearchBox;