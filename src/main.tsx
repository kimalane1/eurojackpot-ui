import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";

import { SnackbarProvider } from "./components/SnackbarProvider.tsx";
import { queryClient } from "./http/queryClient.ts";

const theme = createTheme();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  </StrictMode>
);
