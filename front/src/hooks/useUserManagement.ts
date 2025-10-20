import { useState, useEffect } from 'react';
import { userService } from '../services';
import { useNotification } from './useNotification';
import { useScreenSize } from '../context';
import type { IUser } from '../services/userService';

/**
 * Hook para gestión de usuarios con paginación
 * Maneja el estado y carga de usuarios (excluyendo admins)
 */
export const useUserManagement = () => {
  const { addNotification } = useNotification();
  const { isMobile } = useScreenSize();
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Límites diferentes para móvil y desktop
  const itemsPerPage = isMobile ? 5 : 10;

  const loadUsers = async () => {
    try {
      setLoading(true);
      const usersData = await userService.getUsers();
      // Filtrar usuarios admin ya que no se pueden modificar
      const nonAdminUsers = usersData.filter(user => !user.isAdmin);
      setUsers(nonAdminUsers);
      // Resetear a la primera página cuando se cargan nuevos usuarios
      setCurrentPage(1);
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

  // Calcular usuarios paginados
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = users.slice(startIndex, endIndex);

  // Cambiar página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Actualizar usuarios cuando cambie el breakpoint
  useEffect(() => {
    const newTotalPages = Math.ceil(users.length / itemsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
  }, [isMobile, users.length, itemsPerPage, currentPage]);

  useEffect(() => {
    loadUsers();
  }, []);

  return {
    users: paginatedUsers,
    allUsers: users,
    loading,
    setUsers,
    loadUsers,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems: users.length,
    handlePageChange
  };
};
