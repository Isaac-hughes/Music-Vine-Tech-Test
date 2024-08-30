import { render, screen, fireEvent } from "@testing-library/react";
import { PaginationControls } from "./PaginationControls";

describe("PaginationControls", () => {
  const mockOnPrevious = jest.fn();
  const mockOnNext = jest.fn();

  const defaultProps = {
    page: 1,
    totalPages: 5,
    onPrevious: mockOnPrevious,
    onNext: mockOnNext,
  };

  const renderPaginationControls = (props = {}) => {
    const combinedProps = { ...defaultProps, ...props };
    return render(<PaginationControls {...combinedProps} />);
  };

  beforeEach(() => {
    mockOnPrevious.mockClear();
    mockOnNext.mockClear();
  });

  it('should disable the "Previous page" button when on the first page', () => {
    renderPaginationControls({ page: 1 });

    const previousButton = screen.getByText("Previous page");
    expect(previousButton).toBeDisabled();
  });

  it('should disable the "Next page" button when on the last page', () => {
    renderPaginationControls({ page: 5, totalPages: 5 });

    const nextButton = screen.getByText("Next page");
    expect(nextButton).toBeDisabled();
  });

  it("should enable both buttons when not on the first or last page", () => {
    renderPaginationControls({ page: 3 });

    const previousButton = screen.getByText("Previous page");
    const nextButton = screen.getByText("Next page");

    expect(previousButton).not.toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });

  it('should call "onPrevious" when the "Previous page" button is clicked', () => {
    renderPaginationControls({ page: 2 });

    const previousButton = screen.getByText("Previous page");
    fireEvent.click(previousButton);

    expect(mockOnPrevious).toHaveBeenCalledTimes(1);
  });

  it('should call "onNext" when the "Next page" button is clicked', () => {
    renderPaginationControls({ page: 2 });

    const nextButton = screen.getByText("Next page");
    fireEvent.click(nextButton);

    expect(mockOnNext).toHaveBeenCalledTimes(1);
  });
});
