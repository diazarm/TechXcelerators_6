import React from "react";
import { Link } from "react-router-dom";
import { Plus, UserPlus } from "react-feather";
import { useResponsive, useHeader, useAuth, useComponentDimensions, useBreakpoints } from "../../hooks";
import { SearchBar, Button } from "../../components";
import { getUserPermissions } from "../../utils";
import type { HeaderProps } from "./types";


export const Header: React.FC<HeaderProps> = ({ title }) => {
  const responsive = useResponsive();
  const dimensions = useComponentDimensions();
  const { isMobile } = useBreakpoints();
  const { header } = useHeader();
  const { user } = useAuth();

  // Verificar si el usuario puede crear usuarios (solo admin)
  const permissions = user ? getUserPermissions(user) : null;
  const canCreateUsers = permissions?.canCreateUsers ?? false;

  return (
    <header className="bg-white">
      {/* SearchBar y Botón Crear Usuario */}
      <div className="bg-white py-2">
        <div className={`${responsive.container}`}>
          {isMobile ? (
            /* Layout móvil */
            <div className="flex items-center">
              {/* Espacio izquierdo para balancear */}
              <div className="flex-1"></div>
              
              {/* SearchBar centrada */}
              <div className="flex justify-center">
                <SearchBar />
              </div>
              
              {/* Espacio derecho con botón o espacio vacío */}
              <div className="flex-1 flex justify-end">
                {/* Botón de crear usuario en móvil - pequeño y junto a la SearchBar */}
                {canCreateUsers && (
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
              
              {/* Espacio derecho con botón o espacio vacío */}
              <div className="flex-1 flex justify-end">
                {/* Botón de crear usuario - Solo visible para admin */}
                {canCreateUsers && (
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
      <div className={`${responsive.container} py-4`}>
        <div className="flex justify-center">
          <h1 
            className="text-[#585D8A] font-bold mb-4 text-center"
            style={{
              width: dimensions.spacing.xl + ' * 24',
              height: dimensions.spacing.lg,
              fontSize: dimensions.fontSize['2xl'],
              lineHeight: dimensions.spacing.lg
            }}
          >
            {header.title || title || ''}
          </h1>
        </div>
      </div>
    </header>
  );
};