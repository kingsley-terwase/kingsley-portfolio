import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import App from "./App";
createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}><CssBaseline /><App /></ThemeProvider>);
if ("serviceWorker" in navigator && import.meta.env.PROD)
  window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js"));
