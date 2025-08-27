import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoadingProvider, AuthProvider } from './context';
import { ErrorBoundary, Navigation } from './components';
import WelcomePage from './pages/WelcomePage';
import Contact from './pages/Contact';
import LoginPage from './pages/Login';
import './App.css';


function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <LoadingProvider>
          <BrowserRouter>
            <div className="App">
              <Navigation />
              <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<LoginPage />} />
              </Routes>
            </div>
          </BrowserRouter>
        </LoadingProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
