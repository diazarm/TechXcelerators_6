import React, { useEffect, useRef, useState } from 'react';
import { Users, FileText, Settings, UserCheck, Info } from 'react-feather';
import { useScreenSize } from '../../context';
import { useAuth } from '../../hooks';
import { COLOR_CLASSES } from '../../constants';
import { CollapsibleSection, UserManagement, DocumentManagement } from '../../components';

/**
 * Página de Utilidades - Gestión de usuarios y documentos
 * Diseño consistente con Manual de Usuario pero con autenticación requerida
 */
const Utilidades: React.FC = () => {
  const { scale, getContainerForScreen, getResponsivePadding, getResponsiveMargin, getResponsiveText } = useScreenSize();
  const { user } = useAuth();
  const isAdmin = user?.isAdmin || false;
  const mainRef = useRef<HTMLDivElement>(null);
  const [focusedSection, setFocusedSection] = useState<string | null>(null);
  const [showAdminInfo, setShowAdminInfo] = useState(false);

  useEffect(() => {
    // Configurar título de la página según rol
    document.title = isAdmin ? 'Utilidades - Scala Learning' : 'Documentos - Scala Learning';
    
    // Focus inicial en el contenido principal
    if (mainRef.current) {
      mainRef.current.focus();
    }
  }, [isAdmin]);

  // Cerrar modal con Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showAdminInfo) {
        setShowAdminInfo(false);
      }
    };

    if (showAdminInfo) {
      document.addEventListener('keydown', handleEscape);
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [showAdminInfo]);

  // Manejar navegación por teclado en la página
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      // Permitir navegación normal con Tab
      return;
    }
    
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const sections = ['admin-permissions', 'user-management', 'document-management'];
      const currentIndex = sections.indexOf(focusedSection || '');
      
      let nextIndex;
      if (e.key === 'ArrowDown') {
        nextIndex = currentIndex < sections.length - 1 ? currentIndex + 1 : 0;
      } else {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : sections.length - 1;
      }
      
      setFocusedSection(sections[nextIndex]);
      
      // Focus en la sección correspondiente
      const sectionElement = document.getElementById(sections[nextIndex]);
      if (sectionElement) {
        sectionElement.focus();
      }
    }
  };

  return (
    <main 
      ref={mainRef}
      className={`${getContainerForScreen()} [&_*]:outline-none [&_*]:shadow-none [&_button:focus]:outline-none [&_button:focus]:ring-0 [&_button:focus]:shadow-none [&_input:focus]:outline-none [&_input:focus]:ring-0 [&_select:focus]:outline-none [&_select:focus]:ring-0 [&_textarea:focus]:outline-none [&_textarea:focus]:ring-0 [&_*::selection]:bg-[#FF6E00] [&_*::selection]:text-white`}
      tabIndex={-1}
      role="main"
      aria-label="Página de Utilidades - Gestión administrativa del sistema"
      onKeyDown={handleKeyDown}
    >
      {/* Header con banner - Dinámico según rol */}
      <header 
        className={`text-center bg-white shadow-sm rounded-2xl border border-gray-100 ${getResponsivePadding('large')} ${getResponsiveMargin('medium')}`}
        role="banner"
        aria-labelledby="utilidades-title"
      >
        {/* Ícono y título siempre juntos, centrados */}
        <div 
          className="flex items-center justify-center gap-2 mb-4"
        >
          {/* Ícono */}
          <div 
            className="rounded-full bg-gradient-to-br from-[#FF6E00] to-[#FF8C3A] shadow-lg flex items-center justify-center flex-shrink-0"
            style={{ 
              width: scale(28), 
              height: scale(28)
            }}
          >
            {isAdmin ? (
              <Settings size={scale(16)} className="text-white" />
            ) : (
              <FileText size={scale(16)} className="text-white" />
            )}
          </div>

          {/* Título responsivo según rol */}
          <h1 
            id="utilidades-title"
            className={`${COLOR_CLASSES.textPrimary} font-bold ${getResponsiveText('large')}`}
          >
            {isAdmin ? 'Utilidades' : 'Documentos Disponibles'}
          </h1>
        </div>
        <p 
          className={`${COLOR_CLASSES.textSecondary} mx-auto max-w-2xl ${getResponsiveText('medium')} px-4`}
          style={{ lineHeight: '1.6' }}
        >
          {isAdmin 
            ? 'Gestión administrativa del sistema'
            : 'Accede a los documentos compartidos contigo'
          }
        </p>
        <p 
          className={`text-[#6B7280] mx-auto max-w-xl ${getResponsiveText('small')} px-4 mt-2`}
        >
          {isAdmin 
            ? 'Administra usuarios, roles y configuraciones del sistema'
            : 'Visualiza y descarga manuales, informes, guías y más'
          }
        </p>
      </header>

      {/* ADMIN: Información sobre permisos */}
      {isAdmin && (
        <section 
          id="admin-permissions"
          className={`bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-[#FF6E00]/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#5D5A88] focus:ring-opacity-50 ${getResponsivePadding('medium')} ${getResponsiveMargin('medium')}`}
          aria-labelledby="admin-permissions-title"
          tabIndex={0}
        >
          <div className="flex items-center gap-2 mb-4">
            <UserCheck size={scale(24)} className="text-[#5D5A88]" />
            <h2 
              id="admin-permissions-title"
              className={`${COLOR_CLASSES.textPrimary} font-semibold ${getResponsiveText('medium')} flex items-center gap-2`}
            >
              Permisos de Administrador
              {/* Icono de información */}
              <button
                onClick={() => setShowAdminInfo(true)}
                className="text-gray-500 hover:text-[#5D5A88] transition-colors duration-200 bg-transparent border-none p-0 m-0"
                aria-label="Información sobre permisos de administrador"
              >
                <Info size={scale(16)} />
              </button>
            </h2>
          </div>
          <p 
            className={`text-[#5D5A88] ${getResponsiveText('small')}`}
            style={{ lineHeight: '1.6' }}
          >
            Solo los administradores pueden acceder a esta sección. Aquí puedes gestionar usuarios, documentos y controlar el acceso al sistema.
          </p>
        </section>
      )}

      {/* ADMIN: Gestión de Usuarios (Colapsable) */}
      {isAdmin && (
        <div id="user-management" tabIndex={0} className="focus:outline-none focus:ring-2 focus:ring-[#5D5A88] focus:ring-opacity-50 rounded-lg">
          <CollapsibleSection
            title="Gestión de Usuarios"
            icon={<Users size={scale(24)} className={COLOR_CLASSES.primary} />}
            defaultOpen={false}
          >
          <p 
            className={`${COLOR_CLASSES.textSecondary} ${getResponsiveText('small')} mb-4`}
            style={{ lineHeight: '1.6' }}
          >
            Administra roles y estados de los usuarios del sistema
          </p>
          <UserManagement />
        </CollapsibleSection>
        </div>
      )}

      {/* Gestión de Documentos - Dinámico según rol */}
      {isAdmin ? (
        /* Admin: Colapsable con gestión completa */
        <div id="document-management" tabIndex={0} className="focus:outline-none focus:ring-2 focus:ring-[#5D5A88] focus:ring-opacity-50 rounded-lg">
          <CollapsibleSection
            title="Gestión de Documentos"
            icon={<FileText size={scale(24)} className={COLOR_CLASSES.primary} />}
            defaultOpen={false}
          >
            <DocumentManagement />
          </CollapsibleSection>
        </div>
      ) : (
        /* Director/Usuario: Vista directa sin wrapper adicional */
        <DocumentManagement />
      )}

      {/* Modal de información para administradores */}
      {showAdminInfo && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: scale(16),
          }}
          onClick={() => setShowAdminInfo(false)}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: scale(12),
              maxWidth: scale(500),
              width: '100%',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              style={{
                background: 'linear-gradient(135deg, #5D5A88 0%, #6B6A9A 100%)',
                padding: scale(16),
                borderTopLeftRadius: scale(12),
                borderTopRightRadius: scale(12),
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: scale(8) }}>
                <Info size={scale(20)} color="white" />
                <h2
                  style={{
                    margin: 0,
                    fontSize: scale(16),
                    fontWeight: 600,
                    color: 'white',
                  }}
                >
                  Información de Administrador
                </h2>
              </div>
              <button
                onClick={() => setShowAdminInfo(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                }}
                aria-label="Cerrar modal"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: scale(20) }}>
              <div style={{ marginBottom: scale(16) }}>
                <h3 style={{ fontSize: scale(14), fontWeight: 600, color: '#5D5A88', marginBottom: scale(8) }}>
                  Gestión de Usuarios
                </h3>
                <ul style={{ fontSize: scale(12), color: '#6B7280', marginLeft: scale(16) }}>
                  <li>• Cambiar roles (Director/Usuario)</li>
                  <li>• Activar/desactivar usuarios</li>
                  <li>• Filtrar por rol y estado</li>
                </ul>
              </div>
              
              <div style={{ marginBottom: scale(16) }}>
                <h3 style={{ fontSize: scale(14), fontWeight: 600, color: '#5D5A88', marginBottom: scale(8) }}>
                  Gestión de Documentos
                </h3>
                <ul style={{ fontSize: scale(12), color: '#6B7280', marginLeft: scale(16) }}>
                  <li>• Subir nuevos documentos</li>
                  <li>• Editar información existente</li>
                  <li>• Gestionar visibilidad por rol</li>
                  <li>• Restaurar documentos eliminados</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Utilidades;