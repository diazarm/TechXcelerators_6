import React, { useEffect } from 'react';
import { BookOpen, Video, FileText, HelpCircle } from 'react-feather';
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
      {/* Header */}
      <div 
        className="text-center"
        style={{
          paddingTop: dimensions.spacing['2xl'],
          paddingBottom: dimensions.spacing.xl
        }}
      >
        <div className="flex items-center justify-center" style={{ gap: dimensions.spacing.sm, marginBottom: dimensions.spacing.md }}>
          <BookOpen 
            size={scale(32)} 
            className={COLOR_CLASSES.primary}
          />
          <h1 
            className={`${COLOR_CLASSES.textPrimary} font-bold`}
            style={{ fontSize: dimensions.fontSize['3xl'] }}
          >
            Manual de Usuario
          </h1>
        </div>
        <p 
          className={COLOR_CLASSES.textSecondary}
          style={{ 
            fontSize: dimensions.fontSize.lg,
            maxWidth: `${scale(600)}px`,
            margin: '0 auto'
          }}
        >
          Guía completa para utilizar la plataforma Scala Learning
        </p>
      </div>

      {/* Cards de contenido */}
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        style={{ 
          gap: dimensions.spacing.xl,
          paddingBottom: dimensions.spacing['3xl']
        }}
      >
        {/* Card 1: Introducción */}
        <div 
          className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all"
          style={{ padding: dimensions.spacing.lg }}
        >
          <div className="flex items-center" style={{ gap: dimensions.spacing.sm, marginBottom: dimensions.spacing.md }}>
            <div 
              className="rounded-full bg-[#FF6E00] bg-opacity-10 flex items-center justify-center"
              style={{
                width: dimensions.spacing.xl,
                height: dimensions.spacing.xl
              }}
            >
              <HelpCircle size={scale(24)} className={COLOR_CLASSES.primary} />
            </div>
            <h2 
              className={`${COLOR_CLASSES.textPrimary} font-semibold`}
              style={{ fontSize: dimensions.fontSize.xl }}
            >
              Introducción
            </h2>
          </div>
          <p 
            className={COLOR_CLASSES.textSecondary}
            style={{ 
              fontSize: dimensions.fontSize.sm,
              lineHeight: '1.6'
            }}
          >
            Aprende los conceptos básicos de la plataforma, cómo navegar por las diferentes secciones y cómo aprovechar al máximo todas las funcionalidades disponibles.
          </p>
        </div>

        {/* Card 2: Guía de Inicio */}
        <div 
          className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all"
          style={{ padding: dimensions.spacing.lg }}
        >
          <div className="flex items-center" style={{ gap: dimensions.spacing.sm, marginBottom: dimensions.spacing.md }}>
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
              style={{ fontSize: dimensions.fontSize.xl }}
            >
              Guía de Inicio
            </h2>
          </div>
          <p 
            className={COLOR_CLASSES.textSecondary}
            style={{ 
              fontSize: dimensions.fontSize.sm,
              lineHeight: '1.6'
            }}
          >
            Pasos detallados para comenzar a usar la plataforma. Desde tu primer inicio de sesión hasta la gestión de recursos y colaboración con tu equipo.
          </p>
        </div>

        {/* Card 3: Tutoriales en Video */}
        <div 
          className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all"
          style={{ padding: dimensions.spacing.lg }}
        >
          <div className="flex items-center" style={{ gap: dimensions.spacing.sm, marginBottom: dimensions.spacing.md }}>
            <div 
              className="rounded-full bg-[#FF6E00] bg-opacity-10 flex items-center justify-center"
              style={{
                width: dimensions.spacing.xl,
                height: dimensions.spacing.xl
              }}
            >
              <Video size={scale(24)} className={COLOR_CLASSES.primary} />
            </div>
            <h2 
              className={`${COLOR_CLASSES.textPrimary} font-semibold`}
              style={{ fontSize: dimensions.fontSize.xl }}
            >
              Tutoriales en Video
            </h2>
          </div>
          <p 
            className={COLOR_CLASSES.textSecondary}
            style={{ 
              fontSize: dimensions.fontSize.sm,
              lineHeight: '1.6'
            }}
          >
            Aprende de forma visual con tutoriales paso a paso en video que te guiarán por las principales funcionalidades de la plataforma.
          </p>
        </div>
      </div>

      {/* Sección de próximamente */}
      <div 
        className="bg-gray-50 rounded-lg text-center"
        style={{
          padding: dimensions.spacing['2xl'],
          marginBottom: dimensions.spacing['2xl']
        }}
      >
        <BookOpen 
          size={scale(48)} 
          className={`${COLOR_CLASSES.textSecondary} mx-auto`}
          style={{ marginBottom: dimensions.spacing.md }}
        />
        <h3 
          className={`${COLOR_CLASSES.textPrimary} font-semibold`}
          style={{ 
            fontSize: dimensions.fontSize['2xl'],
            marginBottom: dimensions.spacing.sm
          }}
        >
          Contenido en Desarrollo
        </h3>
        <p 
          className={COLOR_CLASSES.textSecondary}
          style={{ 
            fontSize: dimensions.fontSize.md,
            maxWidth: `${scale(500)}px`,
            margin: '0 auto'
          }}
        >
          Estamos trabajando en crear documentación completa y detallada para ayudarte a aprovechar al máximo la plataforma. Próximamente encontrarás aquí guías paso a paso, tutoriales en video y recursos descargables.
        </p>
      </div>
    </div>
  );
};

export default ManualUsuario;

