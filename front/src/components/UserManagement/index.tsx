import React from 'react';
import { useScreenSize } from '../../context';
import LoadingSpinner from '../LoadingSpinner';
import { RoleChangeModal } from '../RoleChangeModal';
import { UserStatusModal } from '../UserStatusModal';
import { PaginationControls } from '../PaginationControls';
import { useUserManagement } from '../../hooks/useUserManagement';
import { useUserActions } from '../../hooks/useUserActions';
import { UserTableEmpty } from '../UserTable';
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
  const { scale, isMobile } = useScreenSize();
  
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
    handlePageChange
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
    return <UserTableEmpty />;
  }

  return (
    <div className={`${className}`}>
      {isMobile ? (
        /* Vista móvil: Cards */
        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-200"
            >
              {/* Header de la card */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center" style={{ gap: scale(8) }}>
                  <div 
                    className="bg-[#5D5A88] rounded-full flex items-center justify-center text-white font-semibold"
                    style={{
                      width: scale(24),
                      height: scale(24),
                      fontSize: scale(12)
                    }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900" style={{ fontSize: scale(14) }}>
                      {user.name}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {user.email}
                    </div>
                  </div>
                </div>
                <span 
                  className={`px-2 py-1 rounded-full font-medium text-xs ${
                    user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {user.isActive ? 'Activo' : 'Inactivo'}
                </span>
              </div>

              {/* Controles */}
              <div className="flex items-center justify-between">
                <div className="flex items-center" style={{ gap: scale(8) }}>
                  <button
                    onClick={() => handleRoleChange(user._id, allUsers)}
                    disabled={actionLoading === user._id}
                    className={`relative inline-flex items-center rounded-full transition-colors duration-200 focus:outline-none ${
                      user.role === 'director' ? 'bg-[#5D5A88]' : 'bg-gray-300'
                    } ${actionLoading === user._id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    style={{
                      height: scale(20),
                      width: scale(36)
                    }}
                  >
                    <span
                      className="rounded-full bg-white transition-transform duration-200"
                      style={{
                        position: 'absolute',
                        ...(user.role === 'director' 
                          ? { right: scale(2) }
                          : { left: scale(2) }
                        ),
                        top: scale(2),
                        height: scale(16),
                        width: scale(16)
                      }}
                    />
                  </button>
                  <span className="text-gray-600 text-sm">
                    {user.role === 'director' ? 'Director' : 'Usuario'}
                  </span>
                </div>

                <div 
                  onClick={() => handleStatusChange(user._id, allUsers)}
                  className="cursor-pointer flex items-center hover:bg-gray-100 rounded-lg transition-colors px-2 py-1"
                  style={{ gap: scale(4) }}
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
                  <span className="text-gray-500 text-sm">
                    {user.isActive ? 'Desactivar' : 'Activar'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Vista desktop: Tabla */
        <div 
          className="bg-white rounded-lg border border-gray-200 overflow-hidden"
          style={{
            borderRadius: scale(8),
            borderWidth: scale(1),
            borderColor: '#E5E7EB'
          }}
        >
          {/* Header del Grid */}
          <div 
            className="bg-gradient-to-r from-[#F5F4F8] to-[#E8E6F0] border-b border-gray-200"
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 2fr 1fr 1fr 1.5fr',
              gap: scale(16),
              padding: scale(12),
              borderBottomWidth: scale(1),
              borderBottomColor: '#E5E7EB'
            }}
          >
            <div className="font-semibold text-[#5D5A88]" style={{ fontSize: scale(14) }}>Usuario</div>
            <div className="font-semibold text-[#5D5A88]" style={{ fontSize: scale(14) }}>Email</div>
            <div className="font-semibold text-[#5D5A88]" style={{ fontSize: scale(14) }}>Rol</div>
            <div className="font-semibold text-[#5D5A88]" style={{ fontSize: scale(14) }}>Estado</div>
            <div className="font-semibold text-[#5D5A88] text-center" style={{ fontSize: scale(14) }}>Acciones</div>
          </div>

          {/* Filas del Grid */}
          <div className="divide-y divide-gray-100">
            {users.map((user) => (
              <div
                key={user._id}
                className="hover:bg-gray-50 transition-colors"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 2fr 1fr 1fr 1.5fr',
                  gap: scale(16),
                  padding: scale(12),
                  alignItems: 'center',
                  borderBottomWidth: scale(1),
                  borderBottomColor: '#F3F4F6'
                }}
              >
                {/* Usuario */}
                <div className="flex items-center" style={{ gap: scale(8) }}>
                  <div 
                    className="bg-[#5D5A88] rounded-full flex items-center justify-center text-white font-semibold"
                    style={{
                      width: scale(24),
                      height: scale(24),
                      fontSize: scale(12)
                    }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span 
                    className="font-medium text-gray-900 truncate"
                    style={{ fontSize: scale(14) }}
                  >
                    {user.name}
                  </span>
                </div>

                {/* Email */}
                <div 
                  className="text-gray-600 truncate"
                  style={{ fontSize: scale(14) }}
                >
                  {user.email}
                </div>

                {/* Rol */}
                <div className="flex items-center" style={{ gap: scale(6) }}>
                  <button
                    onClick={() => handleRoleChange(user._id, allUsers)}
                    disabled={actionLoading === user._id}
                    className={`relative inline-flex items-center rounded-full transition-colors duration-200 focus:outline-none ${
                      user.role === 'director' ? 'bg-[#5D5A88]' : 'bg-gray-300'
                    } ${actionLoading === user._id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    style={{
                      height: scale(20),
                      width: scale(36)
                    }}
                  >
                    <span
                      className="rounded-full bg-white transition-transform duration-200"
                      style={{
                        position: 'absolute',
                        ...(user.role === 'director' 
                          ? { right: scale(2) }
                          : { left: scale(2) }
                        ),
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

                {/* Estado */}
                <div>
                  <span 
                    className={`px-2 py-1 rounded-full font-medium whitespace-nowrap ${
                      user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                    style={{ 
                      fontSize: scale(12),
                      paddingLeft: scale(8),
                      paddingRight: scale(8),
                      paddingTop: scale(4),
                      paddingBottom: scale(4)
                    }}
                  >
                    {user.isActive ? 'Activo' : 'Inactivo'}
                  </span>
                </div>

                {/* Acciones */}
                <div className="flex items-center justify-center">
                  <div 
                    onClick={() => handleStatusChange(user._id, allUsers)}
                    className="cursor-pointer flex items-center hover:bg-gray-100 rounded-lg transition-colors"
                    style={{
                      padding: scale(6),
                      gap: scale(6)
                    }}
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
                    <span 
                      className="text-gray-500 whitespace-nowrap"
                      style={{ fontSize: scale(12) }}
                    >
                      {user.isActive ? 'Desactivar' : 'Activar'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Controles de paginación */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
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