"use client";

import styles from "./search-bar.module.css";
import { useState } from "react";
import { useQuery } from "react-query";

const SearchBar = () => {
  const [searchType, setSearchType] = useState<"tracks" | "sfx">("tracks");
  const [query, setQuery] = useState("");
  const [resultsPerPage, setResultsPerPage] = useState(5);
  const [page, setPage] = useState(1);

  const { data, error, isLoading } = useQuery(
    ["searchResults", searchType, query, resultsPerPage, page],
    async () => {
      const params = new URLSearchParams({
        q: query,
        query_by: "name",
        collection: searchType,
        page: page.toString(),
        per_page: resultsPerPage.toString(),
      });

      const response = await fetch(
        `https://3feynu8vjgbqkl27p.a1.typesense.net/collections/${searchType}/documents/search?${params}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-TYPESENSE-API-KEY": process.env.API_KEY || "",
          },
        }
      );

      return response.json();
    },
    {
      enabled: !!query, // Only run the query if there's a search query
    }
  );

  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  };

  const handleChangeSearchType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value as "tracks" | "sfx");
    setPage(1);
  };

  const handleChangeResultsPerPage = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setResultsPerPage(Number(e.target.value));
    setPage(1);
  };

  const handleResultsPagination = (direction: "next" | "previous") => {
    console.log(direction);
    if (direction === "next") {
      if (data?.found && page < Math.ceil(data?.found / resultsPerPage)) {
        setPage((prev) => prev + 1);
      }
    } else {
      if (page > 1) {
        setPage((prev) => prev - 1);
      }
    }
  };

  return (
    <div>
      <select value={searchType} onChange={handleChangeSearchType}>
        <option value="tracks">Tracks</option>
        <option value="sfx">SFX</option>
      </select>
      <input
        type="text"
        value={query}
        onChange={handleChangeQuery}
        placeholder={`Search ${searchType}`}
        className={styles.searchInput}
      />
      <select value={resultsPerPage} onChange={handleChangeResultsPerPage}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>

      {isLoading && <p>Loading...</p>}

      {!query && <p>Search for a song</p>}

      {data && !isLoading && (
        <div>
          {data.found === 0 ? (
            <p>No tracks found</p>
          ) : (
            <>
              <button
                disabled={page === 1}
                onClick={() => handleResultsPagination("previous")}
              >
                Previous page
              </button>
              <button
                disabled={page === Math.ceil(data?.found / resultsPerPage)}
                onClick={() => handleResultsPagination("next")}
              >
                Next page
              </button>
              <p>Total results: {data?.found}</p>
              <p>
                Page {page} of {Math.ceil(data?.found / resultsPerPage)}
              </p>
              <ul>
                {data?.hits?.map((hit: any) => (
                  <li key={hit.document.id}>
                    <h2>{hit.document.artist}</h2>
                    <p>{hit.document.name}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      {error && <p>Error loading data</p>}
    </div>
  );
};

export default SearchBar;
