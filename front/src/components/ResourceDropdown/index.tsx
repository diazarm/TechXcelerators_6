import React from "react";
import { Link } from "react-router-dom";
import { useScreenSize } from "../../context";
import type { ResourceDropdownProps } from "./types";
import { COLOR_CLASSES } from "../../constants";

const ResourceDropdown: React.FC<ResourceDropdownProps> = ({
  isOpen,
  onToggle,
  resources,
  loading,
}) => {
  const { dimensions, scale } = useScreenSize();
  return (
    <div className="relative">
      <div
        onClick={onToggle}
        className={`flex items-center gap-1 ${COLOR_CLASSES.textPrimary} hover:text-[#4A476F] transition-colors font-medium cursor-pointer`}
        style={{ fontSize: dimensions.fontSize.sm }}
      >
        Recursos
        <svg
          className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {isOpen && (
        <div 
          className="absolute top-full bg-white border border-gray-200 rounded-lg shadow-lg z-50"
          style={{
            right: 0,
            marginTop: dimensions.spacing.xs,
            width: 'auto', // Se ajusta al contenido
            minWidth: `${scale(180)}px`, // Mínimo para los textos largos
            maxWidth: '90vw' // Nunca excede el viewport
          }}
        >
          <div style={{ paddingTop: dimensions.spacing.xs, paddingBottom: dimensions.spacing.xs }}>
            {loading ? (
              <div 
                className="text-gray-400"
                style={{
                  paddingLeft: dimensions.spacing.md,
                  paddingRight: dimensions.spacing.md,
                  paddingTop: dimensions.spacing.xs,
                  paddingBottom: dimensions.spacing.xs,
                  fontSize: dimensions.fontSize.xs
                }}
              >
                Cargando recursos...
              </div>
            ) : (
              <>
                {resources
                  .filter((res) => res.isActive)
                  .slice(0, 5)
                  .map((res) => (
                    <Link
                      key={res._id}
                      to={res.link}
                      className={`${COLOR_CLASSES.textPrimary} hover:bg-gray-100 transition-colors block`}
                      style={{
                        paddingLeft: dimensions.spacing.md,
                        paddingRight: dimensions.spacing.md,
                        paddingTop: dimensions.spacing.xs,
                        paddingBottom: dimensions.spacing.xs,
                        fontSize: dimensions.fontSize.xs
                      }}
                    >
                      {res.name}
                    </Link>
                  ))}

                {resources.length > 5 && (
                  <Link
                    to="/resources"
                    className={`${COLOR_CLASSES.textPrimary} hover:text-indigo-600 hover:bg-gray-100 transition-colors font-medium block`}
                    style={{
                      paddingLeft: dimensions.spacing.md,
                      paddingRight: dimensions.spacing.md,
                      paddingTop: dimensions.spacing.xs,
                      paddingBottom: dimensions.spacing.xs,
                      fontSize: dimensions.fontSize.xs
                    }}
                  >
                    Ver más...
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceDropdown;
