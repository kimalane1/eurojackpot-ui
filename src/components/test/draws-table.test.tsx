import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useDrawRows } from "../../hooks/use-draw-rows";
import { DrawsTable } from "../draws-table";
import { getDrawColumns } from "../draw-columns";

vi.mock("@mui/x-data-grid", () => ({
  DataGrid: ({ rows }: any) => (
    <div role="grid">Mocked DataGrid with {rows.length} rows</div>
  ),
}));

vi.mock("../../hooks/use-draw-rows", () => ({
  useDrawRows: vi.fn(),
}));

vi.mock("../draw-columns", () => ({
  getDrawColumns: vi.fn(() => [{ field: "id", headerName: "ID" }]),
}));

describe("DrawsTable", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders CircularProgress when loading=true", () => {
    render(<DrawsTable data={[]} loading={true} />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(useDrawRows).not.toHaveBeenCalled();
  });

  it("renders DataGrid when loading=false", () => {
    (useDrawRows as vi.Mock).mockReturnValue([{ id: 1 }]);

    render(<DrawsTable data={[{ drawId: 1 } as any]} loading={false} />);

    expect(screen.getByRole("grid")).toBeInTheDocument();
  });

  it("passes mapped rows from useDrawRows to DataGrid", () => {
    const mockRows = [{ id: 123 }];
    (useDrawRows as vi.Mock).mockReturnValue(mockRows);

    render(<DrawsTable data={[{ drawId: 999 } as any]} loading={false} />);

    expect(screen.getByText("Mocked DataGrid with 1 rows")).toBeInTheDocument();
  });

  it("calls getDrawColumns exactly once", () => {
    (useDrawRows as vi.Mock).mockReturnValue([{ id: 1 }]);

    render(<DrawsTable data={[]} loading={false} />);

    expect(getDrawColumns).toHaveBeenCalledTimes(1);
  });

  it("renders empty DataGrid when data is empty", () => {
    (useDrawRows as vi.Mock).mockReturnValue([]);

    render(<DrawsTable data={[]} loading={false} />);

    expect(screen.getByRole("grid")).toBeInTheDocument();
    expect(screen.getByText("Mocked DataGrid with 0 rows")).toBeInTheDocument();
  });
});
