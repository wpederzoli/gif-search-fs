import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Client, Provider } from "urql";
import SearchAnimals from "./SearchAnimals";
import { GifProvider } from "../../contexts/Gifs/GifContext";

const mockedData = [
  { id: 1, url: "dummyURL1" },
  { id: 2, url: "dummyURL2" },
  { id: 2, url: "dummyURL3" },
];
let mockResult = { data: mockedData, fetching: false, error: "" };
const reexecuteQueryMock = jest.fn();
const mockClient = {} as Client;
mockClient.executeQuery = () =>
  jest.fn().mockReturnValue([mockResult, reexecuteQueryMock]);

const renderComponent = () => {
  render(
    <Provider value={mockClient}>
      <GifProvider>
        <SearchAnimals />
      </GifProvider>
    </Provider>
  );
};
describe("SearchAnimals", () => {
  it("renders the input component", () => {
    renderComponent();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  describe("when the data is being fetched", () => {
    it('renders the "Loading" message', () => {
      mockResult.fetching = true;
      renderComponent();
      waitFor(() => expect(screen.getByText(/Loading/i)).toBeInTheDocument());
    });
  });

  describe("when there's an error fetching the data", () => {
    it("displays an error message", () => {
      mockResult = { ...mockResult, fetching: false, error: "dummy error" };
      waitFor(() => {
        expect(screen.getByText(/error/i)).toBeInTheDocument();
      });
    });
  });

  describe("when fetching complete without errors", () => {
    it("displays the results", () => {
      mockResult = { ...mockResult, fetching: false, error: "" };
      renderComponent();
      waitFor(() => {
        expect(screen.findByAltText("1")).toHaveAttribute(
          "src",
          mockedData[0].url
        );
        expect(screen.findByAltText("2")).toHaveAttribute(
          "src",
          mockedData[1].url
        );
        expect(screen.findByAltText("3")).toHaveAttribute(
          "src",
          mockedData[2].url
        );
      });
    });
  });

  describe("when user types in the search bar", () => {
    it("re-fetches results with containing letters", () => {
      mockResult = {
        data: {} as typeof mockResult.data,
        fetching: false,
        error: "",
      };
      renderComponent();
      waitFor(() =>
        expect(screen.getByText(/loading/i)).not.toBeInTheDocument()
      );

      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "c" } });

      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
  });
});
