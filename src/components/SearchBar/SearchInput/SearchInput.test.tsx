import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { SearchInput } from "./SearchInput";

describe("SearchInput", () => {
  const mockOnSearchTypeChange = jest.fn();
  const mockOnQueryChange = jest.fn();
  const mockOnResultsPerPageChange = jest.fn();

  const defaultProps = {
    searchType: "tracks" as "tracks" | "sfx",
    query: "",
    onSearchTypeChange: mockOnSearchTypeChange,
    onQueryChange: mockOnQueryChange,
    resultsPerPage: 5,
    onResultsPerPageChange: mockOnResultsPerPageChange,
  };

  const renderSearchInput = (props = {}) => {
    const combinedProps = { ...defaultProps, ...props };
    return render(<SearchInput {...combinedProps} />);
  };

  beforeEach(() => {
    mockOnSearchTypeChange.mockClear();
    mockOnQueryChange.mockClear();
    mockOnResultsPerPageChange.mockClear();
  });

  it("should render all input elements correctly", () => {
    renderSearchInput();

    expect(screen.getByDisplayValue(/Tracks/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Find tracks for your movie/i)
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(String(defaultProps.resultsPerPage))
    ).toBeInTheDocument();
  });

  it('should call "onSearchTypeChange" when search type is changed', () => {
    renderSearchInput();

    const selectElement = screen.getByDisplayValue(/Tracks/i);
    fireEvent.change(selectElement, { target: { value: "sfx" } });

    expect(mockOnSearchTypeChange).toHaveBeenCalledTimes(1);
    expect(mockOnSearchTypeChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it('should call "onQueryChange" when query input is changed', () => {
    renderSearchInput();

    const inputElement = screen.getByPlaceholderText(
      /Find tracks for your movie/i
    );
    fireEvent.change(inputElement, { target: { value: "New query" } });

    expect(mockOnQueryChange).toHaveBeenCalledTimes(1);
    expect(mockOnQueryChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it('should call "onResultsPerPageChange" when results per page is changed', () => {
    renderSearchInput();

    const selectElement = screen.getByDisplayValue("5");
    fireEvent.change(selectElement, { target: { value: "10" } });

    expect(mockOnResultsPerPageChange).toHaveBeenCalledTimes(1);
    expect(mockOnResultsPerPageChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it("should cycle through placeholders every second", () => {
    jest.useFakeTimers();

    renderSearchInput();

    expect(
      screen.getByPlaceholderText(/Find tracks for your movie/i)
    ).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(
      screen.getByPlaceholderText(/Find tracks for your podcast/i)
    ).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(
      screen.getByPlaceholderText(/Find tracks for your video/i)
    ).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(
      screen.getByPlaceholderText(/Find tracks for your presentation/i)
    ).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(
      screen.getByPlaceholderText(/Find tracks for your movie/i)
    ).toBeInTheDocument();

    jest.useRealTimers();
  });
});
