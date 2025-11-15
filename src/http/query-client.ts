import { QueryClient } from "@tanstack/react-query";
import { emitError } from "../event-bus";

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
  switch (error?.status) {
    case 422:
      emitError(error?.message || "Error 422");
      break;
    case 400: {
      if (Array.isArray(error.errors)) {
        emitError(error.errors[0].message);
      } else {
        emitError(error.message || "Error 400");
      }
      break;
    }
    case 404:
      emitError(error?.message || "Error 404");
      break;
    case 500:
      emitError(error?.message || "Error 500");
      break;
    default:
      emitError("Unexpected error");
  }
}
