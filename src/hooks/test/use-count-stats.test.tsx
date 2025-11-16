import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi, expect, describe, it, beforeEach } from "vitest";
import { apiFetch } from "../../http/api-fetch";
import { useCountStats } from "../use-count-stats";


vi.mock("../../http/api-fetch", () => ({
  apiFetch: vi.fn(),
}));

function wrapper({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
beforeEach(() => {
  vi.clearAllMocks();
});

describe("useCountStats", () => {
  it("does NOT auto-run because enabled = false", async () => {
    const { result } = renderHook(
      () => useCountStats(10, "2025-01-01", "2025-01-31"),
      { wrapper }
    );

    expect(apiFetch).not.toHaveBeenCalled();

    (apiFetch as any).mockResolvedValue({ count: 5 });
    result.current.refetch();

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(apiFetch).toHaveBeenCalledWith(
      "/draws/count?number=10&from=2025-01-01&to=2025-01-31"
    );

    expect(result.current.data).toEqual({ count: 5 });
  });

  it("handles missing optional params", async () => {
    (apiFetch as any).mockResolvedValue({ count: 0 });

    const { result } = renderHook(() => useCountStats(undefined, undefined, undefined), {
      wrapper,
    });

    expect(apiFetch).not.toHaveBeenCalled();

    result.current.refetch();

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(apiFetch).toHaveBeenCalledWith("/draws/count?number=undefined");
  });
});
