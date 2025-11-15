import { emitError } from "../event-bus";

export function formatDate(iso: Date): string {
  if (!iso) return "";

  const date = new Date(iso);

  return date.toLocaleString("et-EE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function validateDateRange(
  from: string | null,
  to: string | null
): boolean {
  if (!from || !to) return true;
  else if (from > to) {
    emitError("'From' date cannot be later than 'To' date.");
    return false;
  }

  return true;
}
