import { render, screen, fireEvent } from "@testing-library/react";
import { SearchResults } from "./SearchResults";
import { useAudioManager } from "../../../hooks/useAudioManager/useAudioManager";

jest.mock("../../../hooks/useAudioManager/useAudioManager");

describe("SearchResults", () => {
  const mockPlayAudio = jest.fn();
  const mockStopAudio = jest.fn();

  const mockUseAudioManager = useAudioManager as jest.Mock;

  beforeEach(() => {
    mockUseAudioManager.mockReturnValue({
      currentAudio: null,
      isPlaying: null,
      playAudio: mockPlayAudio,
      stopAudio: mockStopAudio,
    });
    mockPlayAudio.mockClear();
    mockStopAudio.mockClear();
  });

  const sampleData = {
    found: 2,
    hits: [
      {
        document: {
          id: "1",
          artist: "Artist 1",
          name: "Track 1",
          image: "image1.jpg",
          version_preview_uri: "preview1.mp3",
          tags: ["tag1", "tag2"],
          styles: ["style1", "style2"],
          keywords: ["keyword1", "keyword2"],
        },
      },
      {
        document: {
          id: "2",
          artist: "Artist 2",
          name: "Track 2",
          image: "image2.jpg",
          version_preview_uri: "preview2.mp3",
          tags: ["tag3", "tag4"],
          styles: ["style3", "style4"],
          keywords: ["keyword3", "keyword4"],
        },
      },
    ],
  };
  const renderSearchResults = () =>
    render(<SearchResults data={sampleData} page={1} resultsPerPage={5} />);

  it("should render the search results correctly", () => {
    renderSearchResults();
    expect(screen.getByText("Total results: 2")).toBeInTheDocument();
    expect(screen.getByText("Page 1 of 1")).toBeInTheDocument();
    expect(screen.getByText("Artist 1")).toBeInTheDocument();
    expect(screen.getByText("Track 1")).toBeInTheDocument();
    expect(screen.getByText("Artist 2")).toBeInTheDocument();
    expect(screen.getByText("Track 2")).toBeInTheDocument();
  });

  it("should display 'No tracks or sound effects found' when no results are found", () => {
    render(
      <SearchResults
        data={{ found: 0, hits: [] }}
        page={1}
        resultsPerPage={5}
      />
    );

    expect(
      screen.getByText("No tracks or sound effects found")
    ).toBeInTheDocument();
  });

  it("should play audio when play button is clicked", () => {
    render(<SearchResults data={sampleData} page={1} resultsPerPage={5} />);

    const playButton1 = screen.getAllByText("▶")[0];
    fireEvent.click(playButton1);

    expect(mockPlayAudio).toHaveBeenCalledTimes(1);
    expect(mockPlayAudio).toHaveBeenCalledWith("preview1.mp3", "1");
  });

  it("should stop audio when the same play button is clicked again", () => {
    mockUseAudioManager.mockReturnValue({
      currentAudio: null,
      isPlaying: "1",
      playAudio: mockPlayAudio,
      stopAudio: mockStopAudio,
    });

    renderSearchResults();
    const pauseButton1 = screen.getAllByText("⏸")[0];
    fireEvent.click(pauseButton1);

    expect(mockStopAudio).toHaveBeenCalledTimes(1);
  });
});
