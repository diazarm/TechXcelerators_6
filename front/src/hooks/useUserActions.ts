import { useState } from 'react';
import { userService } from '../services';
import { useNotification } from './useNotification';
import type { IUser } from '../services/userService';

/**
 * Hook para acciones de usuario
 * Maneja cambio de roles y toggle de estado
 */
export const useUserActions = () => {
  const { addNotification } = useNotification();
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const handleRoleChange = async (userId: string, users: IUser[]) => {
    if (actionLoading) return;
    
    const user = users.find(u => u._id === userId);
    if (!user) return;
    
    setSelectedUser(user);
    setShowRoleModal(true);
  };

  const confirmRoleChange = async (users: IUser[], setUsers: React.Dispatch<React.SetStateAction<IUser[]>>) => {
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

  const handleStatusChange = async (userId: string, users: IUser[]) => {
    if (actionLoading) return;
    
    const user = users.find(u => u._id === userId);
    if (!user) return;
    
    setSelectedUser(user);
    setShowStatusModal(true);
  };

  const confirmStatusChange = async (users: IUser[], setUsers: React.Dispatch<React.SetStateAction<IUser[]>>) => {
    if (!selectedUser) return;
    
    try {
      setActionLoading(selectedUser._id);
      
      await userService.toggleUserStatus(selectedUser._id);
      
      // Actualizar el estado local
      setUsers(prevUsers => 
        prevUsers.map(u => 
          u._id === selectedUser._id 
            ? { ...u, isActive: !u.isActive }
            : u
        )
      );
      
      addNotification({
        type: 'success',
        message: `Usuario ${selectedUser.isActive ? 'desactivado' : 'activado'}`
      });
    } catch (error) {
      console.error('Error cambiando estado:', error);
      addNotification({
        type: 'error',
        message: 'Error al cambiar estado'
      });
    } finally {
      setActionLoading(null);
      setShowStatusModal(false);
      setSelectedUser(null);
    }
  };

  return {
    actionLoading,
    showRoleModal,
    showStatusModal,
    selectedUser,
    setShowRoleModal,
    setShowStatusModal,
    setSelectedUser,
    handleRoleChange,
    confirmRoleChange,
    handleStatusChange,
    confirmStatusChange
  };
};
