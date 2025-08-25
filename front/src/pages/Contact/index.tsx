import React, { useState } from 'react';
import { useResponsive, useLoadingContext } from '../../hooks';
import LoadingSpinner from '../../components/LoadingSpinner';

/**
 * Página de contacto que demuestra el uso de useLoadingContext
 * 
 * Muestra cómo manejar estados de carga global y mensajes personalizados.
 */
const Contact: React.FC = () => {
  const { container, text, spacing, grid, shadow, border } = useResponsive();
  const { showLoading, hideLoading } = useLoadingContext();
  
  // Estado para mostrar spinners locales
  const [localSpinner, setLocalSpinner] = useState<{
    type: 'default' | 'dots' | 'pulse' | 'bars' | 'ring';
    message: string;
    isVisible: boolean;
  } | null>(null);

  // Simulador de envío de formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    showLoading({
      id: 'form-submit',
      message: 'Enviando mensaje...',
      variant: 'spinner'
    });
    
    // Simular llamada a API
    setTimeout(() => {
      hideLoading('form-submit');
      alert('¡Mensaje enviado exitosamente!');
    }, 2000);
  };

  // Ejemplos de diferentes tipos de loading
  const showLoadingExample = (type: 'default' | 'dots' | 'pulse' | 'bars' | 'ring') => {
    setLocalSpinner({
      type,
      message: `Ejemplo de spinner: ${type}`,
      isVisible: true
    });
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
      setLocalSpinner(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className={`${container} ${spacing.py.large}`}>
        <div className="text-center mb-16">
          <h1 className={`${text.h1} text-gray-900 mb-4`}>
            Contacta con Nosotros
          </h1>
          <p className={`${text.body} text-gray-600 max-w-3xl mx-auto`}>
            ¿Tienes un proyecto en mente? ¡Conversemos sobre cómo podemos ayudarte!
          </p>
        </div>

        <div className={`${grid.columns.two} ${grid.gap.large} items-start`}>
          {/* Información de contacto */}
          <div className={`bg-white ${border.radius.medium} p-8 ${shadow.medium}`}>
            <h2 className={`${text.h3} text-gray-900 mb-6`}>Información de Contacto</h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📧</span>
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-gray-600">contacto@techxcelerators.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📱</span>
                <div>
                  <p className="font-medium text-gray-900">Teléfono</p>
                  <p className="text-gray-600">+56 9 1234 5678</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="font-medium text-gray-900">Ubicación</p>
                  <p className="text-gray-600">Santiago, Chile</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div className={`bg-white ${border.radius.medium} p-8 ${shadow.medium}`}>
            <h2 className={`${text.h3} text-gray-900 mb-6`}>Envíanos un Mensaje</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tu nombre completo"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="tu@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje
                </label>
                <textarea
                  rows={4}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Cuéntanos sobre tu proyecto..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                📧 Enviar Mensaje (con Loading Global)
              </button>
            </form>
            
            {/* Ejemplos de Loading */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                🔄 Ejemplos de Loading Spinner
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['default', 'dots', 'pulse', 'bars', 'ring'].map((type) => (
                  <button
                    key={type}
                    onClick={() => showLoadingExample(type as 'default' | 'dots' | 'pulse' | 'bars' | 'ring')}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors capitalize"
                  >
                    {type}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                💡 Haz clic en los botones para ver diferentes tipos de spinners
              </p>
            </div>
            
            {/* Ejemplo de spinner local */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                📱 Spinner Local (sin overlay)
              </h4>
              
              {/* Spinner dinámico que cambia según el botón */}
              {localSpinner && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <LoadingSpinner 
                    type={localSpinner.type} 
                    size="medium" 
                    message={localSpinner.message} 
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
