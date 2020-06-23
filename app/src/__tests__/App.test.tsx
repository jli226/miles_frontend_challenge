import React from "react";
import App from "../App";
import { renderWithProviders } from "../test-utils";

test("renders the rewards and categories", () => {
  const { container, getByText } = renderWithProviders(<App />);
  expect(getByText(/Rewards/i)).toBeInTheDocument();
  expect(getByText(/Categories/i)).toBeInTheDocument();
  expect(container).toMatchSnapshot();
});
