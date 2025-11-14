import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../http/apiFetch";

export function useDrawsQuery() {
  return useQuery({
    queryKey: ["draws"],
      queryFn: () => apiFetch(`/draws`),
  });
}