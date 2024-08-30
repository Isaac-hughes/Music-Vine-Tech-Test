import { render, screen } from "@testing-library/react";
import { SearchBar } from "./SearchBar";

jest.mock("../../hooks/useSearchResults/useSearchResults", () => ({
  useSearchResults: () => ({
    data: { found: 10, hits: [] },
    error: null,
    isLoading: false,
  }),
}));

describe("SearchBar", () => {
  it("should render search input", async () => {
    render(<SearchBar />);
    await screen.findByText(/Search for a song/i);
  });

  // it("should display loading message", () => {
  //   jest.mock("../../hooks/useSearchResults", () => ({
  //     useSearchResults: () => ({
  //       data: null,
  //       error: null,
  //       isLoading: true,
  //     }),
  //   }));

  //   render(<SearchBar />);
  //   expect(screen.getByText("Loading...")).toBeInTheDocument();
  // });

  // Add more tests as needed
});
