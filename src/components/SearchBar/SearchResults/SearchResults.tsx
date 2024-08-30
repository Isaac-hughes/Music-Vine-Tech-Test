import styles from "./SearchResults.module.css";

export const SearchResults = ({
  data,
  page,
  resultsPerPage,
}: {
  data: any;
  page: number;
  resultsPerPage: number;
}) => (
  <div className={styles.resultsWrapper}>
    {data.found === 0 ? (
      <p>No tracks found</p>
    ) : (
      <div className={styles.results}>
        <div className={styles.resultsMetaData}>
          <p>Total results: {data?.found}</p>
          <p>
            Page {page} of {Math.ceil(data?.found / resultsPerPage)}
          </p>
        </div>
        <ul className={styles.resultsList}>
          {data?.hits?.map((hit: any) => (
            <li className={styles.result} key={hit.document.id}>
              <img src={hit.document.image} />
              <div className={styles.resultData}>
                <h2>{hit.document.artist}</h2>
                <p>{hit.document.name}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);
