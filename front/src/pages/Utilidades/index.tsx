import React, { useEffect } from 'react';
import { Users, Settings, UserCheck } from 'react-feather';
import { useScreenSize } from '../../context';
import { COLOR_CLASSES } from '../../constants';
import { UserManagement } from '../../components/';

/**
 * Página de Utilidades - Gestión de usuarios y documentos
 * Diseño consistente con Manual de Usuario pero con autenticación requerida
 */
const Utilidades: React.FC = () => {
  const { dimensions, scale, getContainerForScreen } = useScreenSize();

  useEffect(() => {
    // Configurar título de la página
    document.title = 'Utilidades - Scala Learning';
  }, []);

  return (
    <div className={`${getContainerForScreen()}`}>
      {/* Header con banner */}
      <div 
        className="text-center bg-gradient-to-r from-[#5D5A88]/5 via-[#FF6E00]/5 to-[#5D5A88]/5 shadow-sm rounded-2xl border border-gray-100"
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
            <Settings size={scale(16)} className="text-white" />
          </div>

          {/* Título responsivo */}
          <h1 
            className={`${COLOR_CLASSES.textPrimary} font-bold`}
            style={{ fontSize: dimensions.fontSize['2xl'] }}
          >
            Utilidades
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
          Gestión administrativa del sistema
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
          Administra usuarios, roles y configuraciones del sistema
        </p>
      </div>

      {/* Sección: Información sobre permisos */}
      <div 
        className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-[#FF6E00]/20 transition-all duration-300"
        style={{ 
          padding: dimensions.spacing.xl,
          marginBottom: dimensions.spacing.xl
        }}
      >
        <div className="flex items-center" style={{ gap: dimensions.spacing.sm, marginBottom: dimensions.spacing.lg }}>
          <UserCheck size={scale(24)} className="text-[#5D5A88]" />
          <h2 
            className={`${COLOR_CLASSES.textPrimary} font-semibold`}
            style={{ fontSize: dimensions.fontSize['2xl'] }}
          >
            Permisos de Administrador
          </h2>
        </div>
        <p 
          className="text-[#5D5A88]"
          style={{ 
            fontSize: dimensions.fontSize.sm,
            lineHeight: '1.6'
          }}
        >
          Solo los administradores pueden acceder a esta sección. Aquí puedes gestionar usuarios, cambiar roles y controlar el acceso al sistema.
        </p>
      </div>

      {/* Sección: Gestión de Usuarios */}
      <div 
        className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-[#FF6E00]/20 transition-all duration-300"
        style={{ 
          padding: dimensions.spacing.xl,
          marginBottom: dimensions.spacing.xl
        }}
      >
        <div className="flex items-center" style={{ gap: dimensions.spacing.sm, marginBottom: dimensions.spacing.lg }}>
          <Users size={scale(24)} className={COLOR_CLASSES.primary} />
          <h2 
            className={`${COLOR_CLASSES.textPrimary} font-semibold`}
            style={{ fontSize: dimensions.fontSize['2xl'] }}
          >
            Gestión de Usuarios
          </h2>
        </div>
        <p 
          className={COLOR_CLASSES.textSecondary}
          style={{ 
            fontSize: dimensions.fontSize.sm,
            marginBottom: dimensions.spacing.lg,
            lineHeight: '1.6'
          }}
        >
          Administra roles y estados de los usuarios del sistema
        </p>
        
        {/* Tabla de usuarios */}
        <UserManagement />
      </div>
    </div>
  );
};

export default Utilidades;