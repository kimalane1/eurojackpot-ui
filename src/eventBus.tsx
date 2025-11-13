type ErrorListener = (message: string) => void;

const listeners = new Set<ErrorListener>();

export function emitError(message: string) {
  for (const listener of listeners) {

    listener(message);
  }
}

export function subscribeToErrors(listener: ErrorListener) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}