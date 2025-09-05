import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoadingProvider, AuthProvider, HeaderProvider, NotificationProvider } from './context';
import { ErrorBoundary, MainLayout, NotificationContainer } from './components';
import { Home, LoginPage } from './pages';

import './App.css';

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
                  <Route path="/*" element={
                    <MainLayout>
                      <Routes>
                        <Route path="/" element={<Home />} />
                      </Routes>
                    </MainLayout>
                  } />
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
