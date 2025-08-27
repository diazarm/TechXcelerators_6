import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoadingProvider, AuthProvider } from './context';
import { ErrorBoundary } from './components';
import MainLayout from './components/Layout/MainLayout';
import WelcomePage from './pages/WelcomePage';
import Contact from './pages/Contact';
import LoginPage from './pages/Login';
import './App.css';

//mainlayout renderizar
function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <LoadingProvider>
          <BrowserRouter>
              <MainLayout>
              <div className="App">
                <Routes>
                  <Route path="/" element={<WelcomePage />} />
                  <Route path="/contact" element={<Contact />} />

                <Route path="/" element={<WelcomePage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<LoginPage />} />
              </Routes>
              </div>
              </MainLayout>
              
          </BrowserRouter>
        </LoadingProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
