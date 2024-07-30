import "@testing-library/jest-dom";
import { expect, test, describe } from "vitest";
import { render } from "@testing-library/react";
import { ItemsView } from "../ItemsView";
import { mockItems } from "./mockData";

describe("ItemsView.test.tsx", () => {
  test("renders optional columns prop", () => {
    const columns = ["col1", "col2", "col3"];
    const { getByText } = render(<ItemsView columns={columns} data={[]} />);
    expect(getByText("col1")).toBeInTheDocument();
    expect(getByText("col2")).toBeInTheDocument();
    expect(getByText("col3")).toBeInTheDocument();
  });

  test("renders data prop", () => {
    const { getByText } = render(<ItemsView data={mockItems} />);
    expect(getByText("Abashi")).toBeInTheDocument();
  });
});
