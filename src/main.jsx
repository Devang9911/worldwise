import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CityProvider } from "./context/CityContext.jsx";
import "leaflet/dist/leaflet.css";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CityProvider>
        <App />
      </CityProvider>
    </AuthProvider>
  </StrictMode>,
);
