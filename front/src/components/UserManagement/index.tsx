import React, { useState, useEffect } from 'react';
import { Users, EyeOff, UserCheck } from 'react-feather';
import { useScreenSize } from '../../context';
import { userService } from '../../services';
import { useNotification } from '../../hooks';
import LoadingSpinner from '../LoadingSpinner';
import { RoleChangeModal } from '../RoleChangeModal';
import type { IUser } from '../../services/userService';

interface UserManagementProps {
  className?: string;
}

/**
 * Componente para gestión de usuarios
 * Permite cambiar roles y activar/desactivar usuarios
 */
export const UserManagement: React.FC<UserManagementProps> = ({ 
  className = '' 
}) => {
  const { dimensions, scale } = useScreenSize();
  const { addNotification } = useNotification();
  
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  // Cargar usuarios al montar el componente
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const usersData = await userService.getUsers();
      // Filtrar usuarios admin ya que no se pueden modificar
      const nonAdminUsers = usersData.filter(user => !user.isAdmin);
      setUsers(nonAdminUsers);
    } catch (error) {
      console.error('Error cargando usuarios:', error);
      addNotification({
        type: 'error',
        message: 'Error al cargar usuarios'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string) => {
    if (actionLoading) return;
    
    const user = users.find(u => u._id === userId);
    if (!user) return;
    
    setSelectedUser(user);
    setShowRoleModal(true);
  };

  const confirmRoleChange = async () => {
    if (!selectedUser) return;
    
    try {
      setActionLoading(selectedUser._id);
      const newRole = selectedUser.role === 'director' ? 'user' : 'director';
      
      await userService.changeUserRole(selectedUser._id);
      
      // Actualizar el estado local
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user._id === selectedUser._id 
            ? { ...user, role: newRole }
            : user
        )
      );
      
      addNotification({
        type: 'success',
        message: `Rol cambiado a ${newRole === 'director' ? 'Director' : 'Usuario'}`
      });
    } catch (error) {
      console.error('Error cambiando rol:', error);
      addNotification({
        type: 'error',
        message: 'Error al cambiar rol'
      });
    } finally {
      setActionLoading(null);
      setShowRoleModal(false);
      setSelectedUser(null);
    }
  };

  const handleToggleStatus = async (userId: string) => {
    if (actionLoading) return;
    
    const user = users.find(u => u._id === userId);
    if (!user) return;
    
    try {
      setActionLoading(userId);
      
      await userService.toggleUserStatus(userId);
      
      // Actualizar el estado local
      setUsers(prevUsers => 
        prevUsers.map(u => 
          u._id === userId 
            ? { ...u, isActive: !u.isActive }
            : u
        )
      );
      
      addNotification({
        type: 'success',
        message: `Usuario ${user.isActive ? 'desactivado' : 'activado'}`
      });
    } catch (error) {
      console.error('Error cambiando estado:', error);
      addNotification({
        type: 'error',
        message: 'Error al cambiar estado'
      });
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div 
        className="text-center py-8 text-gray-500"
        style={{
          paddingTop: dimensions.spacing.xl,
          paddingBottom: dimensions.spacing.xl
        }}
      >
        <Users 
          size={scale(48)} 
          className="mx-auto mb-4 text-gray-400" 
        />
        <p style={{ fontSize: dimensions.fontSize.md }}>
          No hay usuarios registrados
        </p>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      {/* Tabla de usuarios - Completamente responsiva */}
      <div 
        className="overflow-x-auto rounded-lg border border-gray-200"
        style={{
          borderRadius: scale(8)
        }}
      >
        <table className="w-full border-collapse bg-white min-w-full">
          <thead>
            <tr 
              className="bg-gradient-to-r from-[#F5F4F8] to-[#E8E6F0] border-b border-gray-200"
            >
              <th 
                className="text-left font-semibold text-[#5D5A88] py-4 px-6"
                style={{
                  fontSize: dimensions.fontSize.md,
                  paddingTop: dimensions.spacing.md,
                  paddingBottom: dimensions.spacing.md,
                  paddingLeft: dimensions.spacing.lg,
                  paddingRight: dimensions.spacing.lg
                }}
              >
                Usuario
              </th>
              <th 
                className="text-left font-semibold text-[#5D5A88] py-4 px-6"
                style={{
                  fontSize: dimensions.fontSize.md,
                  paddingTop: dimensions.spacing.md,
                  paddingBottom: dimensions.spacing.md,
                  paddingLeft: dimensions.spacing.lg,
                  paddingRight: dimensions.spacing.lg
                }}
              >
                Email
              </th>
              <th 
                className="text-left font-semibold text-[#5D5A88] py-4 px-6"
                style={{
                  fontSize: dimensions.fontSize.md,
                  paddingTop: dimensions.spacing.md,
                  paddingBottom: dimensions.spacing.md,
                  paddingLeft: dimensions.spacing.lg,
                  paddingRight: dimensions.spacing.lg
                }}
              >
                Rol
              </th>
              <th 
                className="text-left font-semibold text-[#5D5A88] py-4 px-6"
                style={{
                  fontSize: dimensions.fontSize.md,
                  paddingTop: dimensions.spacing.md,
                  paddingBottom: dimensions.spacing.md,
                  paddingLeft: dimensions.spacing.lg,
                  paddingRight: dimensions.spacing.lg
                }}
              >
                Estado
              </th>
              <th 
                className="text-center font-semibold text-[#5D5A88] py-4 px-6"
                style={{
                  fontSize: dimensions.fontSize.md,
                  paddingTop: dimensions.spacing.md,
                  paddingBottom: dimensions.spacing.md,
                  paddingLeft: dimensions.spacing.lg,
                  paddingRight: dimensions.spacing.lg
                }}
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
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
                      onClick={() => handleRoleChange(user._id)}
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
                    {user.isActive ? (
                      <div 
                        onClick={() => handleToggleStatus(user._id)}
                        className="cursor-pointer"
                        title="Desactivar usuario"
                      >
                        <EyeOff 
                          size={scale(16)} 
                          className="text-[#5D5A88] hover:text-red-600 transition-colors" 
                        />
                      </div>
                    ) : (
                      <div 
                        onClick={() => handleToggleStatus(user._id)}
                        className="cursor-pointer"
                        title="Activar usuario"
                      >
                        <UserCheck 
                          size={scale(16)} 
                          className="text-[#5D5A88] hover:text-green-600 transition-colors" 
                        />
                      </div>
                    )}
                    <span className="text-gray-500 text-xs hidden lg:block">
                      {user.isActive ? 'Desactivar' : 'Activar'}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de confirmación de cambio de rol */}
      {showRoleModal && selectedUser && (
        <RoleChangeModal
          isOpen={showRoleModal}
          onClose={() => {
            setShowRoleModal(false);
            setSelectedUser(null);
          }}
          onConfirm={confirmRoleChange}
          userName={selectedUser.name}
          currentRole={selectedUser.role === 'director' ? 'Director' : 'Usuario'}
          newRole={selectedUser.role === 'director' ? 'Usuario' : 'Director'}
          loading={actionLoading === selectedUser._id}
        />
      )}
    </div>
  );
};