import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { expect, vi, it, describe } from "vitest";
import { apiFetch } from "../../http/api-fetch";
import { useDrawsQuery } from "../use-draws";
import type { PropsWithChildren, ReactNode } from "react";

vi.mock("../../http/api-fetch", () => ({
  apiFetch: vi.fn(),
}));

function wrapper({ children }: PropsWithChildren<{ children: ReactNode }>) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe("useDrawsQuery", () => {
  it("calls apiFetch with correct params and returns data", async () => {
    const mockData = [{ id: 1, value: "test" }];
    (apiFetch as any).mockResolvedValue(mockData);

    const { result } = renderHook(
      () => useDrawsQuery("2025-01-01", "2025-01-31"),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(apiFetch).toHaveBeenCalledWith(
      "/draws?from=2025-01-01&to=2025-01-31"
    );

    expect(result.current.data).toEqual(mockData);
  });

  it("does not add empty params", async () => {
    (apiFetch as any).mockResolvedValue([]);

    renderHook(() => useDrawsQuery(undefined, undefined), { wrapper });

    expect(apiFetch).toHaveBeenCalledWith("/draws?");
  });
});
