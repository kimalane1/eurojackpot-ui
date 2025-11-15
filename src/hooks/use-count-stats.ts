import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../http/api-fetch";

type CountResponse = {
  count: number;
};
export function useCountStats(number?: number, from?: string, to?: string) {
  return useQuery({
    queryKey: ["stats", { number, from, to }],
    enabled: false,
    queryFn: () => {
      const params = new URLSearchParams();
      params.append("number", String(number));
      if (from) params.append("from", from);
      if (to) params.append("to", to);
      return apiFetch<CountResponse>(`/draws/count?${params}`);
    },
  });
}
