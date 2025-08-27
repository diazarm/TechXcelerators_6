import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoadingProvider, AuthProvider } from './context';
import { ErrorBoundary } from './components';
import { Header } from './components/Layout/navbar';
import MainLayout from './components/Layout/MainLayout';
import WelcomePage from './pages/WelcomePage';
import Contact from './pages/Contact';
import './App.css';

//mainlayout renderizar
function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <LoadingProvider>
          <BrowserRouter>
            <div className="App">
              <Header /> 
              <MainLayout>
                <Routes>
                  <Route path="/" element={<WelcomePage />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </MainLayout>
            </div>
          </BrowserRouter>
        </LoadingProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
