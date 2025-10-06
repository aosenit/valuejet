import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "sonner/dist/styles.css";
import App from "./App.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const theme = createTheme({
  palette: {
    primary: {
      main: "#AD3291",
      light: "#fcf7fb",
    },
  },
  typography: {
    fontFamily: '"IBM Plex Sans Variable", sans-serif',
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Toaster richColors position="top-right" />
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
