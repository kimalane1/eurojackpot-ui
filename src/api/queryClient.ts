import { QueryClient } from "@tanstack/react-query";
import { emitError } from "../eventBus";


export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, 
    },
  },
});

queryClient.getQueryCache().subscribe((event) => {
  const error = event?.query?.state?.error;
  if (error) {
    emitError(error.message ?? "Unexpected error");
  }
});

queryClient.getMutationCache().subscribe((event) => {
  const error = event?.mutation?.state?.error;
  if (error) {
    emitError(error.message ?? "Unexpected error");
  }
});
