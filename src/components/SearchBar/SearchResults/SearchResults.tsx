import React from "react";

export const SearchResults = ({
  data,
  page,
  resultsPerPage,
}: {
  data: any;
  page: number;
  resultsPerPage: number;
}) => (
  <div>
    {data.found === 0 ? (
      <p>No tracks found</p>
    ) : (
      <>
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
);
