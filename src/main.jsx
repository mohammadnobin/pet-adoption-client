import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AuthProviders from "./authProviders/AuthProviders.jsx";
import { RouterProvider } from "react-router";
import { router } from "./routes/Routes.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DarkModeProvider } from "./context/DarkandLightContext/DarkModeProvider.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProviders>
        <DarkModeProvider>
        <RouterProvider router={router} />
        </DarkModeProvider>
      </AuthProviders>
    </QueryClientProvider>
  </StrictMode>
);
