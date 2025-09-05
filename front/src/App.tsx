import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoadingProvider, AuthProvider, HeaderProvider } from './context';
import { ErrorBoundary, MainLayout } from './components';
import { Home, LoginPage } from './pages';

import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <LoadingProvider>
          <HeaderProvider>
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
            </BrowserRouter>
          </HeaderProvider>
        </LoadingProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
