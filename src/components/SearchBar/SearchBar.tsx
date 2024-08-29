"use client";

import styles from "./SearchBar.module.css";
import { useState } from "react";
import { SearchInput } from "./SearchInput/SearchInput";
import { SearchResults } from "./SearchResults/SearchResults";
import { PaginationControls } from "./PaginationControls/PaginationControls";
import { useSearchResults } from "../../hooks/useSearchResults/useSearchResults";

export const SearchBar = () => {
  const [searchType, setSearchType] = useState<"tracks" | "sfx">("tracks");
  const [query, setQuery] = useState("");
  const [resultsPerPage, setResultsPerPage] = useState(5);
  const [page, setPage] = useState(1);

  const { data, error, isLoading } = useSearchResults(
    searchType,
    query,
    resultsPerPage,
    page
  );

  const handleResultsPagination = (direction: "next" | "previous") => {
    if (
      direction === "next" &&
      data?.found &&
      page < Math.ceil(data.found / resultsPerPage)
    ) {
      setPage((prev) => prev + 1);
    } else if (direction === "previous" && page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const totalPages = data ? Math.ceil(data.found / resultsPerPage) : 1;

  return (
    <div className={styles.searchBarContainer}>
      <SearchInput
        searchType={searchType}
        query={query}
        onSearchTypeChange={(e) => {
          setSearchType(e.target.value as "tracks" | "sfx");
          setPage(1);
        }}
        onQueryChange={(e) => {
          setQuery(e.target.value);
          setPage(1);
        }}
        resultsPerPage={resultsPerPage}
        onResultsPerPageChange={(e) => {
          setResultsPerPage(Number(e.target.value));
          setPage(1);
        }}
      />

      {isLoading && <p>Loading...</p>}
      {!query && <p>Search for a song</p>}
      {error && <p>{data?.message}</p>}

      {data && !isLoading && (
        <>
          <SearchResults
            data={data}
            page={page}
            resultsPerPage={resultsPerPage}
          />
          <PaginationControls
            page={page}
            totalPages={totalPages}
            onPrevious={() => handleResultsPagination("previous")}
            onNext={() => handleResultsPagination("next")}
          />
        </>
      )}
    </div>
  );
};

export default SearchBar;
