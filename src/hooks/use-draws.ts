import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../http/api-fetch";
import type { Draw } from "../common/Draw";

export function useDrawsQuery(from?: string, to?: string) {
 return useQuery<Draw[] | null>({
    queryKey: ["draws", { from, to }],
    queryFn: () => {
      const params = new URLSearchParams();

      if (from) params.append("from", from);
      if (to) params.append("to", to);

      return apiFetch(`/draws?` + params.toString());
    },
  });
}
