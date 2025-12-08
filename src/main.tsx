import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import { AuthProvider } from "./context/AuthContext";
import App from "./App";
import Home from "./pages/Home";
import Map from "./pages/Map";
import AuthPage from "./components/auth/AuthPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/auth/AdminRoute";
import SpeciesExplorer from "@/pages/SpeciesExplorer";
import SpeciesDetails from "@/pages/SpeciesDetails";
import LogSighting from "@/pages/LogSighting";
import AdminLayout from "@/components/admin/layout/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminUsers from "@/pages/admin/AdminUsers";
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

if (import.meta.env.PROD) {
  console.log('App started.');
}


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
            <Routes>
              <Route path="/" element={<App />}>
                <Route element={<ProtectedRoute />}>
                  <Route index element={<Home />} />
                  <Route path="map" element={<Map />} />
                  <Route path="species" element={<SpeciesExplorer />} />
                  <Route path="species/:id" element={<SpeciesDetails />} />
                  <Route path="sightings" element={<LogSighting />} />
                </Route>
                <Route path="auth" element={<AuthPage />} />
              </Route>
              
              {/* Admin Routes - Only accessible by admin role */}
              <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="users" element={<AdminUsers />} />
                  {/* Add more admin routes here */}
                </Route>
              </Route>
            </Routes>
            </AuthProvider>
          </QueryClientProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
