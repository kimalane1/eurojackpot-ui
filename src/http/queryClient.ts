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
    handleError(error ?? "Unexpected error");
  }
});

function handleError(error: any) {
  console.error("Query Error:", error);
  switch (error?.status) {
    case 422:
      emitError(error?.message || "Error 422");
      break;
    case 500:
      emitError(error?.message || "Error 500");
      break;
    default:
      emitError("error");
  }
}
