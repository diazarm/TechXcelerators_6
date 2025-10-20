import React from 'react';
import { EyeOff, RotateCcw } from 'react-feather';
import { useScreenSize } from '../../context';
import type { IUser } from '../../services/userService';

interface UserTableRowProps {
  user: IUser;
  actionLoading: string | null;
  onRoleChange: (userId: string) => void;
  onStatusChange: (userId: string) => void;
}

/**
 * Fila individual de la tabla de usuarios
 * Componente extraído sin cambios visuales
 */
export const UserTableRow: React.FC<UserTableRowProps> = ({
  user,
  actionLoading,
  onRoleChange,
  onStatusChange
}) => {
  const { scale, isMobile } = useScreenSize();

  return (
    <tr 
      key={user._id} 
      className="hover:bg-gray-50 transition-colors"
      style={{
        borderBottomWidth: scale(1),
        borderBottomColor: '#F3F4F6'
      }}
    >
      <td 
        style={{
          paddingTop: isMobile ? scale(6) : scale(8),
          paddingBottom: isMobile ? scale(6) : scale(8),
          paddingLeft: isMobile ? scale(8) : scale(12),
          paddingRight: isMobile ? scale(8) : scale(12)
        }}
      >
        <div 
          className="flex items-center"
          style={{ gap: scale(3) }}
        >
          <div 
            className="bg-[#5D5A88] rounded-full flex items-center justify-center"
            style={{
              width: scale(12),
              height: scale(12),
              minWidth: scale(12),
              minHeight: scale(12)
            }}
          >
            <span 
              className="text-white font-semibold"
              style={{
                fontSize: scale(8)
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <div className="flex items-center" style={{ gap: scale(8) }}>
              <span 
                className="font-medium text-gray-900"
                style={{ fontSize: scale(14) }}
              >
                {user.name}
              </span>
            </div>
          </div>
        </div>
      </td>
      <td 
        style={{
          paddingTop: isMobile ? scale(6) : scale(8),
          paddingBottom: isMobile ? scale(6) : scale(8),
          paddingLeft: isMobile ? scale(8) : scale(12),
          paddingRight: isMobile ? scale(8) : scale(12)
        }}
      >
        <p 
          className="text-gray-600"
          style={{ fontSize: scale(14) }}
        >
          {user.email}
        </p>
      </td>
      <td 
        style={{
          paddingTop: isMobile ? scale(6) : scale(8),
          paddingBottom: isMobile ? scale(6) : scale(8),
          paddingLeft: isMobile ? scale(8) : scale(12),
          paddingRight: isMobile ? scale(8) : scale(12)
        }}
      >
        <div 
          className="flex items-center"
          style={{ gap: scale(8) }}
        >
          <button
            onClick={() => onRoleChange(user._id)}
            disabled={actionLoading === user._id}
            className={`relative inline-flex items-center rounded-full transition-colors duration-200 focus:outline-none ${
              user.role === 'director' ? 'bg-[#5D5A88]' : 'bg-gray-300'
            } ${actionLoading === user._id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            style={{
              height: scale(20),
              width: scale(36)
            }}
            title={`Cambiar rol a ${user.role === 'director' ? 'Usuario' : 'Director'}`}
          >
            <span
              className={`rounded-full bg-white transition-transform duration-200 ${
                user.role === 'director' ? 'translate-x-4' : 'translate-x-0'
              }`}
              style={{
                position: 'absolute',
                left: scale(2),
                top: scale(2),
                height: scale(16),
                width: scale(16)
              }}
            />
          </button>
          <span 
            className="text-gray-600 whitespace-nowrap"
            style={{ fontSize: scale(12) }}
          >
            {user.role === 'director' ? 'Director' : 'Usuario'}
          </span>
        </div>
      </td>
      <td 
        style={{
          paddingTop: isMobile ? scale(6) : scale(8),
          paddingBottom: isMobile ? scale(6) : scale(8),
          paddingLeft: isMobile ? scale(8) : scale(12),
          paddingRight: isMobile ? scale(8) : scale(12)
        }}
      >
        <span 
          className={`rounded-full font-medium whitespace-nowrap ${
            user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
          style={{ 
                fontSize: scale(10),
            paddingLeft: scale(8),
            paddingRight: scale(8),
            paddingTop: scale(4),
            paddingBottom: scale(4)
          }}
        >
          {user.isActive ? 'Activo' : 'Inactivo'}
        </span>
      </td>
      <td 
        className="py-4 px-6 text-center"
        style={{
          paddingTop: isMobile ? scale(6) : scale(8),
          paddingBottom: isMobile ? scale(6) : scale(8),
          paddingLeft: isMobile ? scale(8) : scale(12),
          paddingRight: isMobile ? scale(8) : scale(12)
        }}
      >
        <div 
          className="flex items-center justify-center"
          style={{ gap: scale(8) }}
        >
          <div 
            onClick={() => onStatusChange(user._id)}
            className="cursor-pointer flex items-center hover:bg-gray-100 rounded-lg transition-colors"
            style={{
              padding: scale(4),
              gap: scale(6)
            }}
            title={user.isActive ? 'Desactivar usuario' : 'Activar usuario'}
          >
            {user.isActive ? (
              <EyeOff 
                size={scale(14)} 
                className="text-[#5D5A88] hover:text-red-600 transition-colors" 
              />
            ) : (
              <RotateCcw 
                size={scale(14)} 
                className="text-[#5D5A88] hover:text-green-600 transition-colors" 
              />
            )}
            <span 
              className="text-gray-500 whitespace-nowrap"
              style={{ fontSize: scale(12) }}
            >
              {user.isActive ? 'Desactivar' : 'Activar'}
            </span>
          </div>
        </div>
      </td>
    </tr>
  );
};
