import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useResponsive } from '../../hooks/useResponsive';

/**
 * Componente de navegación principal
 * 
 * Demuestra:
 * - Uso de React Router para navegación
 * - Hook useResponsive para estilos responsive
 * - Navegación activa con useLocation
 * 
 * @example
 * ```tsx
 * import Navigation from './components/Navigation';
 * <Navigation />
 * ```
 */
const Navigation: React.FC = () => {
  const location = useLocation();
  const { text, spacing, flex, shadow, border } = useResponsive();

  const navItems = [
    { path: '/', label: 'Inicio', icon: '🏠' },
    { path: '/contact', label: 'Contacto', icon: '📧' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`bg-white ${shadow.medium} ${border.radius.medium} ${spacing.px.medium} ${spacing.py.small}`}>
      <div className="max-w-7xl mx-auto">
        <div className={`${flex.between}`}>
          {/* Logo */}
          <Link to="/" className={`${text.h4} font-bold text-blue-600 hover:text-blue-700 transition-colors`}>
            🚀 TechXcelerators
          </Link>

          {/* Navigation Items */}
          <div className={`${flex.center} space-x-6`}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  ${flex.center} space-x-2 px-4 py-2 rounded-lg transition-all duration-200
                  ${isActive(item.path)
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>
                <span className={`${text.small} font-medium`}>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
