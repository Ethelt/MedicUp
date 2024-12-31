import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Router } from "./router";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme/theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  </StrictMode>
);
