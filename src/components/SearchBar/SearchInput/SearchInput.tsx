import { useState, useEffect } from "react";
import styles from "./SearchInput.module.css";
import Image from "next/image";

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
}) => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const placeholders = [
    `Find ${searchType} for your movie`,
    `Find ${searchType} for your podcast`,
    `Find ${searchType} for your video`,
    `Find ${searchType} for your presentation`,
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [searchType, placeholders.length]);

  return (
    <div className={styles.searchInputContainer}>
      <div className={styles.logoWrapper}>
        <Image
          src="/assets/uppbeatLogo.png"
          alt="Uppbeat Logo"
          width={50}
          height={50}
          className={styles.logo}
        />
      </div>
      <div className={styles.selectWrapper}>
        <select value={searchType} onChange={onSearchTypeChange}>
          <option value="tracks">Tracks</option>
          <option value="sfx">SFX</option>
        </select>
      </div>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={query}
          onChange={onQueryChange}
          placeholder={placeholders[placeholderIndex]}
          className={styles.input}
        />
      </div>
      <div className={styles.selectWrapper}>
        <label>Results per page:</label>
        <select value={resultsPerPage} onChange={onResultsPerPageChange}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
    </div>
  );
};
