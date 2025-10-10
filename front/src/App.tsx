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
  Instalacion,
  Manual,
  Seguridad,
  Roadmap,
  FAQ,
  Changelog,
  Alianza,
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

                    {/* Rutas de resources */}
                    <Route path="resources">
                      <Route path="instalacion" element={<Instalacion />} />
                      <Route path="manual" element={<Manual />} />
                      <Route path="seguridad" element={<Seguridad />} />
                      <Route path="roadmap" element={<Roadmap />} />
                      <Route path="faq" element={<FAQ />} />
                      <Route path="changelog" element={<Changelog />} />
                    </Route>

                    {/* Dashboard protegido */}
                    <Route
                      path="dashboard"
                      element={
                        <AuthGuard>
                          <Dashboard />
                        </AuthGuard>
                      }
                    />

                    {/* Rutas de Gobernanza y Alianza - AÑADIDAS AQUÍ */}
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