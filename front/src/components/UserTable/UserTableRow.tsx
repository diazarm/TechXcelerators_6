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
  const { dimensions, scale } = useScreenSize();

  return (
    <tr 
      key={user._id} 
      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
    >
      <td 
        className="py-4 px-6"
        style={{
          paddingTop: dimensions.spacing.md,
          paddingBottom: dimensions.spacing.md,
          paddingLeft: dimensions.spacing.lg,
          paddingRight: dimensions.spacing.lg
        }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="bg-[#5D5A88] rounded-full p-2"
            style={{
              padding: dimensions.spacing.sm
            }}
          >
            <span 
              className="text-white font-semibold"
              style={{
                fontSize: dimensions.fontSize.xs
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">{user.name}</span>
            </div>
          </div>
        </div>
      </td>
      <td 
        className="py-4 px-6"
        style={{
          paddingTop: dimensions.spacing.md,
          paddingBottom: dimensions.spacing.md,
          paddingLeft: dimensions.spacing.lg,
          paddingRight: dimensions.spacing.lg
        }}
      >
        <p className="text-gray-600">{user.email}</p>
      </td>
      <td 
        className="py-4 px-6"
        style={{
          paddingTop: dimensions.spacing.md,
          paddingBottom: dimensions.spacing.md,
          paddingLeft: dimensions.spacing.lg,
          paddingRight: dimensions.spacing.lg
        }}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={() => onRoleChange(user._id)}
            disabled={actionLoading === user._id}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#5D5A88] focus:ring-offset-2 ${
              user.role === 'director' ? 'bg-[#5D5A88]' : 'bg-gray-300'
            } ${actionLoading === user._id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            title={`Cambiar rol a ${user.role === 'director' ? 'Usuario' : 'Director'}`}
          >
            <span
              className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform duration-200 ${
                user.role === 'director' ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
          <span className="text-gray-600 text-xs">
            {user.role === 'director' ? 'Director' : 'Usuario'}
          </span>
        </div>
      </td>
      <td 
        className="py-4 px-6"
        style={{
          paddingTop: dimensions.spacing.md,
          paddingBottom: dimensions.spacing.md,
          paddingLeft: dimensions.spacing.lg,
          paddingRight: dimensions.spacing.lg
        }}
      >
        <span 
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {user.isActive ? 'Activo' : 'Inactivo'}
        </span>
      </td>
      <td 
        className="py-4 px-6 text-center"
        style={{
          paddingTop: dimensions.spacing.md,
          paddingBottom: dimensions.spacing.md,
          paddingLeft: dimensions.spacing.lg,
          paddingRight: dimensions.spacing.lg
        }}
      >
        <div className="flex items-center justify-center gap-2">
          <div 
            onClick={() => onStatusChange(user._id)}
            className="cursor-pointer flex items-center gap-2 hover:bg-gray-100 rounded-lg p-2 transition-colors"
            title={user.isActive ? 'Desactivar usuario' : 'Activar usuario'}
          >
            {user.isActive ? (
              <EyeOff 
                size={scale(16)} 
                className="text-[#5D5A88] hover:text-red-600 transition-colors" 
              />
            ) : (
              <RotateCcw 
                size={scale(16)} 
                className="text-[#5D5A88] hover:text-green-600 transition-colors" 
              />
            )}
            <span className="text-gray-500 text-xs">
              {user.isActive ? 'Desactivar' : 'Activar'}
            </span>
          </div>
        </div>
      </td>
    </tr>
  );
};
