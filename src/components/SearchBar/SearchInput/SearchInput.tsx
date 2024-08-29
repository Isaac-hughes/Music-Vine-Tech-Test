import React from "react";
import styles from "../SearchBar.module.css";

export const SearchInput = ({
  searchType,
  query,
  onSearchTypeChange,
  onQueryChange,
  resultsPerPage,
  onResultsPerPageChange,
}: {
  searchType: "tracks" | "sfx";
  query: string;
  onSearchTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resultsPerPage: number;
  onResultsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => (
  <div className={styles.searchInputContainer}>
    <select value={searchType} onChange={onSearchTypeChange}>
      <option value="tracks">Tracks</option>
      <option value="sfx">SFX</option>
    </select>
    <input
      type="text"
      value={query}
      onChange={onQueryChange}
      placeholder={`Search ${searchType}`}
      className={styles.searchInput}
    />
    <select value={resultsPerPage} onChange={onResultsPerPageChange}>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="15">15</option>
    </select>
  </div>
);
