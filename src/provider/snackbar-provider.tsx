import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState, type ReactNode } from "react";
import { subscribeToErrors } from "../event-bus";


interface SnackbarProviderProps {
  children: ReactNode;
}

export function SnackbarProvider({ children }: SnackbarProviderProps) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeToErrors((message) => {
      setMessage(message);
    });
    return unsubscribe;
  }, []);

  const handleClose = () => setMessage("");

  return (
    <>
      {children}
      <Snackbar open={!!message} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}