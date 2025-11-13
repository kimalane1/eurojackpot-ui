export interface NormalizedError {
  status: number | null;
  message: string;
}

interface AxiosError {
  response?: {
    status: number;
    data?: any;
  };
  message?: string;
}

export function normalizeError(error: AxiosError): NormalizedError {
  if (!error.response) {
    return { status: null, message: "Server is unreachable" };
  }

  const { status, data } = error.response;

  if (status === 400 && Array.isArray(data?.errors)) {
    return { status, message: data.errors[0].message };
  }

  if ([404, 409, 422].includes(status)) {
    return { status, message: typeof data === "string" ? data : data?.message || "Error" };
  }

  return { status, message: data?.message ?? "Unexpected error" };
}
