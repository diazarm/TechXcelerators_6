import { api } from './api';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role?: 'user' | 'director';
  isAdmin: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface UserListResponse {
  success: boolean;
  message: string;
  data: IUser[];
}

export interface UserResponse {
  success: boolean;
  message: string;
  data: IUser;
}

export interface RoleChangeResponse {
  success: boolean;
  message: string;
  role: string;
  user: IUser;
}

/**
 * Servicio para gestión de usuarios
 * Reutiliza endpoints del backend existente
 */
export class UserService {
  /**
   * Obtener todos los usuarios
   */
  async getUsers(): Promise<IUser[]> {
    try {
      // Obtener usuarios activos
      const activeResponse = await api.get<UserListResponse>('/users');
      const activeUsers = activeResponse.data.data || [];
      
      // Obtener usuarios eliminados (inactivos)
      const deletedResponse = await api.get<UserListResponse>('/users/deleted');
      const deletedUsers = deletedResponse.data.data || [];
      
      // Combinar ambos arrays
      return [...activeUsers, ...deletedUsers];
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  /**
   * Obtener usuarios eliminados
   */
  async getDeletedUsers(page: number = 1, limit: number = 10): Promise<IUser[]> {
    try {
      const response = await api.get<UserListResponse>(`/users/deleted?page=${page}&limit=${limit}`);
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching deleted users:', error);
      throw error;
    }
  }

  /**
   * Cambiar rol de usuario (user ↔ director)
   */
  async changeUserRole(userId: string): Promise<RoleChangeResponse> {
    try {
      const response = await api.patch<RoleChangeResponse>(`/users/role/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error changing user role:', error);
      throw error;
    }
  }

  /**
   * Deshabilitar usuario (soft delete)
   */
  async disableUser(userId: string): Promise<void> {
    try {
      await api.delete(`/users/${userId}`);
    } catch (error) {
      console.error('Error disabling user:', error);
      throw error;
    }
  }

  /**
   * Alternar estado de usuario (activar/desactivar)
   */
  async toggleUserStatus(userId: string): Promise<IUser> {
    try {
      // Primero obtenemos el usuario para ver su estado actual
      const userResponse = await api.get<UserResponse>(`/users/${userId}`);
      const user = userResponse.data.data;
      
      if (user.isActive) {
        // Si está activo, lo desactivamos (soft delete)
        await api.delete(`/users/${userId}`);
        return { ...user, isActive: false, deletedAt: new Date().toISOString() };
      } else {
        // Si está inactivo, lo restauramos
        const response = await api.patch<UserResponse>(`/users/restore/${userId}`);
        return response.data.data;
      }
    } catch (error) {
      console.error('Error toggling user status:', error);
      throw error;
    }
  }

  /**
   * Restaurar usuario eliminado
   */
  async restoreUser(userId: string): Promise<IUser> {
    try {
      const response = await api.patch<UserResponse>(`/users/restore/${userId}`);
      return response.data.data;
    } catch (error) {
      console.error('Error restoring user:', error);
      throw error;
    }
  }

  /**
   * Obtener usuario por ID
   */
  async getUserById(userId: string): Promise<IUser> {
    try {
      const response = await api.get<UserResponse>(`/users/${userId}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw error;
    }
  }
}

export const userService = new UserService();
