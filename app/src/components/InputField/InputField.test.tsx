import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import InputField from "./InputField";

describe("InputField", () => {
  const dummyLabelText = "Dummy label";
  const mockedOnChange = jest.fn();

  beforeEach(() => {
    render(
      <InputField
        placeholder={dummyLabelText}
        onChange={mockedOnChange}
        value=""
      />
    );
  });

  it("renders input with placeholder", () => {
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("placeholder", dummyLabelText);
  });

  it("calls onChange function when input is changed", () => {
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "test value" },
    });
    expect(mockedOnChange).toHaveBeenCalledWith("test value");
  });
});
