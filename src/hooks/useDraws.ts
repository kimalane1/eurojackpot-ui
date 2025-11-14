import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../http/apiFetch";

export function useDrawsQuery(from?: string, to?: string) {
  return useQuery({
    queryKey: ["draws", { from, to }],
    queryFn: () => {
      const params = new URLSearchParams();

      if (from) params.append("from", from);
      if (to) params.append("to", to);

      return apiFetch(`/draws?` + params.toString());
    },
  });
}
