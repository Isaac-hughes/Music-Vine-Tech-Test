import styles from "./PaginationControls.module.css";

export const PaginationControls = ({
  page,
  totalPages,
  onPrevious,
  onNext,
}: {
  page: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}) => (
  <div className={styles.paginationControls}>
    <button
      className={styles.paginationButton}
      disabled={page === 1 || totalPages === 0}
      onClick={onPrevious}
    >
      Previous page
    </button>
    <span className={styles.paginationInfo}>
      Page {page} of {totalPages}
    </span>
    <button
      className={styles.paginationButton}
      disabled={page === totalPages || totalPages === 0}
      onClick={onNext}
    >
      Next page
    </button>
  </div>
);
