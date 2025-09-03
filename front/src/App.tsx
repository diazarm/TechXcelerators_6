import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoadingProvider, AuthProvider, HeaderProvider } from './context';
import { ErrorBoundary , MainLayout } from './components';
import { WelcomePage, Contact, LoginPage } from './pages';

import './App.css';
//entre browser router y mainlayout importar. 
//mainlayout renderizar
function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <LoadingProvider>
          <HeaderProvider>
            <BrowserRouter>
                <MainLayout>
                <div className="App">
                  <Routes>
                    <Route path="/" element={<WelcomePage />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<LoginPage />} />

                  </Routes>
                </div>
                </MainLayout>
                
            </BrowserRouter>
          </HeaderProvider>
        </LoadingProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
