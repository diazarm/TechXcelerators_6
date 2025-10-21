import React from 'react';
import { useScreenSize } from '../../context';
import LoadingSpinner from '../LoadingSpinner';
import { RoleChangeModal } from '../RoleChangeModal';
import { UserStatusModal } from '../UserStatusModal';
import { PaginationControls } from '../PaginationControls';
import { useUserManagement } from '../../hooks/useUserManagement';
import { useUserActions } from '../../hooks/useUserActions';
import { UserTableEmpty, UserTableHeader } from '../UserTable';
import { EyeOff, RotateCcw } from 'react-feather';

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
  const { scale, isMobile, isTablet } = useScreenSize();
  // Breakpoint: < 1024px = cards (móvil + tablet), >= 1024px = tabla (desktop)
  const showMobileView = isMobile || isTablet;
  
  // Hooks extraídos
  const { 
    users, 
    allUsers,
    loading, 
    setUsers, 
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    handlePageChange,
    roleFilter,
    statusFilter,
    handleRoleFilterChange,
    handleStatusFilterChange
  } = useUserManagement();
  const {
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
  } = useUserActions();

  if (loading) {
    return (
      <div 
        className="flex justify-center items-center"
        style={{ paddingTop: scale(32), paddingBottom: scale(32) }}
      >
        <LoadingSpinner />
      </div>
    );
  }

  if (allUsers.length === 0) {
    return <UserTableEmpty message="No hay usuarios registrados en el sistema." />;
  }

  return (
    <div className={`${className}`}>
      {showMobileView ? (
        /* Vista móvil/tablet (< 1024px): Cards */
        <div className="space-y-3">
          {users.length === 0 ? (
            <UserTableEmpty message="No se encontraron usuarios con los filtros aplicados." />
          ) : (
            users.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-200"
              >
                {/* Header de la card */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium text-gray-900 text-sm">
                      {user.name}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {user.email}
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full font-medium text-xs ${
                    user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.isActive ? 'Activo' : 'Inactivo'}
                  </span>
                </div>

                {/* Controles */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleRoleChange(user._id, allUsers)}
                      disabled={actionLoading === user._id}
                      className={`relative inline-flex items-center rounded-full transition-colors duration-200 focus:outline-none ${
                        user.role === 'director' ? 'bg-[#5D5A88]' : 'bg-gray-300'
                      } ${actionLoading === user._id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      style={{ height: scale(20), width: scale(36) }}
                    >
                      <span
                        className="rounded-full bg-white transition-transform duration-200 absolute top-0.5"
                        style={{
                          height: scale(16),
                          width: scale(16),
                          ...(user.role === 'director' ? { right: '2px' } : { left: '2px' })
                        }}
                      />
                    </button>
                    <span className="text-gray-600 text-sm">
                      {user.role === 'director' ? 'Director' : 'Usuario'}
                    </span>
                  </div>

                  <div 
                    onClick={() => handleStatusChange(user._id, allUsers)}
                    className="cursor-pointer flex items-center hover:bg-gray-100 rounded-lg transition-colors px-2 py-1 gap-1"
                  >
                    {user.isActive ? (
                      <EyeOff size={scale(16)} className="text-[#5D5A88] hover:text-red-600 transition-colors" />
                    ) : (
                      <RotateCcw size={scale(16)} className="text-[#5D5A88] hover:text-green-600 transition-colors" />
                    )}
                    <span className="text-gray-500 text-sm">
                      {user.isActive ? 'Desactivar' : 'Activar'}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        /* Vista desktop (>= 1024px): Tabla responsive sin scroll */
        <div 
          className="bg-white rounded-lg border border-gray-200 w-full"
        >
          {/* Header con filtros - SIEMPRE visible */}
          <UserTableHeader
            roleFilter={roleFilter}
            statusFilter={statusFilter}
            onRoleFilterChange={handleRoleFilterChange}
            onStatusFilterChange={handleStatusFilterChange}
          />

          {/* Contenido de la tabla */}
          {users.length === 0 ? (
            <UserTableEmpty message="No se encontraron usuarios con los filtros aplicados." />
          ) : (
            <div className="divide-y divide-gray-100 w-full">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="hover:bg-gray-50 transition-colors grid gap-3 p-3 border-b border-gray-100 w-full items-center"
                  style={{ gridTemplateColumns: '1.5fr 2fr 0.8fr 0.8fr 1fr' }}
                >
                  {/* Usuario */}
                  <div className="flex items-center overflow-hidden">
                    <span className="font-medium text-gray-900 truncate text-sm">
                      {user.name}
                    </span>
                  </div>

                  {/* Email */}
                  <div className="text-gray-600 truncate text-sm">
                    {user.email}
                  </div>

                  {/* Rol */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleRoleChange(user._id, allUsers)}
                      disabled={actionLoading === user._id}
                      className={`relative inline-flex items-center rounded-full transition-colors duration-200 focus:outline-none ${
                        user.role === 'director' ? 'bg-[#5D5A88]' : 'bg-gray-300'
                      } ${actionLoading === user._id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      style={{ height: scale(20), width: scale(36) }}
                    >
                      <span
                        className="rounded-full bg-white transition-transform duration-200 absolute top-0.5"
                        style={{
                          height: scale(16),
                          width: scale(16),
                          ...(user.role === 'director' ? { right: '2px' } : { left: '2px' })
                        }}
                      />
                    </button>
                    <span className="text-gray-600 whitespace-nowrap text-xs hidden lg:inline">
                      {user.role === 'director' ? 'Director' : 'Usuario'}
                    </span>
                  </div>

                  {/* Estado */}
                  <div className="flex">
                    <span className={`px-2 py-1 rounded-full font-medium whitespace-nowrap text-xs ${
                      user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>

                  {/* Acciones */}
                  <div className="flex items-center justify-center">
                    <div 
                      onClick={() => handleStatusChange(user._id, allUsers)}
                      className="cursor-pointer flex items-center hover:bg-gray-100 rounded-lg transition-colors px-2 py-1 gap-1"
                    >
                      {user.isActive ? (
                        <EyeOff size={scale(14)} className="text-[#5D5A88] hover:text-red-600 transition-colors" />
                      ) : (
                        <RotateCcw size={scale(14)} className="text-[#5D5A88] hover:text-green-600 transition-colors" />
                      )}
                      <span className="text-gray-500 whitespace-nowrap text-xs hidden lg:inline">
                        {user.isActive ? 'Desactivar' : 'Activar'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Controles de paginación */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        itemLabel="usuarios"
      />

      {/* Modal de confirmación de cambio de rol */}
      {showRoleModal && selectedUser && (
        <RoleChangeModal
          isOpen={showRoleModal}
          onClose={() => {
            setShowRoleModal(false);
            setSelectedUser(null);
          }}
                  onConfirm={() => confirmRoleChange(allUsers, setUsers)}
          userName={selectedUser.name}
          currentRole={selectedUser.role === 'director' ? 'Director' : 'Usuario'}
          newRole={selectedUser.role === 'director' ? 'Usuario' : 'Director'}
          loading={actionLoading === selectedUser._id}
        />
      )}

      {/* Modal de confirmación de cambio de estado */}
      {showStatusModal && selectedUser && (
        <UserStatusModal
          isOpen={showStatusModal}
          onClose={() => {
            setShowStatusModal(false);
            setSelectedUser(null);
          }}
                  onConfirm={() => confirmStatusChange(allUsers, setUsers)}
          userName={selectedUser.name}
          isActive={selectedUser.isActive}
          loading={actionLoading === selectedUser._id}
        />
      )}
    </div>
  );
};