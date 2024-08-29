import React from "react";

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
  <div>
    <button disabled={page === 1} onClick={onPrevious}>
      Previous page
    </button>
    <button disabled={page === totalPages} onClick={onNext}>
      Next page
    </button>
  </div>
);
