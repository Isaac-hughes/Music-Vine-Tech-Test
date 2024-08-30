import React from "react";
import styles from "./SearchResults.module.css";
import { useAudioManager } from "../../../hooks/useAudioManager/useAudioManager";

export const SearchResults = ({
  data,
  page,
  resultsPerPage,
}: {
  data: any;
  page: number;
  resultsPerPage: number;
}) => {
  const { currentAudio, isPlaying, playAudio, stopAudio } = useAudioManager();

  const handleAudioToggle = (uri: string, trackId: string) => {
    if (isPlaying === trackId) {
      // If the same track is playing, stop it
      stopAudio();
    } else {
      // Otherwise, play the new track
      playAudio(uri, trackId);
    }
  };

  return (
    <div className={styles.resultsWrapper}>
      {data.found === 0 ? (
        <p>No tracks or sound effects found</p>
      ) : (
        <div className={styles.results}>
          <div className={styles.resultsMetaData}>
            <p>Total results: {data?.found}</p>
            <p>
              Page {page} of {Math.ceil(data?.found / resultsPerPage)}
            </p>
          </div>
          <ul className={styles.resultsList}>
            {data?.hits?.map((hit: any) => {
              const previewUri = hit.document.version_preview_uri;

              return (
                <li className={styles.result} key={hit.document.id}>
                  <div className={styles.imageWrapper}>
                    <img
                      src={hit.document.image}
                      className={styles.resultImage}
                    />
                    <div className={styles.playButtonWrapper}>
                      <button
                        className={styles.playButton}
                        onClick={() =>
                          handleAudioToggle(previewUri, hit.document.id)
                        }
                      >
                        {isPlaying === hit.document.id ? "⏸" : "▶"}
                      </button>
                    </div>
                  </div>
                  <div className={styles.resultData}>
                    <h2>{hit.document.artist}</h2>
                    <p className={styles.trackName}>{hit.document.name}</p>
                    {hit.document.tags && (
                      <div className={styles.tags}>
                        {hit.document.tags
                          .slice(0, 4)
                          .map((tag: any, index: number) => (
                            <span key={index} className={styles.tag}>
                              {tag}
                            </span>
                          ))}
                      </div>
                    )}
                    <div className={styles.trackDetails}>
                      <p>
                        <strong>Styles:</strong>{" "}
                        {hit.document.styles.slice(0, 3).join(", ")}
                      </p>
                      <p>
                        <strong>Keywords:</strong>{" "}
                        {hit.document.keywords.slice(0, 3).join(", ")}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
