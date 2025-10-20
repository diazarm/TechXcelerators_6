import React, { useEffect } from 'react';
import { BookOpen, FileText, HelpCircle, Settings, Shield, Home, LogIn, Edit3, EyeOff, RotateCcw, Info, Lock, AlertCircle } from 'react-feather';
import { useScreenSize } from '../../context';
import { COLOR_CLASSES } from '../../constants';

/**
 * Página de Manual de Usuario
 * Placeholder para futuro contenido de ayuda y documentación
 */
const ManualUsuario: React.FC = () => {
  const { dimensions, scale, getContainerForScreen } = useScreenSize();

  // Scroll to top al montar la página
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <div className={`${getContainerForScreen()}`}>
      {/* Header con banner */}
      <div 
        className="text-center bg-gradient-to-r from-[#5D5A88]/5 via-[#FF6E00]/5 to-[#5D5A88]/5 rounded-2xl shadow-sm border border-gray-100"
        style={{
          paddingTop: dimensions.spacing['3xl'],
          paddingBottom: dimensions.spacing['3xl'],
          marginBottom: dimensions.spacing['2xl']
        }}
      >
        {/* Ícono y título siempre juntos, centrados */}
        <div 
          className="flex items-center justify-center"
          style={{ gap: dimensions.spacing.sm, marginBottom: dimensions.spacing.lg }}
        >
          {/* Ícono */}
          <div 
            className="rounded-full bg-gradient-to-br from-[#FF6E00] to-[#FF8C3A] shadow-lg flex items-center justify-center flex-shrink-0"
            style={{ 
              width: scale(28), 
              height: scale(28)
            }}
          >
            <BookOpen size={scale(16)} className="text-white" />
          </div>

          {/* Título responsivo */}
          <h1 
            className={`${COLOR_CLASSES.textPrimary} font-bold`}
            style={{ fontSize: dimensions.fontSize['2xl'] }}
          >
            Manual de Usuario
          </h1>
        </div>
        <p 
          className={COLOR_CLASSES.textSecondary}
          style={{ 
            fontSize: dimensions.fontSize.xl,
            maxWidth: `${scale(700)}px`,
            margin: '0 auto',
            lineHeight: '1.6'
          }}
        >
          Guía completa para utilizar la plataforma Scala Learning
        </p>
        <p 
          className="text-[#6B7280] mt-2"
          style={{ 
            fontSize: dimensions.fontSize.sm,
            maxWidth: `${scale(600)}px`,
            margin: '0 auto',
            marginTop: dimensions.spacing.sm
          }}
        >
          Aprende a navegar, gestionar recursos y aprovechar todas las funcionalidades
        </p>
      </div>

      {/* Sección: Acceso a la Plataforma */}
      <div 
        className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-[#FF6E00]/20 transition-all duration-300"
        style={{ 
          padding: dimensions.spacing.xl,
          marginBottom: dimensions.spacing.xl
        }}
      >
        <div className="flex items-center" style={{ gap: dimensions.spacing.sm, marginBottom: dimensions.spacing.lg }}>
            <div 
              className="rounded-full bg-[#FF6E00] bg-opacity-10 flex items-center justify-center"
              style={{
                width: dimensions.spacing.xl,
                height: dimensions.spacing.xl
              }}
            >
            <LogIn size={scale(24)} className={COLOR_CLASSES.primary} />
            </div>
            <h2 
            className={`${COLOR_CLASSES.textPrimary} font-semibold`}
            style={{ fontSize: dimensions.fontSize['2xl'] }}
          >
            Acceso a la Plataforma
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: dimensions.spacing.lg }}>
          <div>
            <h3 
              className={`${COLOR_CLASSES.textPrimary} font-semibold`}
              style={{ fontSize: dimensions.fontSize.lg, marginBottom: dimensions.spacing.sm }}
            >
              Para Usuarios Staff
            </h3>
            <p 
              className={COLOR_CLASSES.textSecondary}
              style={{ 
                fontSize: dimensions.fontSize.sm,
                lineHeight: '1.6',
                marginBottom: dimensions.spacing.md
              }}
            >
              Si eres parte del equipo de trabajo, usa el botón "Acceso Staff" en la página principal.
            </p>
            <ul 
              className="space-y-2"
              style={{ fontSize: dimensions.fontSize.sm, color: '#6B7280' }}
            >
              <li>• Solo necesitas ingresar tu email</li>
              <li>• No se requiere contraseña</li>
              <li>• Accede directamente al Dashboard</li>
              <li>• Navega por las secciones disponibles</li>
            </ul>
          </div>
          
          <div>
            <h3 
              className={`${COLOR_CLASSES.textPrimary} font-semibold`}
              style={{ fontSize: dimensions.fontSize.lg, marginBottom: dimensions.spacing.sm }}
            >
              Para Administradores
            </h3>
          <p 
            className={COLOR_CLASSES.textSecondary}
            style={{ 
              fontSize: dimensions.fontSize.sm,
                lineHeight: '1.6',
                marginBottom: dimensions.spacing.md
              }}
            >
              Los administradores usan el botón "Acceso Administración" y requieren email y contraseña.
            </p>
            <ul 
              className="space-y-2"
              style={{ fontSize: dimensions.fontSize.sm, color: '#6B7280' }}
            >
              <li>• Ingresa con email y contraseña</li>
              <li>• Gestión completa de usuarios</li>
              <li>• Administración de recursos</li>
              <li>• Acceso a todas las secciones</li>
            </ul>
          </div>
        </div>
        </div>

      {/* Sección: Navegación Principal */}
      <div 
        className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-[#5D5A88]/20 transition-all duration-300"
        style={{ 
          padding: dimensions.spacing.xl,
          marginBottom: dimensions.spacing.xl
        }}
      >
        <div className="flex items-center" style={{ gap: dimensions.spacing.sm, marginBottom: dimensions.spacing.lg }}>
            <div 
              className="rounded-full bg-[#FF6E00] bg-opacity-10 flex items-center justify-center"
              style={{
                width: dimensions.spacing.xl,
                height: dimensions.spacing.xl
              }}
            >
            <Home size={scale(24)} className={COLOR_CLASSES.primary} />
            </div>
            <h2 
              className={`${COLOR_CLASSES.textPrimary} font-semibold`}
            style={{ fontSize: dimensions.fontSize['2xl'] }}
          >
            Navegación Principal
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: dimensions.spacing.lg }}>
          <div className="rounded-lg bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-[#FF6E00]/30 transition-all duration-200" style={{ padding: dimensions.spacing.md }}>
            <div className="flex items-center" style={{ gap: dimensions.spacing.xs, marginBottom: dimensions.spacing.sm }}>
              <div className="rounded-full bg-[#FF6E00]" style={{ width: scale(8), height: scale(8) }}></div>
              <h3 
                className={`${COLOR_CLASSES.textPrimary} font-semibold`}
                style={{ fontSize: dimensions.fontSize.lg }}
              >
                Dashboard
              </h3>
            </div>
            <p 
              className={COLOR_CLASSES.textSecondary}
              style={{ 
                fontSize: dimensions.fontSize.sm,
                lineHeight: '1.6'
              }}
            >
              Tu página principal con acceso rápido a todas las secciones de la plataforma.
            </p>
          </div>
          
          <div className="rounded-lg bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-[#5D5A88]/30 transition-all duration-200" style={{ padding: dimensions.spacing.md }}>
            <div className="flex items-center" style={{ gap: dimensions.spacing.xs, marginBottom: dimensions.spacing.sm }}>
              <div className="rounded-full bg-[#FF6E00]" style={{ width: scale(8), height: scale(8) }}></div>
              <h3 
                className={`${COLOR_CLASSES.textPrimary} font-semibold`}
                style={{ fontSize: dimensions.fontSize.lg }}
              >
                Búsqueda Global
              </h3>
            </div>
            <p 
              className={COLOR_CLASSES.textSecondary}
              style={{ 
                fontSize: dimensions.fontSize.sm,
                lineHeight: '1.6'
              }}
            >
              Busca en todas las secciones desde la barra de búsqueda en la parte superior.
            </p>
          </div>
          
          <div className="rounded-lg bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-[#FF6E00]/30 transition-all duration-200" style={{ padding: dimensions.spacing.md }}>
            <div className="flex items-center" style={{ gap: dimensions.spacing.xs, marginBottom: dimensions.spacing.sm }}>
              <div className="rounded-full bg-[#FF6E00]" style={{ width: scale(8), height: scale(8) }}></div>
              <h3 
                className={`${COLOR_CLASSES.textPrimary} font-semibold`}
                style={{ fontSize: dimensions.fontSize.lg }}
              >
                Menú de Navegación
              </h3>
          </div>
          <p 
            className={COLOR_CLASSES.textSecondary}
            style={{ 
              fontSize: dimensions.fontSize.sm,
              lineHeight: '1.6'
            }}
          >
              Accede a todas las secciones desde el menú hamburguesa en móvil o la barra superior en desktop.
          </p>
          </div>
        </div>
        </div>

      {/* Sección: Gestión de Recursos */}
      <div 
        className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-[#FF6E00]/20 transition-all duration-300"
        style={{ 
          padding: dimensions.spacing.xl,
          marginBottom: dimensions.spacing.xl
        }}
      >
        <div className="flex items-center" style={{ gap: dimensions.spacing.sm, marginBottom: dimensions.spacing.lg }}>
            <div 
              className="rounded-full bg-[#FF6E00] bg-opacity-10 flex items-center justify-center"
              style={{
                width: dimensions.spacing.xl,
                height: dimensions.spacing.xl
              }}
            >
            <Settings size={scale(24)} className={COLOR_CLASSES.primary} />
          </div>
          <h2 
            className={`${COLOR_CLASSES.textPrimary} font-semibold`}
            style={{ fontSize: dimensions.fontSize['2xl'] }}
          >
            Gestión de Recursos
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: dimensions.spacing.lg }}>
          <div>
            <h3 
              className={`${COLOR_CLASSES.textPrimary} font-semibold`}
              style={{ fontSize: dimensions.fontSize.lg, marginBottom: dimensions.spacing.sm }}
            >
              Editar Recursos
            </h3>
            <p 
              className={COLOR_CLASSES.textSecondary}
              style={{ 
                fontSize: dimensions.fontSize.sm,
                lineHeight: '1.6',
                marginBottom: dimensions.spacing.md
              }}
            >
              Haz clic en el ícono de edición (lápiz) en cualquier tarjeta de recurso para modificarlo.
            </p>
            <div className="flex items-center" style={{ gap: dimensions.spacing.sm }}>
              <Edit3 size={scale(16)} className="text-[#5D5A88]" />
              <span style={{ fontSize: dimensions.fontSize.sm, color: '#6B7280' }}>
                Ícono de edición en las tarjetas
              </span>
            </div>
          </div>
          
          <div>
            <h3 
              className={`${COLOR_CLASSES.textPrimary} font-semibold`}
              style={{ fontSize: dimensions.fontSize.lg, marginBottom: dimensions.spacing.sm }}
            >
              Eliminar Recursos
            </h3>
            <p 
              className={COLOR_CLASSES.textSecondary}
              style={{ 
                fontSize: dimensions.fontSize.sm,
                lineHeight: '1.6',
                marginBottom: dimensions.spacing.md
              }}
            >
              Usa el ícono de ocultar (ojo tachado) para eliminar recursos de forma temporal. Los recursos se pueden restaurar después.
            </p>
            <div className="flex items-center" style={{ gap: dimensions.spacing.sm }}>
              <EyeOff size={scale(16)} className="text-[#5D5A88]" />
              <span style={{ fontSize: dimensions.fontSize.sm, color: '#6B7280' }}>
                Ícono de ocultar/eliminar en las tarjetas
              </span>
            </div>
          </div>
        </div>
        
        <div 
          className="mt-6 p-4 bg-blue-50 rounded-lg"
          style={{ marginTop: dimensions.spacing.md }}
        >
          <div className="flex items-center" style={{ gap: dimensions.spacing.sm, marginBottom: dimensions.spacing.sm }}>
            <RotateCcw size={scale(16)} className="text-blue-600" />
            <span 
              className="font-semibold text-blue-800"
              style={{ fontSize: dimensions.fontSize.sm }}
            >
              Restaurar Recursos Eliminados
            </span>
          </div>
          <p 
            className="text-blue-700"
            style={{ 
              fontSize: dimensions.fontSize.sm,
              lineHeight: '1.6'
            }}
          >
            Los administradores y directores pueden restaurar recursos eliminados usando el botón "Restaurar" en la barra superior.
          </p>
        </div>
      </div>

      {/* Sección: Roles y Permisos */}
      <div 
        className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-[#5D5A88]/20 transition-all duration-300"
        style={{ 
          padding: dimensions.spacing.xl,
          marginBottom: dimensions.spacing.xl
        }}
      >
        <div className="flex items-center" style={{ gap: dimensions.spacing.sm, marginBottom: dimensions.spacing.lg }}>
          <div 
            className="rounded-full bg-[#FF6E00] bg-opacity-10 flex items-center justify-center"
            style={{
              width: dimensions.spacing.xl,
              height: dimensions.spacing.xl
            }}
          >
            <Shield size={scale(24)} className={COLOR_CLASSES.primary} />
          </div>
          <h2 
            className={`${COLOR_CLASSES.textPrimary} font-semibold`}
            style={{ fontSize: dimensions.fontSize['2xl'] }}
          >
            Roles y Permisos
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: dimensions.spacing.lg }}>
          <div className="rounded-lg bg-gradient-to-br from-blue-50 to-white border border-blue-100 hover:border-blue-300 transition-all duration-200" style={{ padding: dimensions.spacing.md }}>
            <div className="flex items-center" style={{ gap: dimensions.spacing.xs, marginBottom: dimensions.spacing.sm }}>
              <div className="rounded-full bg-[#FF6E00]" style={{ width: scale(8), height: scale(8) }}></div>
              <h3 
                className={`${COLOR_CLASSES.textPrimary} font-semibold`}
                style={{ fontSize: dimensions.fontSize.lg }}
              >
                Usuario
              </h3>
            </div>
            <ul 
              className="space-y-1"
              style={{ fontSize: dimensions.fontSize.sm, color: '#6B7280' }}
            >
              <li>• Ver recursos</li>
              <li>• Navegar por secciones</li>
              <li>• Usar búsqueda</li>
            </ul>
          </div>
          
          <div className="rounded-lg bg-gradient-to-br from-purple-50 to-white border border-purple-100 hover:border-purple-300 transition-all duration-200" style={{ padding: dimensions.spacing.md }}>
            <div className="flex items-center" style={{ gap: dimensions.spacing.xs, marginBottom: dimensions.spacing.sm }}>
              <div className="rounded-full bg-[#FF6E00]" style={{ width: scale(8), height: scale(8) }}></div>
              <h3 
                className={`${COLOR_CLASSES.textPrimary} font-semibold`}
                style={{ fontSize: dimensions.fontSize.lg }}
              >
                Director
              </h3>
            </div>
            <ul 
              className="space-y-1"
              style={{ fontSize: dimensions.fontSize.sm, color: '#6B7280' }}
            >
              <li>• Todas las funciones de Usuario</li>
              <li>• Editar recursos</li>
              <li>• Eliminar recursos</li>
              <li>• Restaurar recursos</li>
            </ul>
          </div>
          
          <div className="rounded-lg bg-gradient-to-br from-orange-50 to-white border border-orange-100 hover:border-[#FF6E00] transition-all duration-200" style={{ padding: dimensions.spacing.md }}>
            <div className="flex items-center" style={{ gap: dimensions.spacing.xs, marginBottom: dimensions.spacing.sm }}>
              <div className="rounded-full bg-[#FF6E00]" style={{ width: scale(8), height: scale(8) }}></div>
              <h3 
                className={`${COLOR_CLASSES.textPrimary} font-semibold`}
                style={{ fontSize: dimensions.fontSize.lg }}
              >
                Administrador
              </h3>
            </div>
            <ul 
              className="space-y-1"
              style={{ fontSize: dimensions.fontSize.sm, color: '#6B7280' }}
            >
              <li>• Todas las funciones de Director</li>
              <li>• Crear usuarios</li>
              <li>• Gestionar roles</li>
              <li>• Acceso completo al sistema</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sección: Secciones de la Plataforma */}
      <div 
        className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-[#FF6E00]/20 transition-all duration-300"
        style={{
          padding: dimensions.spacing.xl,
          marginBottom: dimensions.spacing.xl
        }}
      >
        <div className="flex items-center" style={{ gap: dimensions.spacing.sm, marginBottom: dimensions.spacing.lg }}>
          <div 
            className="rounded-full bg-[#FF6E00] bg-opacity-10 flex items-center justify-center"
            style={{
              width: dimensions.spacing.xl,
              height: dimensions.spacing.xl
            }}
          >
            <FileText size={scale(24)} className={COLOR_CLASSES.primary} />
          </div>
          <h2 
            className={`${COLOR_CLASSES.textPrimary} font-semibold`}
            style={{ fontSize: dimensions.fontSize['2xl'] }}
          >
            Secciones de la Plataforma
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: dimensions.spacing.lg }}>
          <div className="rounded-lg bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-[#FF6E00]/30 hover:shadow-sm transition-all duration-200" style={{ padding: dimensions.spacing.md }}>
            <div className="flex items-center" style={{ gap: dimensions.spacing.xs, marginBottom: dimensions.spacing.sm }}>
              <div className="rounded-full bg-[#FF6E00]" style={{ width: scale(8), height: scale(8) }}></div>
              <h3 
                className={`${COLOR_CLASSES.textPrimary} font-semibold`}
                style={{ fontSize: dimensions.fontSize.lg }}
              >
                Nuestra Alianza
              </h3>
            </div>
            <p 
              className={COLOR_CLASSES.textSecondary}
              style={{ 
                fontSize: dimensions.fontSize.sm,
                lineHeight: '1.6'
              }}
            >
              Información sobre las alianzas y colaboraciones de la plataforma.
            </p>
          </div>
          
          <div className="rounded-lg bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-[#5D5A88]/30 hover:shadow-sm transition-all duration-200" style={{ padding: dimensions.spacing.md }}>
            <div className="flex items-center" style={{ gap: dimensions.spacing.xs, marginBottom: dimensions.spacing.sm }}>
              <div className="rounded-full bg-[#FF6E00]" style={{ width: scale(8), height: scale(8) }}></div>
              <h3 
                className={`${COLOR_CLASSES.textPrimary} font-semibold`}
                style={{ fontSize: dimensions.fontSize.lg }}
              >
                Gobernanza
              </h3>
            </div>
            <p 
              className={COLOR_CLASSES.textSecondary}
              style={{ 
                fontSize: dimensions.fontSize.sm,
                lineHeight: '1.6'
              }}
            >
              Documentos y recursos relacionados con la gobernanza institucional.
            </p>
          </div>
          
          <div className="rounded-lg bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-[#FF6E00]/30 hover:shadow-sm transition-all duration-200" style={{ padding: dimensions.spacing.md }}>
            <div className="flex items-center" style={{ gap: dimensions.spacing.xs, marginBottom: dimensions.spacing.sm }}>
              <div className="rounded-full bg-[#FF6E00]" style={{ width: scale(8), height: scale(8) }}></div>
              <h3 
                className={`${COLOR_CLASSES.textPrimary} font-semibold`}
                style={{ fontSize: dimensions.fontSize.lg }}
              >
                Planeación
              </h3>
            </div>
            <p 
              className={COLOR_CLASSES.textSecondary}
              style={{ 
                fontSize: dimensions.fontSize.sm,
                lineHeight: '1.6'
              }}
            >
              Recursos y herramientas para la planificación estratégica y operativa.
            </p>
          </div>
          
          <div className="rounded-lg bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-[#5D5A88]/30 hover:shadow-sm transition-all duration-200" style={{ padding: dimensions.spacing.md }}>
            <div className="flex items-center" style={{ gap: dimensions.spacing.xs, marginBottom: dimensions.spacing.sm }}>
              <div className="rounded-full bg-[#FF6E00]" style={{ width: scale(8), height: scale(8) }}></div>
              <h3 
                className={`${COLOR_CLASSES.textPrimary} font-semibold`}
                style={{ fontSize: dimensions.fontSize.lg }}
              >
                Gestión
              </h3>
            </div>
            <p 
              className={COLOR_CLASSES.textSecondary}
              style={{ 
                fontSize: dimensions.fontSize.sm,
                lineHeight: '1.6'
              }}
            >
              Herramientas y recursos para la gestión administrativa.
            </p>
          </div>
          
          <div className="rounded-lg bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-[#FF6E00]/30 hover:shadow-sm transition-all duration-200" style={{ padding: dimensions.spacing.md }}>
            <div className="flex items-center" style={{ gap: dimensions.spacing.xs, marginBottom: dimensions.spacing.sm }}>
              <div className="rounded-full bg-[#FF6E00]" style={{ width: scale(8), height: scale(8) }}></div>
        <h3 
          className={`${COLOR_CLASSES.textPrimary} font-semibold`}
                style={{ fontSize: dimensions.fontSize.lg }}
              >
                Iniciativas
              </h3>
            </div>
            <p 
              className={COLOR_CLASSES.textSecondary}
          style={{ 
                fontSize: dimensions.fontSize.sm,
                lineHeight: '1.6'
              }}
            >
              Proyectos e iniciativas en desarrollo y ejecución.
            </p>
          </div>
          
          <div className="rounded-lg bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-[#5D5A88]/30 hover:shadow-sm transition-all duration-200" style={{ padding: dimensions.spacing.md }}>
            <div className="flex items-center" style={{ gap: dimensions.spacing.xs, marginBottom: dimensions.spacing.sm }}>
              <div className="rounded-full bg-[#FF6E00]" style={{ width: scale(8), height: scale(8) }}></div>
              <h3 
                className={`${COLOR_CLASSES.textPrimary} font-semibold`}
                style={{ fontSize: dimensions.fontSize.lg }}
              >
                Galería
        </h3>
            </div>
        <p 
          className={COLOR_CLASSES.textSecondary}
          style={{ 
                fontSize: dimensions.fontSize.sm,
                lineHeight: '1.6'
              }}
            >
              Colección de imágenes, documentos y recursos multimedia.
            </p>
          </div>
        </div>
      </div>

      {/* Sección: Consejos y Mejores Prácticas */}
      <div 
        className="bg-gradient-to-r from-[#FF6E00]/5 to-[#5D5A88]/5 rounded-lg"
        style={{
          padding: dimensions.spacing.xl,
          marginBottom: dimensions.spacing['2xl']
        }}
      >
        <div className="flex items-center" style={{ gap: dimensions.spacing.sm, marginBottom: dimensions.spacing.lg }}>
          <div 
            className="rounded-full bg-[#FF6E00] bg-opacity-20 flex items-center justify-center"
            style={{
              width: dimensions.spacing.xl,
              height: dimensions.spacing.xl
            }}
          >
            <HelpCircle size={scale(24)} className={COLOR_CLASSES.primary} />
          </div>
          <h2 
            className={`${COLOR_CLASSES.textPrimary} font-semibold`}
            style={{ fontSize: dimensions.fontSize['2xl'] }}
          >
            Consejos y Mejores Prácticas
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: dimensions.spacing.lg }}>
          <div>
            <h3 
              className={`${COLOR_CLASSES.textPrimary} font-semibold flex items-center`}
              style={{ fontSize: dimensions.fontSize.lg, marginBottom: dimensions.spacing.sm, gap: dimensions.spacing.sm }}
            >
              <Info size={scale(20)} className="text-[#FF6E00]" />
              Consejos de Navegación
            </h3>
            <ul 
              className="space-y-2"
              style={{ fontSize: dimensions.fontSize.sm, color: '#6B7280' }}
            >
              <li>• Usa la búsqueda global para encontrar contenido rápidamente</li>
              <li>• Los íconos de edición y eliminación solo aparecen si tienes permisos</li>
              <li>• El menú hamburguesa en móvil muestra enlaces públicos en páginas públicas</li>
              <li>• Siempre puedes volver al inicio desde el logo o menú</li>
            </ul>
          </div>
          
          <div>
            <h3 
              className={`${COLOR_CLASSES.textPrimary} font-semibold flex items-center`}
              style={{ fontSize: dimensions.fontSize.lg, marginBottom: dimensions.spacing.sm, gap: dimensions.spacing.sm }}
            >
              <Lock size={scale(20)} className="text-[#5D5A88]" />
              Seguridad
            </h3>
            <ul 
              className="space-y-2"
              style={{ fontSize: dimensions.fontSize.sm, color: '#6B7280' }}
            >
              <li>• Cierra sesión cuando termines de usar la plataforma</li>
              <li>• No compartas tus credenciales de acceso</li>
              <li>• Los recursos eliminados se pueden restaurar si es necesario</li>
              <li>• Contacta al administrador si tienes problemas de acceso</li>
            </ul>
          </div>
        </div>
        
        <div 
          className="mt-6 p-4 bg-white rounded-lg border border-[#FF6E00]/20"
          style={{ marginTop: dimensions.spacing.md }}
        >
          <div className="flex items-center" style={{ gap: dimensions.spacing.sm }}>
            <AlertCircle size={scale(20)} className="text-[#FF6E00]" />
            <span 
              className="font-semibold text-[#5D5A88]"
              style={{ fontSize: dimensions.fontSize.sm }}
            >
              ¿Necesitas más ayuda?
            </span>
          </div>
          <p 
            className="text-[#6B7280] mt-2"
            style={{ 
              fontSize: dimensions.fontSize.sm,
              lineHeight: '1.6'
            }}
          >
            Si tienes preguntas específicas o necesitas asistencia técnica, contacta al administrador del sistema o revisa la documentación adicional disponible en tu organización.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManualUsuario;

