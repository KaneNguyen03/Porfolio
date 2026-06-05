import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";
// import { StrictMode } from "react";

// biome-ignore lint/style/noNonNullAssertion: Root element is guaranteed to exist in index.html
createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  // </StrictMode>,
);
