import { useState, useEffect } from 'react';
import { userService } from '../services';
import { useNotification } from './useNotification';
import type { IUser } from '../services/userService';

/**
 * Hook para gestión de usuarios
 * Maneja el estado y carga de usuarios (excluyendo admins)
 */
export const useUserManagement = () => {
  const { addNotification } = useNotification();
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    loadUsers();
  }, []);

  return {
    users,
    loading,
    setUsers,
    loadUsers
  };
};
