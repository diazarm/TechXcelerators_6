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
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

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

  // Aplicar filtros
  const filteredUsers = users.filter(user => {
    const roleMatch = roleFilter === 'all' || user.role === roleFilter;
    const statusMatch = statusFilter === 'all' || 
      (statusFilter === 'active' && user.isActive) || 
      (statusFilter === 'inactive' && !user.isActive);
    return roleMatch && statusMatch;
  });

  // Calcular usuarios paginados
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  // Cambiar página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Cambiar filtros y resetear página
  const handleRoleFilterChange = (value: string) => {
    setRoleFilter(value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  // Actualizar usuarios cuando cambie el breakpoint o filtros
  useEffect(() => {
    const newTotalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
  }, [isMobile, filteredUsers.length, itemsPerPage, currentPage]);

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
    totalItems: filteredUsers.length,
    handlePageChange,
    roleFilter,
    statusFilter,
    handleRoleFilterChange,
    handleStatusFilterChange
  };
};
