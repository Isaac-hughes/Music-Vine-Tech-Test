import { useQuery } from "react-query";

export const useSearchResults = (
  searchType: "tracks" | "sfx",
  query: string,
  resultsPerPage: number,
  page: number
) => {
  const apiKey = process.env.NEXT_PUBLIC_TYPESENSE_API_KEY as string;

  return useQuery(
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
            "X-TYPESENSE-API-KEY": apiKey,
          },
        }
      );

      return response.json();
    },
    {
      enabled: !!query, // Only run the query if there's a search query
    }
  );
};
