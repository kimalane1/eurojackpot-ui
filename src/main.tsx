import { createTheme, ThemeProvider } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { et } from "date-fns/locale";
import { SnackbarProvider } from "./provider/snackbar-provider.tsx";
import { queryClient } from "./http/query-client.ts";
const theme = createTheme();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={et}>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider>
            <App />
          </SnackbarProvider>
        </QueryClientProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </StrictMode>
);
