import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useCountStats } from "../../hooks/use-count-stats";
import { CountStats } from "../count-stats";
import { validateDateRange } from "../../utils/date";

vi.mock("../numeric-text-field", () => ({
  NumericTextField: ({ label, value, onChange }: any) => (
    <input
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

vi.mock("../custom-date-picker", () => ({
  CustomDatePicker: ({ label, value, onChange }: any) => (
    <input
      aria-label={label}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

vi.mock("../../hooks/use-count-stats", () => ({
  useCountStats: vi.fn(),
}));

vi.mock("../../utils/date", () => ({
  validateDateRange: vi.fn(),
}));

describe("CountStats", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useCountStats as vi.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      refetch: vi.fn(),
    });
  });

  it("renders all fields", () => {
    render(<CountStats />);

    expect(screen.getByLabelText("Number")).toBeInTheDocument();
    expect(screen.getByLabelText("From")).toBeInTheDocument();
    expect(screen.getByLabelText("To")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
  });

  it("disables SEARCH if number is empty", () => {
    render(<CountStats />);

    const search = screen.getByRole("button", { name: /search/i });
    expect(search).toBeDisabled();
  });

  it("disables SEARCH if dates are empty", async () => {
    render(<CountStats />);

    const user = userEvent.setup();
    const numberInput = screen.getByLabelText("Number");

    await user.clear(numberInput);
    await user.type(numberInput, "5");

    const search = screen.getByRole("button", { name: /search/i });
    expect(search).toBeDisabled();
  });

  it("enables SEARCH when number and dates are valid", async () => {
    render(<CountStats />);

    const user = userEvent.setup();

    await user.type(screen.getByLabelText("Number"), "5");
    await user.type(screen.getByLabelText("From"), "2024-01-01");
    await user.type(screen.getByLabelText("To"), "2024-01-02");

    const search = screen.getByRole("button", { name: /search/i });
    expect(search).not.toBeDisabled();
  });

  it("calls refetch and validateDateRange on submit", async () => {
    const refetchMock = vi.fn();

    (useCountStats as vi.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      refetch: refetchMock,
    });

    render(<CountStats />);

    const user = userEvent.setup();

    await user.type(screen.getByLabelText("Number"), "3");
    await user.type(screen.getByLabelText("From"), "2024-01-01");
    await user.type(screen.getByLabelText("To"), "2024-01-02");

    await user.click(screen.getByRole("button", { name: /search/i }));

    expect(validateDateRange).toHaveBeenCalledWith("2024-01-01", "2024-01-02");
    expect(refetchMock).toHaveBeenCalled();
  });

  it("resets fields on RESET", async () => {
    render(<CountStats />);

    const user = userEvent.setup();

    await user.type(screen.getByLabelText("Number"), "9");
    await user.type(screen.getByLabelText("From"), "2024");
    await user.type(screen.getByLabelText("To"), "2025");

    await user.click(screen.getByRole("button", { name: /reset/i }));

    expect(screen.getByLabelText("Number")).toHaveValue("");
    expect(screen.getByLabelText("From")).toHaveValue("");
    expect(screen.getByLabelText("To")).toHaveValue("");
  });

  it("renders result card when data exists", () => {
    (useCountStats as vi.Mock).mockReturnValue({
      data: { count: 42 },
      isLoading: false,
      refetch: vi.fn(),
    });

    render(<CountStats />);

    expect(screen.getByText(/Occurrences:/)).toBeInTheDocument();
    expect(screen.getByText(/42/)).toBeInTheDocument();
  });
});
