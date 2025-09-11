import React from "react";
import { Link } from "react-router-dom";
import type { ResourceDropdownProps } from "./types";
import { COLOR_CLASSES } from "../../constants";

const ResourceDropdown: React.FC<ResourceDropdownProps> = ({
  isOpen,
  onToggle,
  responsive,
  resources,
  loading,
}) => {
  return (
    <div className="relative">
      <div
        onClick={onToggle}
        className={`flex items-center gap-1 ${COLOR_CLASSES.textPrimary} hover:text-[#4A476F] transition-colors font-medium ${responsive.text.small} cursor-pointer`}
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
        <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="py-2">
            {loading ? (
              <div className={`px-3 sm:px-4 py-2 text-gray-400 ${responsive.text.xsmall} sm:text-sm`}>
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
                      className={`block px-3 sm:px-4 py-2 ${COLOR_CLASSES.textPrimary} hover:bg-gray-100 transition-colors ${responsive.text.xsmall} sm:text-sm`}
                    >
                      {res.name}
                    </Link>
                  ))}

                {resources.length > 5 && (
                  <Link
                    to="/resources"
                    className={`block px-3 sm:px-4 py-2 ${COLOR_CLASSES.textPrimary} hover:text-indigo-600 hover:bg-gray-100 transition-colors font-medium ${responsive.text.xsmall} sm:text-sm`}
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
