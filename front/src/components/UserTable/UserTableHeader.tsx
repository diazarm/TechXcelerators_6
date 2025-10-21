import React from 'react';
import { FilterDropdown } from '../FilterDropdown';

interface UserTableHeaderProps {
  roleFilter: string;
  statusFilter: string;
  onRoleFilterChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
}

/**
 * Header de la tabla de usuarios con filtros
 */
export const UserTableHeader: React.FC<UserTableHeaderProps> = ({
  roleFilter,
  statusFilter,
  onRoleFilterChange,
  onStatusFilterChange,
}) => {
  const roleOptions = [
    { value: 'all', label: 'Todos' },
    { value: 'director', label: 'Director' },
    { value: 'user', label: 'Usuario' },
  ];

  const statusOptions = [
    { value: 'all', label: 'Todos' },
    { value: 'active', label: 'Activo' },
    { value: 'inactive', label: 'Desactivado' },
  ];

  return (
    <div 
      className="bg-gradient-to-r from-[#F5F4F8] to-[#E8E6F0] border-b border-gray-200 grid gap-3 p-3 w-full"
      style={{ gridTemplateColumns: '1.5fr 2fr 0.8fr 0.8fr 1fr' }}
    >
      <div className="font-semibold text-[#5D5A88] text-sm">Usuario</div>
      <div className="font-semibold text-[#5D5A88] text-sm">Email</div>
      <div>
        <FilterDropdown
          label="Rol"
          options={roleOptions}
          value={roleFilter}
          onChange={onRoleFilterChange}
        />
      </div>
      <div>
        <FilterDropdown
          label="Estado"
          options={statusOptions}
          value={statusFilter}
          onChange={onStatusFilterChange}
        />
      </div>
      <div className="font-semibold text-[#5D5A88] text-center text-sm">Acciones</div>
    </div>
  );
};
