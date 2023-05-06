import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { Client, Provider } from "urql";
import SearchAnimals from "./SearchAnimals";

let mockResult = { data: {}, fetching: false, error: "" };
const mockClient = {} as Client;
mockClient.executeQuery = () =>
  jest.fn().mockReturnValue([mockResult, jest.fn()]);

const renderComponent = () => {
  render(
    <Provider value={mockClient}>
      <SearchAnimals />
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
});
