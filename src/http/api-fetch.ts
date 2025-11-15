const baseUrl = "http://localhost:8080";
const apiUrl = import.meta.env.VITE_API_URL || baseUrl;

export async function apiFetch<T>(url: string): Promise<T | null> {
  const response = await fetch(`${apiUrl}${url}`);

  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get("content-type") || "";

  let body;

  if (contentType.includes("application/json")) {
    body = await response.json().catch(() => null);
  } else {
    body = await response.text().catch(() => null);
  }

  if (response.ok) {
    return body as T;
  }

  throw {
    status: response.status,
    message:
      typeof body === "string"
        ? body
        : body?.message || response.statusText,
       errors: body?.errors ?? null,
  };
}