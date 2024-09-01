import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import Home from "../page";

test("<Home />", () => {
  render(<Home />);
  expect(screen.getByText("HOME")).toBeDefined();
});
