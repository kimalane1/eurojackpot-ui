import { useQuery } from "@tanstack/react-query";
import { getDraws } from "../api/query";

export function useDrawsQuery() {
  return useQuery({
    queryKey: ["draws"],
    queryFn: getDraws,
  });
}