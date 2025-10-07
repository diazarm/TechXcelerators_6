import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Plus, UserPlus, RotateCcw } from "react-feather";
import { useHeader, useAuth } from "../../hooks";
import { useScreenSize } from "../../context";
import { SearchBar, Button } from "../../components";
import { getUserPermissions } from "../../utils";
import { useResourceRestoration } from "../../hooks/useResourceRestoration";
import { ResourceRestoreModal } from "../ResourceRestoreModal";
import type { HeaderProps } from "./types";


export const Header: React.FC<HeaderProps> = ({ title }) => {
  const { getContainerForScreen, dimensions, isMobile } = useScreenSize();
  const { header } = useHeader();
  const { user } = useAuth();
  const location = useLocation();
  const [restoreModalOpen, setRestoreModalOpen] = useState(false);

  // Verificar si el usuario puede crear usuarios (solo admin)
  const permissions = user ? getUserPermissions(user) : null;
  const canCreateUsers = permissions?.canCreateUsers ?? false;
  const canRestoreResources = permissions?.canRestoreResources ?? false;

  // Hook para restaurar recursos (optimizado para no cargar automáticamente)
  const resourceRestoration = useResourceRestoration();

  // Determinar qué botones mostrar según la página
  const isDashboard = location.pathname === '/dashboard';
  const isAlianzaOrGobernanza = location.pathname === '/alianza' || location.pathname === '/gobernanza';
  
  const shouldShowCreateUserButton = canCreateUsers && isDashboard;
  
  // Cargar recursos eliminados si estamos en una página que puede restaurar
  useEffect(() => {
    if (canRestoreResources && isAlianzaOrGobernanza) {
      resourceRestoration.loadDeletedResources();
    }
  }, [canRestoreResources, isAlianzaOrGobernanza, resourceRestoration.loadDeletedResources]);

  // Mostrar botón de restaurar solo si hay recursos eliminados
  const shouldShowRestoreButton = canRestoreResources && isAlianzaOrGobernanza && resourceRestoration.hasDeletedResources;

  return (
    <header className="bg-white">
      {/* SearchBar y Botón Crear Usuario */}
      <div className="bg-white py-2">
        <div className={`${getContainerForScreen()}`}>
          {isMobile ? (
            /* Layout móvil */
            <div className="flex items-center">
              {/* Espacio izquierdo para balancear */}
              <div className="flex-1"></div>
              
              {/* SearchBar centrada */}
              <div className="flex justify-center">
                <SearchBar />
              </div>
              
              {/* Espacio derecho con botones o espacio vacío */}
              <div className="flex-1 flex justify-end gap-2">
                {/* Botón de restaurar recursos en móvil - solo en Alianza/Gobernanza */}
                {shouldShowRestoreButton && (
                  <Button
                    variant="secondary"
                    size="xs"
                    iconLeft={<RotateCcw size={16} />}
                    onClick={() => setRestoreModalOpen(true)}
                  >
                  </Button>
                )}
                
                {/* Botón de crear usuario en móvil - SOLO en Dashboard */}
                {shouldShowCreateUserButton && (
                  <Link to="/register">
                    <Button
                      variant="primary"
                      size="xs"
                      iconLeft={<UserPlus size={16} color="white" />}
                    >
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ) : (
            /* Layout desktop */
            <div className="flex items-center">
              {/* Espacio izquierdo para balancear */}
              <div className="flex-1"></div>
              
              {/* SearchBar centrada */}
              <div className="flex justify-center">
                <SearchBar />
              </div>
              
              {/* Espacio derecho con botones o espacio vacío */}
              <div className="flex-1 flex justify-end gap-3">
                {/* Botón de restaurar recursos - Solo visible en Alianza/Gobernanza */}
                {shouldShowRestoreButton && (
                  <Button
                    variant="secondary"
                    size="md"
                    iconLeft={<RotateCcw size={18} />}
                    onClick={() => setRestoreModalOpen(true)}
                  >
                    Restaurar
                  </Button>
                )}
                
                {/* Botón de crear usuario - SOLO en Dashboard */}
                {shouldShowCreateUserButton && (
                  <Link to="/register">
                    <Button
                      variant="primary"
                      size="md"
                      iconLeft={<Plus size={18} />}
                    >
                      Crear usuario
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Título después */}
      <div 
        className={`${getContainerForScreen()}`}
        style={{
          paddingTop: dimensions.spacing['2xl'],
          paddingBottom: dimensions.spacing.xl
        }}
      >
        <div className="flex justify-center">
          <h1 
            className="text-[#585D8A] font-bold mb-4 text-center"
            style={{
              width: dimensions.spacing.xl + ' * 24',
              height: dimensions.spacing.lg,
              fontSize: isMobile ? dimensions.fontSize.xl : dimensions.fontSize['2xl'],
              lineHeight: dimensions.spacing.lg
            }}
          >
            {header.title || title || ''}
          </h1>
        </div>
      </div>

      {/* Modal de Restauración de Recursos */}
      <ResourceRestoreModal
        isOpen={restoreModalOpen}
        onClose={() => setRestoreModalOpen(false)}
        deletedResources={resourceRestoration.deletedResources}
        loading={resourceRestoration.loading}
        restoreLoading={resourceRestoration.restoreLoading}
        onRestoreResource={resourceRestoration.handleRestoreResource}
      />
    </header>
  );
};