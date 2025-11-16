import { vi } from "vitest";
import { formatDate, validateDateRange } from "../date";
import { emitError } from "../../event-bus";
import { describe, expect, it, beforeEach } from "vitest";

vi.mock("../../event-bus", () => ({
  emitError: vi.fn(),
}));

describe("formatDate", () => {
  it("returns empty string for null", () => {
    expect(formatDate(null as unknown as Date)).toBe("");
  });

  it("formats a valid date", () => {
    const d = new Date("2023-05-15T00:00:00Z");

    const result = formatDate(d);

    expect(result).toEqual("15. mai 2023");
  });
});

describe("validateDateRange", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns true when one date is missing", () => {
    expect(validateDateRange(null, "2023-02-02")).toBe(true);
    expect(validateDateRange("2023-01-01", null)).toBe(true);
  });

  it("returns true for a valid range", () => {
    expect(validateDateRange("2023-01-01", "2023-02-01")).toBe(true);
    expect(emitError).not.toHaveBeenCalled();
  });

  it("returns false and emits error when 'from' > 'to'", () => {
    const result = validateDateRange("2023-05-01", "2023-04-01");

    expect(result).toBe(false);
    expect(emitError).toHaveBeenCalledWith(
      "'From' date cannot be later than 'To' date."
    );
  });
});
