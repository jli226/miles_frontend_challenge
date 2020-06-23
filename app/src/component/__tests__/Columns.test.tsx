import React from "react";
import { renderWithProviders } from "../../test-utils";
import Columns from "../Columns";

test("renders the Column in a row", () => {
  const { container } = renderWithProviders(<Columns />);
  expect(container).toMatchSnapshot();
});
