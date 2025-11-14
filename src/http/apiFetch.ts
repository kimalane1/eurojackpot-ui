const baseUrl = "http://localhost:8080";
const apiUrl = import.meta.env.VITE_API_URL || baseUrl;

export async function apiFetch<T>(url: string): Promise<T> {
  const response = await fetch(`${apiUrl}${url}`);
  let body = null;
  try {
    body = await response.clone().json();
  } catch {
    try {
      body = await response.clone().text();
    } catch {}
  }

  throw {
    status: response.status,
    message:
      typeof body === "string" ? body : body?.message ?? response.statusText,
  };
}
