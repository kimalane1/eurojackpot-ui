import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchFilters } from "../search-filter";

vi.mock("../custom-date-picker", () => ({
  CustomDatePicker: ({ label, onChange }: any) => (
    <input aria-label={label} onChange={(e) => onChange(e.target.value)} />
  ),
}));

describe("SearchFilters", () => {
  it("renders fields and triggers callbacks", async () => {
    const user = userEvent.setup();

    const setFrom = vi.fn();
    const setTo = vi.fn();
    const onSubmit = vi.fn();
    const onReset = vi.fn();

    render(
      <SearchFilters
        from={null}
        to={null}
        setFrom={setFrom}
        setTo={setTo}
        onSubmit={onSubmit}
        onReset={onReset}
        loading={false}
      />
    );

    const fromInput = screen.getByLabelText("From");
    const toInput = screen.getByLabelText("To");

    expect(fromInput).toBeInTheDocument();
    expect(toInput).toBeInTheDocument();

    const searchBtn = screen.getByRole("button", { name: /search/i });
    const resetBtn = screen.getByRole("button", { name: /reset/i });

    expect(searchBtn).toBeInTheDocument();
    expect(resetBtn).toBeInTheDocument();

    await user.type(fromInput, "2025-01-01");
    expect(setFrom).toHaveBeenCalled();

    await user.type(toInput, "2025-01-02");
    expect(setTo).toHaveBeenCalled();

    await user.click(searchBtn);
    expect(onSubmit).toHaveBeenCalledTimes(1);

    await user.click(resetBtn);
    expect(onReset).toHaveBeenCalledTimes(1);
  });
});
