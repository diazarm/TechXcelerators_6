import React from 'react';
import { useScreenSize } from '../../context';
import LoadingSpinner from '../LoadingSpinner';
import { RoleChangeModal } from '../RoleChangeModal';
import { UserStatusModal } from '../UserStatusModal';
import { useUserManagement } from '../../hooks/useUserManagement';
import { useUserActions } from '../../hooks/useUserActions';
import { UserTableHeader, UserTableRow, UserTableEmpty } from '../UserTable';

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
  const { scale } = useScreenSize();
  
  // Hooks extraídos
  const { users, loading, setUsers } = useUserManagement();
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
      <div className="flex justify-center items-center py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (users.length === 0) {
    return <UserTableEmpty />;
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
          <UserTableHeader />
          <tbody>
            {users.map((user) => (
              <UserTableRow
                key={user._id}
                user={user}
                actionLoading={actionLoading}
                onRoleChange={(userId) => handleRoleChange(userId, users)}
                onStatusChange={(userId) => handleStatusChange(userId, users)}
              />
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
          onConfirm={() => confirmRoleChange(users, setUsers)}
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
          onConfirm={() => confirmStatusChange(users, setUsers)}
          userName={selectedUser.name}
          isActive={selectedUser.isActive}
          loading={actionLoading === selectedUser._id}
        />
      )}
    </div>
  );
};