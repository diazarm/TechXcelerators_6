import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import { LoadingProvider } from './context';
import Navigation from './components/Navigation';
import WelcomePage from './pages/WelcomePage';
import Contact from './pages/Contact';
import './App.css';

/**
 * Componente principal de la aplicación
 * 
 * Este archivo demuestra:
 * - ErrorBoundary global para capturar errores
 * - LoadingProvider para estados de carga globales
 * - Configuración de React Router para enrutamiento
 * - Navegación entre páginas
 * - Estructura de rutas organizada
 * 
 * @example
 * ```tsx
 * import App from './App';
 * <App />
 * ```
 */
function App() {
  return (
    <ErrorBoundary>
      <LoadingProvider>
        <BrowserRouter>
          <div className="App">
            <Navigation />
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </BrowserRouter>
      </LoadingProvider>
    </ErrorBoundary>
  );
}

export default App;
