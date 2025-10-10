/**
 * Tipos para el módulo de Alianzas
 * Basados en el modelo Alliance del backend
 */

/**
 * Interfaz para logos de alianzas
 */
export interface AllianceLogo {
  _id: string;
  label: string;
  url: string;
}

/**
 * Interfaz principal de Alianza
 * Coincide exactamente con IAlliance del backend
 */
export interface Alliance {
  _id: string;          // ID único (MongoDB usa _id)
  name: string;         // Nombre de la alianza
  siglas: string;       // Siglas de la alianza
  url?: string;         // URL opcional (el ? significa opcional)
  logos?: AllianceLogo[]; // Logos de la alianza (opcional)
  isActive: boolean;    // Si está activa o no
  deleteAt: Date | null; // Para soft delete (null si no está eliminada)
  createdAt: Date;      // Fecha de creación
  updatedAt: Date;      // Fecha de última actualización
}
// Tipos de Request (Para enviar datos)
/**
 * DTO para crear una nueva alianza
 * Solo incluye los campos que el usuario puede enviar
 */
export interface CreateAllianceRequest {
  name: string;         // Nombre es obligatorio
  siglas: string;       // Siglas son obligatorias
  url?: string;         // URL es opcional
  logos?: AllianceLogo[]; // Logos opcionales
}

/**
 * DTO para actualizar una alianza existente
 * Todos los campos son opcionales porque solo actualizamos lo que cambió
 */
export interface UpdateAllianceRequest {
  name?: string;        // Nombre opcional
  siglas?: string;      // Siglas opcionales
  url?: string;         // URL opcional
  logos?: AllianceLogo[]; // Logos opcionales
  isActive?: boolean;   // Estado activo opcional
}

/**
 * Respuesta estándar de la API para una alianza individual
 * Coincide con el formato de respuesta del backend
 */
export interface AllianceApiResponse {
  success: boolean;     // Si la operación fue exitosa
  message: string;      // Mensaje descriptivo
  data: Alliance;       // Los datos de la alianza
}

/**
 * Respuesta estándar de la API para listas de alianzas
 * Coincide con el formato de respuesta del backend
 */
export interface AllianceListApiResponse {
  success: boolean;     // Si la operación fue exitosa
  message: string;      // Mensaje descriptivo
  data: Alliance[];     // Array de alianzas
}

/**
 * Opciones para filtros de alianzas
 */
export interface AllianceFilters {
  isActive?: boolean;      // Filtrar por estado activo
  includeDeleted?: boolean; // Incluir alianzas eliminadas
}

/**
 * Estado del hook useAlliances
 */
export interface AllianceState {
  alliances: Alliance[];        // Lista de alianzas
  loading: boolean;             // Si está cargando
  error: string | null;         // Error si existe
  selectedAlliance: Alliance | null; // Alianza seleccionada
}

/**
 * Acciones del hook useAlliances
 */
export interface AllianceActions {
  getAlliances: (filters?: AllianceFilters) => Promise<void>;
  getAllianceById: (id: string) => Promise<Alliance | null>;
  createAlliance: (data: CreateAllianceRequest) => Promise<Alliance>;
  updateAlliance: (id: string, data: UpdateAllianceRequest) => Promise<Alliance>;
  deleteAlliance: (id: string) => Promise<void>;
  restoreAlliance: (id: string) => Promise<Alliance>;
  clearError: () => void;
  setSelectedAlliance: (alliance: Alliance | null) => void;
}
