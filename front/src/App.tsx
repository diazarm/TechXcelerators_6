import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoadingProvider,
  AuthProvider,
  HeaderProvider,
  NotificationProvider,
  ScreenSizeProvider,
} from "./context";
import {
  ErrorBoundary,
  MainLayout,
  NotificationContainer,
  AuthGuard,
} from "./components";

import {
  Home,
  LoginPage,
  RegisterPage,
  ConfirmationPage,
  Dashboard,
  Gobernanza,
  Alianza,
  Gestion,
  Planeacion,
  Iniciativas,
  Galeria,
  ManualUsuario,
  Utilidades,
} from "./pages";

import "./App.css";

function App() {
  return (
    <ScreenSizeProvider>
      <ErrorBoundary>
        <AuthProvider>
          <LoadingProvider>
            <HeaderProvider>
              <NotificationProvider>
              <BrowserRouter>
                <Routes>
                  {/* Login fuera del layout */}
                  <Route path="/login" element={<LoginPage />} />
                  
                  {/* Register fuera del layout */}
                  <Route path="/register" element={<RegisterPage />} />
                  
                  {/* Confirmation fuera del layout */}
                  <Route path="/confirmation" element={<ConfirmationPage />} />

                  {/* Layout principal - TODAS las rutas deben estar aquí */}
                  <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />

                    {/* Manual de Usuario - Sin AuthGuard */}
                    <Route path="manual-usuario" element={<ManualUsuario />} />

                    {/* Dashboard protegido */}
                    <Route
                      path="dashboard"
                      element={
                        <AuthGuard>
                          <Dashboard />
                        </AuthGuard>
                      }
                    />

                    {/* Rutas de Gobernanza, Alianza e Iniciativas - AÑADIDAS AQUÍ */}
                    <Route
                      path="gobernanza"
                      element={
                        <AuthGuard>
                          <Gobernanza />
                        </AuthGuard>
                      }
                    />
                    <Route
                      path="alianza"
                      element={
                        <AuthGuard>
                          <Alianza />
                        </AuthGuard>
                      }
                    />
                    <Route
                      path="gestion"
                      element={
                        <AuthGuard>
                          <Gestion />
                        </AuthGuard>
                      }
                    />
                    <Route
                      path="planeacion"
                      element={
                        <AuthGuard>
                          <Planeacion />
                        </AuthGuard>
                      }
                    />
                    <Route
                      path="iniciativas"
                      element={
                        <AuthGuard>
                          <Iniciativas />
                        </AuthGuard>
                      }
                    />
                    <Route
                      path="galeria"
                      element={
                        <AuthGuard>
                          <Galeria />
                        </AuthGuard>
                      }
                    />
                    <Route
                      path="utilidades"
                      element={
                        <AuthGuard>
                          <Utilidades />
                        </AuthGuard>
                      }
                    />

                  </Route>
                </Routes>

                <NotificationContainer />
              </BrowserRouter>
            </NotificationProvider>
          </HeaderProvider>
        </LoadingProvider>
      </AuthProvider>
      </ErrorBoundary>
    </ScreenSizeProvider>
  );
}

export default App;