import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  LoadingProvider,
  AuthProvider,
  HeaderProvider,
  NotificationProvider,
} from "./context";

import { ErrorBoundary, MainLayout, NotificationContainer } from "./components";

import {
  Home,
  LoginPage,
  Instalacion,
  Manual,
  Seguridad,
  Changelog,
  FAQ,
  Roadmap,
} from "./pages";

import "./App.css";

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <LoadingProvider>
          <HeaderProvider>
            <NotificationProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route
                    path="/*"
                    element={
                      <MainLayout>
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route
                            path="/resources/instalacion"
                            element={<Instalacion />}
                          />
                          <Route
                            path="/resources/manual"
                            element={<Manual />}
                          />
                          <Route
                            path="/resources/seguridad"
                            element={<Seguridad />}
                          />
                          <Route
                            path="/resources/changelog"
                            element={<Changelog />}
                          />
                          <Route path="/resources/faq" element={<FAQ />} />
                          <Route
                            path="/resources/roadmap"
                            element={<Roadmap />}
                          />
                        </Routes>
                      </MainLayout>
                    }
                  />
                </Routes>
                <NotificationContainer />
              </BrowserRouter>
            </NotificationProvider>
          </HeaderProvider>
        </LoadingProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
